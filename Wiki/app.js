/**
 * Database System Wiki Web Reader — Core Application
 * Handles Markdown rendering, Obsidian Callouts, Mermaid diagrams,
 * Table of Contents with scrollspy, Omni-search, and cross-linking to SQL Lab.
 */

(function () {
  'use strict';

  // Application State
  const state = {
    wikiData: window.WIKI_DATA || null,
    currentDocId: null,
    completedDocs: new Set(),
    theme: localStorage.getItem('wiki_theme') || 'dark',
    fontSize: parseInt(localStorage.getItem('wiki_font_size') || '16', 10),
    tocHeadings: [],
    searchIndex: []
  };

  // Icon definitions for Obsidian Callouts
  const CALLOUT_CONFIGS = {
    summary: { title: 'ภาพรวม (Summary)', icon: '📝', class: 'callout-summary' },
    definition: { title: 'นิยาม (Definition)', icon: '📐', class: 'callout-definition' },
    info: { title: 'เกร็ดความรู้ (Info)', icon: '💡', class: 'callout-info' },
    tip: { title: 'ข้อแนะนำ (Tip)', icon: '✨', class: 'callout-tip' },
    warning: { title: 'ข้อควรระวัง (Warning)', icon: '⚠️', class: 'callout-warning' },
    caution: { title: 'อันตราย (Caution)', icon: '🚨', class: 'callout-caution' },
    important: { title: 'สำคัญมาก (Important)', icon: '❗', class: 'callout-warning' },
    example: { title: 'ตัวอย่าง (Example)', icon: '🔍', class: 'callout-example' },
    note: { title: 'บันทึก (Note)', icon: '📌', class: 'callout-info' },
    question: { title: 'คำถาม (Question)', icon: '❓', class: 'callout-example' }
  };

  // DOM Elements cache
  const elements = {};

  function initApp() {
    cacheElements();
    applyTheme(state.theme);
    applyFontSize(state.fontSize);
    loadCompletedState();

    if (window.mermaid) {
      window.mermaid.initialize({
        startOnLoad: false,
        suppressErrorRendering: true,
        theme: state.theme === 'dark' ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: 'Noto Sans Thai, sans-serif'
      });
    }

    buildSearchIndex();
    renderSidebar();
    setupEventListeners();

    // Handle initial route from hash
    const initialDoc = getDocFromHash() || 'Database System Index';
    navigateToDoc(initialDoc, getAnchorFromHash());
  }

  function cacheElements() {
    elements.sidebarNav = document.getElementById('sidebar-nav');
    elements.articleTitle = document.getElementById('article-title');
    elements.articleBody = document.getElementById('article-body');
    elements.articleMeta = document.getElementById('article-meta');
    elements.breadcrumbCategory = document.getElementById('breadcrumb-category');
    elements.breadcrumbCurrent = document.getElementById('breadcrumb-current');
    elements.markReadBtn = document.getElementById('mark-read-btn');
    elements.tocList = document.getElementById('toc-list');
    elements.paginationNav = document.getElementById('article-pagination');
    elements.progressBar = document.getElementById('reading-progress-bar');
    elements.themeToggleBtn = document.getElementById('theme-toggle-btn');
    elements.mobileToggleBtn = document.getElementById('mobile-toggle-btn');
    elements.sidebar = document.getElementById('sidebar');
    elements.sidebarBackdrop = document.getElementById('sidebar-backdrop');
    elements.searchModal = document.getElementById('search-modal');
    elements.searchInput = document.getElementById('search-input');
    elements.searchResults = document.getElementById('search-results');
    elements.diagramModal = document.getElementById('diagram-modal');
    elements.diagramCanvas = document.getElementById('diagram-canvas');
    elements.toast = document.getElementById('wiki-toast');
  }

  function loadCompletedState() {
    try {
      const stored = localStorage.getItem('wiki_completed_docs');
      if (stored) {
        state.completedDocs = new Set(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load completed state:', e);
    }
  }

  function saveCompletedState() {
    try {
      localStorage.setItem('wiki_completed_docs', JSON.stringify([...state.completedDocs]));
    } catch (e) {
      console.warn('Failed to save completed state:', e);
    }
  }

  function applyTheme(theme) {
    state.theme = theme;
    document.body.className = theme === 'light' ? 'theme-light' : '';
    localStorage.setItem('wiki_theme', theme);
    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.innerHTML = theme === 'light' ? '🌙' : '☀️';
      elements.themeToggleBtn.title = theme === 'light' ? 'เปลี่ยนเป็นโหมดกลางคืน (Dark Mode)' : 'เปลี่ยนเป็นโหมดสว่าง (Light Mode)';
    }
    if (window.mermaid) {
      window.mermaid.initialize({
        theme: theme === 'dark' ? 'dark' : 'default'
      });
    }
  }

  function applyFontSize(size) {
    state.fontSize = Math.min(22, Math.max(14, size));
    document.documentElement.style.setProperty('--reading-font-size', `${state.fontSize}px`);
    localStorage.setItem('wiki_font_size', state.fontSize);
  }

  function formatDocNavTitle(docId, originalTitle) {
    if (docId.includes('In-Class Exam Guide')) return '🎯 คู่มือ & ข้อสอบจำลองในคาบเรียน';
    if (docId.includes('Database System Index')) return '📌 สารบัญภาพรวม (Master Index)';
    if (docId.includes('Progress Checklist')) return '✅ เช็กลิสต์ความก้าวหน้า';
    if (docId.includes('SQL Lab Practice Guide')) return '🛠️ คู่มือปฏิบัติการ SQL Lab (Zero to Hero)';

    if (docId.startsWith('Lecture 1 -')) return 'บทที่ 1 (Ch1): ภาพรวมฐานข้อมูล & TPS';
    if (docId.startsWith('Lecture 2 -')) return 'บทที่ 2 (Ch2): สถาปัตยกรรม & Relational Model';
    if (docId.startsWith('Lecture 3 -')) return 'บทที่ 3 (Ch3): Relational Algebra (พีชคณิต)';
    if (docId.startsWith('Lecture 4 -')) return 'บทที่ 4 (Ch4): ER Model [🎯 ออกแบบแผนภาพ]';
    if (docId.startsWith('Lecture 5 -')) return 'บทที่ 5 (Ch5): Functional Dependencies [🎯 FDs]';
    if (docId.startsWith('Lecture 6 -')) return 'บทที่ 6 (Ch6): Normalization (1NF-5NF) [🎯 นอร์มัลไลเซชัน]';
    if (docId.includes('Lecture 7 (Part 1)')) return 'บทที่ 7 (Ch7): SQL พื้นฐาน (Slide 1-40) [🎯 คำสั่ง SQL]';
    if (docId.includes('Lecture 7 (Part 2)')) return 'บทที่ 7 (Ch7): SQL พื้นฐาน (Slide 41-80) [🎯 JOIN & GROUP BY]';
    if (docId.includes('Lecture 7 (Part 3)')) return 'บทที่ 7 (Ch7): SQL พื้นฐาน (Slide 81-94) [🎯 DDL & Integrity]';
    if (docId.includes('Lecture 7.5 (Part 1)')) return 'บทที่ 7.2 (Ch7_2): SQL ขั้นสูง (Slide 1-40) [🎯 Subquery & Views]';
    if (docId.includes('Lecture 7.5 (Part 2)')) return 'บทที่ 7.2 (Ch7_2): SQL ขั้นสูง (Slide 41-79) [🎯 Correlated Subquery]';
    if (docId.startsWith('Lecture 8 -')) return 'บทที่ 8 (Ch8): Transaction Processing';
    if (docId.startsWith('Lecture 9 -')) return 'บทที่ 9 (Ch9): NoSQL Databases';

    return originalTitle;
  }

  /* ---------------- Sidebar Navigation ---------------- */

  function renderSidebar() {
    if (!state.wikiData || !state.wikiData.categories) return;
    let html = '';

    state.wikiData.categories.forEach(cat => {
      const isExamCat = cat.id.startsWith('exam');
      html += `
        <div class="sidebar-category ${isExamCat ? 'exam-category' : ''}">
          <div class="category-header ${isExamCat ? 'exam-cat-header' : ''}">
            <span>${escapeHtml(cat.title)}</span>
          </div>
          <div class="category-docs">
      `;

      cat.docs.forEach(doc => {
        const isCompleted = state.completedDocs.has(doc.id);
        const isActive = doc.id === state.currentDocId;
        const displayNavTitle = formatDocNavTitle(doc.id, doc.title);
        const isExamDoc = displayNavTitle.includes('🎯');

        html += `
          <a class="doc-nav-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isExamDoc ? 'exam-doc-item' : ''}" 
             data-doc-id="${escapeHtml(doc.id)}" 
             href="#/${encodeURIComponent(doc.id)}">
            <span class="doc-status-box" title="${isCompleted ? 'อ่านจบแล้ว' : 'ยังไม่ได้อ่าน'}">
              ${isCompleted ? '✓' : ''}
            </span>
            <div class="doc-nav-title">
              <div class="doc-nav-title-text">${escapeHtml(displayNavTitle)}</div>
              <div class="doc-nav-meta">⏱️ ${doc.estMinutes} นาที · ${doc.headingsCount} หัวข้อ</div>
            </div>
          </a>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    elements.sidebarNav.innerHTML = html;

    // Attach click events
    elements.sidebarNav.querySelectorAll('.doc-nav-item').forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        const docId = item.dataset.docId;
        navigateToDoc(docId);
        closeMobileSidebar();
      });
    });
  }

  function updateSidebarActiveState() {
    if (!elements.sidebarNav) return;
    elements.sidebarNav.querySelectorAll('.doc-nav-item').forEach(item => {
      const docId = item.dataset.docId;
      const isCompleted = state.completedDocs.has(docId);
      const isActive = docId === state.currentDocId;
      item.classList.toggle('active', isActive);
      item.classList.toggle('completed', isCompleted);
      const statusBox = item.querySelector('.doc-status-box');
      if (statusBox) {
        statusBox.textContent = isCompleted ? '✓' : '';
      }
    });
  }

  /* ---------------- Document Navigation & Rendering ---------------- */

  function navigateToDoc(docId, anchor) {
    if (!state.wikiData || !state.wikiData.documents) return;

    // Normalize docId
    let doc = state.wikiData.documents[docId];
    if (!doc) {
      // Fuzzy lookup by filename or partial id
      const keys = Object.keys(state.wikiData.documents);
      const match = keys.find(k => k.toLowerCase() === docId.toLowerCase() || k.replace(/\.md$/, '').toLowerCase() === docId.toLowerCase());
      if (match) doc = state.wikiData.documents[match];
    }

    if (!doc) {
      console.warn('Document not found:', docId);
      return;
    }

    state.currentDocId = doc.id;
    window.location.hash = `#/${encodeURIComponent(doc.id)}${anchor ? '#' + anchor : ''}`;
    window.scrollTo({ top: 0, behavior: 'instant' });

    renderDocument(doc, anchor);
    updateSidebarActiveState();
  }

  function renderDocument(doc, anchor) {
    // 1. Breadcrumb
    const cat = findCategoryForDoc(doc.id);
    if (elements.breadcrumbCategory) {
      elements.breadcrumbCategory.textContent = cat ? cat.title.replace(/^.+?\s/, '') : 'Wiki';
    }
    if (elements.breadcrumbCurrent) {
      elements.breadcrumbCurrent.textContent = doc.title;
    }

    // 2. Title & Header Meta
    elements.articleTitle.textContent = doc.title;

    const tagsHtml = (doc.meta && doc.meta.tags && Array.isArray(doc.meta.tags))
      ? doc.meta.tags.map(t => `<span class="meta-badge">🏷️ ${escapeHtml(t)}</span>`).join('')
      : '';

    elements.articleMeta.innerHTML = `
      <span class="meta-badge">⏱️ อ่านประมาณ ${doc.estMinutes} นาที</span>
      <span class="meta-badge">📝 ${(doc.charCount).toLocaleString()} ตัวอักษร</span>
      ${tagsHtml}
    `;

    // 3. Mark Read Button
    const isRead = state.completedDocs.has(doc.id);
    updateMarkReadBtnState(isRead);

    // 4. Preprocess Markdown (Callouts, Wiki-Links, Code Headers)
    const rawContent = doc.content;
    const bodyContent = stripFrontmatter(rawContent);
    const processedMd = preprocessMarkdown(bodyContent);

    // 5. Parse with marked.js
    let htmlContent = '';
    if (window.marked) {
      // Configure marked
      window.marked.setOptions({
        gfm: true,
        breaks: true,
        highlight: function (code, lang) {
          if (window.Prism && window.Prism.languages[lang]) {
            return window.Prism.highlight(code, window.Prism.languages[lang], lang);
          }
          return code;
        }
      });
      htmlContent = window.marked.parse(processedMd);
    } else {
      htmlContent = `<pre>${escapeHtml(bodyContent)}</pre>`;
    }

    // 6. Postprocess HTML (Wrap Tables, Mermaid diagram blocks, Code blocks)
    elements.articleBody.innerHTML = postprocessHtml(htmlContent);

    // 7. Render Mermaid Diagrams after DOM paints
    setTimeout(() => {
      renderMermaidDiagrams();
    }, 50);

    // 8. Generate Table of Contents
    generateTableOfContents();

    // 9. Render Pagination (Prev / Next)
    renderPagination(doc.id);

    // 10. Scroll to anchor if specified
    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }

  function updateMarkReadBtnState(isRead) {
    if (!elements.markReadBtn) return;
    elements.markReadBtn.classList.toggle('is-read', isRead);
    elements.markReadBtn.innerHTML = isRead
      ? `<span>✓</span> อ่านจบแล้ว`
      : `<span>○</span> ทำเครื่องหมายว่าอ่านแล้ว`;
  }

  /* ---------------- Markdown Pre- & Post-Processing ---------------- */

  function stripFrontmatter(text) {
    if (text.startsWith('---')) {
      const endIdx = text.indexOf('\n---', 3);
      if (endIdx !== -1) {
        return text.slice(endIdx + 4).trim();
      }
    }
    return text;
  }

  /**
   * Pre-processes Markdown before feeding into marked.js
   * - Parses Obsidian Callouts `> [!TYPE] Header`
   * - Resolves Wiki-links `[[Doc Name]]`
   */
  function preprocessMarkdown(md) {
    let result = md.replace(/\r\n/g, '\n');

    // 1. Wiki-links: [[Lecture 4 - ER Model]] or [[Lecture 4 - ER Model|ER Diagram]] or [[Lecture#Section]]
    result = result.replace(/\[\[(.*?)(?:\|(.*?))?\]\]/g, (match, target, alias) => {
      const label = alias || target;
      const parts = target.split('#');
      const docTarget = parts[0].trim();
      const anchorTarget = parts[1] ? parts[1].trim() : '';
      return `<a href="#/${encodeURIComponent(docTarget)}${anchorTarget ? '#' + anchorTarget : ''}" class="wiki-link" data-doc="${escapeHtml(docTarget)}" data-anchor="${escapeHtml(anchorTarget)}">📄 ${escapeHtml(label)}</a>`;
    });

    // 2. Obsidian Callouts Parser
    // Matches:
    // > [!SUMMARY] optional title
    // > Line 1
    // > Line 2
    const lines = result.split('\n');
    const out = [];
    let inCallout = false;
    let calloutType = '';
    let calloutTitle = '';
    let calloutLines = [];

    function flushCallout() {
      if (!inCallout) return;
      const conf = CALLOUT_CONFIGS[calloutType.toLowerCase()] || {
        title: calloutType.toUpperCase(),
        icon: '📌',
        class: 'callout-info'
      };
      const displayTitle = calloutTitle || conf.title;
      const innerMd = calloutLines.join('\n');
      const innerHtml = window.marked ? window.marked.parse(innerMd) : innerMd;

      out.push(`
<div class="callout-card ${conf.class}">
  <div class="callout-header">
    <span class="callout-icon">${conf.icon}</span>
    <span class="callout-title">${escapeHtml(displayTitle)}</span>
  </div>
  <div class="callout-content">
    ${innerHtml}
  </div>
</div>
      `);

      inCallout = false;
      calloutType = '';
      calloutTitle = '';
      calloutLines = [];
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const matchCallout = line.match(/^>\s*\[!([a-zA-Z]+)\]\s*(.*)$/);

      if (matchCallout) {
        flushCallout();
        inCallout = true;
        calloutType = matchCallout[1].toLowerCase();
        calloutTitle = matchCallout[2].trim();
        continue;
      }

      if (inCallout) {
        if (line.startsWith('>')) {
          calloutLines.push(line.replace(/^>\s?/, ''));
        } else if (line.trim() === '') {
          // Allow blank line inside callout if next line starts with >
          if (i + 1 < lines.length && lines[i + 1].startsWith('>')) {
            calloutLines.push('');
          } else {
            flushCallout();
            out.push(line);
          }
        } else {
          flushCallout();
          out.push(line);
        }
      } else {
        out.push(line);
      }
    }
    flushCallout();

    return out.join('\n');
  }

  /**
   * Post-processes HTML generated by marked.js
   * - Wraps tables in responsive horizontal scroll wrappers
   * - Wraps code blocks with copy / run-sql action header
   * - Wraps mermaid blocks with diagram cards
   */
  function postprocessHtml(html) {
    let result = html;

    // 1. Wrap <table> with responsive container
    result = result.replace(/<table>([\s\S]*?)<\/table>/g, (match) => {
      return `<div class="table-responsive-wrapper">${match}</div>`;
    });

    // 3. Process Code Blocks and Mermaid blocks
    // Code blocks generated by marked: <pre><code class="language-xyz">...</code></pre>
    const codeBlockRegex = /<pre><code(?:\s+class="([^"]*)")?>([\s\S]*?)<\/code><\/pre>/g;
    result = result.replace(codeBlockRegex, (match, classAttr, codeContent) => {
      const langMatch = (classAttr || '').match(/language-([a-zA-Z0-9_-]+)/);
      const lang = langMatch ? langMatch[1].toLowerCase() : 'text';

      // If Mermaid Diagram
      if (lang === 'mermaid') {
        const decodedCode = unescapeHtml(codeContent.trim());
        return `
          <div class="mermaid-card">
            <div class="mermaid-card-header">
              <span class="diagram-label">📊 แผนผัง Diagram</span>
              <button class="btn-diagram-zoom" onclick="window.WikiApp.openDiagramZoom(this)" title="ขยายดูภาพเต็ม">
                🔍 ขยายดูภาพเต็ม
              </button>
            </div>
            <div class="mermaid-viewport">
              <div class="mermaid-code-raw" style="display:none;">${escapeHtml(decodedCode)}</div>
              <div class="mermaid-render-target"></div>
            </div>
          </div>
        `;
      }

      // If SQL code
      const isSql = lang === 'sql';
      const sqlRunBtn = isSql
        ? `<button class="code-btn code-btn-run-sql" onclick="window.WikiApp.runInSqlLab(this)" title="ส่งคำสั่งนี้ไปทดสอบใน SQL Lab">
             ▶️ รันใน SQL Lab
           </button>`
        : '';

      return `
        <div class="code-card-wrapper">
          <div class="code-card-header">
            <span class="code-lang-tag">${escapeHtml(lang)}</span>
            <div class="code-actions-group">
              ${sqlRunBtn}
              <button class="code-btn code-btn-copy" onclick="window.WikiApp.copyCode(this)" title="คัดลอกโค้ด">
                📋 คัดลอก
              </button>
            </div>
          </div>
          <pre><code class="${classAttr || ''}">${codeContent}</code></pre>
        </div>
      `;
    });

    return result;
  }

  /* ---------------- Mermaid Diagrams Rendering ---------------- */

  async function renderMermaidDiagrams() {
    if (!window.mermaid) return;

    // Purge any rogue error elements that Mermaid might have inserted
    document.querySelectorAll('div[id^="dmermaid-"], svg[id^="dmermaid-"]').forEach(el => el.remove());

    const containers = elements.articleBody.querySelectorAll('.mermaid-card');
    for (let idx = 0; idx < containers.length; idx++) {
      const card = containers[idx];
      const rawCodeEl = card.querySelector('.mermaid-code-raw');
      const targetEl = card.querySelector('.mermaid-render-target');
      if (!rawCodeEl || !targetEl) continue;

      const code = rawCodeEl.textContent.trim();
      const uniqueId = `mermaid-svg-${Date.now()}-${idx}`;

      try {
        await window.mermaid.parse(code);
        let result;
        try {
          result = await window.mermaid.render(uniqueId, code);
        } catch (firstErr) {
          // If first attempt failed due to SVG DOM reflow / getPointAtLength, retry once after layout settles
          await new Promise(r => setTimeout(r, 200));
          document.querySelectorAll(`div[id^="d${uniqueId}"], div[id^="dmermaid-"]`).forEach(el => el.remove());
          result = await window.mermaid.render(`retry_${Date.now()}_${idx}`, code);
        }
        targetEl.innerHTML = result.svg;
      } catch (err) {
        console.warn('Mermaid render skipped due to syntax error:', err);
        // Remove any rogue container created by Mermaid
        document.querySelectorAll(`div[id^="d${uniqueId}"], div[id^="dmermaid-"]`).forEach(el => el.remove());
        targetEl.innerHTML = `
          <div style="color: #f87171; font-size: 13px; padding: 14px; border: 1px dashed rgba(239, 68, 68, 0.35); border-radius: 6px; background: rgba(239, 68, 68, 0.05); text-align: left; width: 100%;">
            <div style="font-weight: 600; margin-bottom: 4px;">⚠️ แผนผังนี้ไม่สามารถแสดงผลได้อัตโนมัติ (Syntax Error):</div>
            <div style="color: #94a3b8; font-size: 11px; margin-bottom: 6px;">${escapeHtml(err.message || String(err))}</div>
            <pre style="font-size: 11px; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 4px; overflow-x: auto;">${escapeHtml(code)}</pre>
          </div>
        `;
      }
    }

    // Final sweep
    document.querySelectorAll('div[id^="dmermaid-"], svg[id^="dmermaid-"]').forEach(el => el.remove());
  }

  /* ---------------- Table of Contents & Scrollspy ---------------- */

  function generateTableOfContents() {
    if (!elements.tocList) return;
    state.tocHeadings = [];

    // Find all H1, H2, H3 in article-body
    const headings = elements.articleBody.querySelectorAll('h1, h2, h3');
    if (headings.length === 0) {
      elements.tocList.innerHTML = '<li class="toc-item"><span style="color:var(--text-muted);font-size:12px;">ไม่มีหัวข้อย่อยในบทนี้</span></li>';
      return;
    }

    let tocHtml = '';
    headings.forEach((heading, idx) => {
      // Create slug id if missing
      if (!heading.id) {
        const cleanText = heading.textContent
          .trim()
          .toLowerCase()
          .replace(/[^\w\u0E00-\u0E7F\s-]/g, '')
          .replace(/\s+/g, '-');
        heading.id = cleanText || `heading-${idx}`;
      }

      const level = parseInt(heading.tagName.substring(1), 10);
      const title = heading.textContent.replace(/^🗣️|📚|🧩|💡|⚙️|🔍|📌|\d+\.\s*/g, '').trim();

      state.tocHeadings.push({
        id: heading.id,
        el: heading,
        top: 0
      });

      tocHtml += `
        <li class="toc-item">
          <a href="#${heading.id}" 
             class="toc-link level-${level}" 
             data-target="${heading.id}" 
             title="${escapeHtml(heading.textContent)}">
            ${escapeHtml(title || heading.textContent)}
          </a>
        </li>
      `;
    });

    elements.tocList.innerHTML = tocHtml;

    // Attach click events for smooth scroll
    elements.tocList.querySelectorAll('.toc-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.dataset.target;
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
          history.replaceState(null, null, `#/${encodeURIComponent(state.currentDocId)}#${targetId}`);
        }
      });
    });

    updateScrollspy();
  }

  function updateScrollspy() {
    if (!state.tocHeadings || state.tocHeadings.length === 0) return;

    const scrollY = window.scrollY + 100;
    let activeId = state.tocHeadings[0].id;

    for (let i = 0; i < state.tocHeadings.length; i++) {
      const heading = state.tocHeadings[i];
      const offsetTop = heading.el.offsetTop;
      if (scrollY >= offsetTop) {
        activeId = heading.id;
      } else {
        break;
      }
    }

    if (elements.tocList) {
      elements.tocList.querySelectorAll('.toc-link').forEach(link => {
        link.classList.toggle('active', link.dataset.target === activeId);
      });
    }
  }

  /* ---------------- Reading Progress Bar ---------------- */

  function updateProgressBar() {
    if (!elements.progressBar) return;
    const docEl = document.documentElement;
    const scrollTotal = docEl.scrollHeight - docEl.clientHeight;
    if (scrollTotal <= 0) {
      elements.progressBar.style.width = '0%';
      return;
    }
    const currentScroll = window.scrollY;
    const percent = Math.min(100, Math.max(0, (currentScroll / scrollTotal) * 100));
    elements.progressBar.style.width = `${percent}%`;
  }

  /* ---------------- Pagination (Prev / Next) ---------------- */

  function renderPagination(currentDocId) {
    if (!elements.paginationNav || !state.wikiData) return;

    const allDocs = getAllDocsOrdered();
    const currentIndex = allDocs.findIndex(d => d.id === currentDocId);

    const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
    const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

    let html = '';

    if (prevDoc) {
      html += `
        <a href="#/${encodeURIComponent(prevDoc.id)}" class="page-nav-card prev" data-doc-id="${escapeHtml(prevDoc.id)}">
          <span class="page-nav-direction">← บทก่อนหน้า</span>
          <span class="page-nav-title">${escapeHtml(prevDoc.title)}</span>
        </a>
      `;
    } else {
      html += `<div></div>`;
    }

    if (nextDoc) {
      html += `
        <a href="#/${encodeURIComponent(nextDoc.id)}" class="page-nav-card next" data-doc-id="${escapeHtml(nextDoc.id)}">
          <span class="page-nav-direction">บทถัดไป →</span>
          <span class="page-nav-title">${escapeHtml(nextDoc.title)}</span>
        </a>
      `;
    }

    elements.paginationNav.innerHTML = html;

    // Attach click events
    elements.paginationNav.querySelectorAll('.page-nav-card').forEach(card => {
      card.addEventListener('click', e => {
        e.preventDefault();
        navigateToDoc(card.dataset.docId);
      });
    });
  }

  function getAllDocsOrdered() {
    const list = [];
    if (!state.wikiData || !state.wikiData.categories) return list;
    state.wikiData.categories.forEach(cat => {
      cat.docs.forEach(doc => list.push(doc));
    });
    return list;
  }

  function findCategoryForDoc(docId) {
    if (!state.wikiData || !state.wikiData.categories) return null;
    for (let cat of state.wikiData.categories) {
      if (cat.docs.some(d => d.id === docId)) return cat;
    }
    return null;
  }

  /* ---------------- Omni-Search Modal (Ctrl + K) ---------------- */

  function buildSearchIndex() {
    if (!state.wikiData || !state.wikiData.documents) return;
    state.searchIndex = [];

    Object.values(state.wikiData.documents).forEach(doc => {
      // 1. Doc title item
      state.searchIndex.push({
        type: 'doc',
        docId: doc.id,
        title: doc.title,
        headingId: '',
        text: (doc.title + ' ' + (doc.excerpt || '') + ' ' + (doc.content || '')).toLowerCase(),
        snippet: doc.excerpt || doc.title
      });

      // 2. Headings items
      if (doc.headings) {
        doc.headings.forEach(h => {
          state.searchIndex.push({
            type: 'heading',
            docId: doc.id,
            title: `${doc.title} > ${h.title}`,
            headingId: h.id,
            text: (doc.title + ' ' + h.title).toLowerCase(),
            snippet: `หัวข้อ: ${h.title}`
          });
        });
      }
    });
  }

  function openSearchModal() {
    if (!elements.searchModal) return;
    elements.searchModal.classList.add('open');
    elements.searchInput.value = '';
    renderSearchResults('');
    setTimeout(() => elements.searchInput.focus(), 80);
  }

  function closeSearchModal() {
    if (!elements.searchModal) return;
    elements.searchModal.classList.remove('open');
  }

  function renderSearchResults(query) {
    if (!elements.searchResults) return;
    const cleanQuery = query.trim().toLowerCase();

    if (!cleanQuery) {
      elements.searchResults.innerHTML = `
        <div class="search-empty-state">
          พิมพ์คำค้นหา เช่น <code>normalization</code>, <code>relational algebra</code>, <code>join</code>, <code>slide 5</code>
        </div>
      `;
      return;
    }

    const matches = state.searchIndex.filter(item => item.text.includes(cleanQuery)).slice(0, 12);

    if (matches.length === 0) {
      elements.searchResults.innerHTML = `
        <div class="search-empty-state">
          ไม่พบผลลัพธ์สำหรับ "${escapeHtml(query)}"
        </div>
      `;
      return;
    }

    let html = '';
    matches.forEach((item, idx) => {
      let snippet = item.snippet;
      if (item.type === 'doc') {
        const fullDoc = state.wikiData.documents[item.docId];
        if (fullDoc && fullDoc.content) {
          const matchIdx = fullDoc.content.toLowerCase().indexOf(cleanQuery);
          if (matchIdx !== -1) {
            const start = Math.max(0, matchIdx - 35);
            const end = Math.min(fullDoc.content.length, matchIdx + query.length + 65);
            snippet = (start > 0 ? '...' : '') + fullDoc.content.slice(start, end).replace(/\n+/g, ' ') + (end < fullDoc.content.length ? '...' : '');
          }
        }
      }
      const highlightedSnippet = highlightText(snippet, query);
      html += `
        <div class="search-result-item ${idx === 0 ? 'selected' : ''}" 
             data-doc-id="${escapeHtml(item.docId)}" 
             data-heading-id="${escapeHtml(item.headingId)}">
          <div class="search-result-title">${item.type === 'heading' ? '📌 ' : '📄 '} ${escapeHtml(item.title)}</div>
          <div class="search-result-snippet">${highlightedSnippet}</div>
        </div>
      `;
    });

    elements.searchResults.innerHTML = html;

    elements.searchResults.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        navigateToDoc(item.dataset.docId, item.dataset.headingId);
        closeSearchModal();
      });
    });
  }

  function highlightText(text, query) {
    if (!text || !query) return escapeHtml(text || '');
    const escapedQuery = query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return escapeHtml(text).replace(regex, '<mark>$1</mark>');
  }

  /* ---------------- Diagram Zoom Modal ---------------- */

  let zoomScale = 1;

  function openDiagramZoom(btn) {
    const card = btn.closest('.mermaid-card');
    if (!card) return;
    const svgEl = card.querySelector('.mermaid-render-target svg');
    if (!svgEl) return;

    zoomScale = 1;
    elements.diagramCanvas.innerHTML = svgEl.outerHTML;
    const canvasSvg = elements.diagramCanvas.querySelector('svg');
    if (canvasSvg) {
      canvasSvg.style.transform = `scale(${zoomScale})`;
    }
    elements.diagramModal.classList.add('open');
  }

  function closeDiagramZoom() {
    if (!elements.diagramModal) return;
    elements.diagramModal.classList.remove('open');
    elements.diagramCanvas.innerHTML = '';
  }

  function zoomDiagram(delta) {
    const canvasSvg = elements.diagramCanvas.querySelector('svg');
    if (!canvasSvg) return;
    zoomScale = Math.max(0.4, Math.min(3.5, zoomScale + delta));
    canvasSvg.style.transform = `scale(${zoomScale})`;
  }

  function resetZoom() {
    const canvasSvg = elements.diagramCanvas.querySelector('svg');
    if (!canvasSvg) return;
    zoomScale = 1;
    canvasSvg.style.transform = `scale(1)`;
  }

  /* ---------------- SQL Lab Integration & Clipboard ---------------- */

  function copyCode(btn) {
    const wrapper = btn.closest('.code-card-wrapper');
    if (!wrapper) return;
    const codeEl = wrapper.querySelector('code');
    if (!codeEl) return;

    navigator.clipboard.writeText(codeEl.textContent).then(() => {
      showToast('📋 คัดลอกโค้ดเรียบร้อยแล้ว!');
      const oldHtml = btn.innerHTML;
      btn.innerHTML = '✓ คัดลอกแล้ว';
      setTimeout(() => { btn.innerHTML = oldHtml; }, 1800);
    }).catch(err => {
      console.warn('Clipboard write failed:', err);
    });
  }

  function runInSqlLab(btn) {
    const wrapper = btn.closest('.code-card-wrapper');
    if (!wrapper) return;
    const codeEl = wrapper.querySelector('code');
    if (!codeEl) return;

    const query = codeEl.textContent.trim();
    try {
      localStorage.setItem('sqllab_prefill_query', query);
    } catch (e) {
      console.warn('Storage failed:', e);
    }
    showToast('🚀 ส่งคำสั่งไปยัง SQL Lab แล้ว กำลังเปิดห้องปฏิบัติการ...');
    setTimeout(() => {
      window.location.href = '../SqlLab/index.html';
    }, 400);
  }

  function showToast(message) {
    if (!elements.toast) return;
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    setTimeout(() => {
      elements.toast.classList.remove('show');
    }, 2500);
  }

  /* ---------------- Event Listeners Setup ---------------- */

  function setupEventListeners() {
    // 1. Scroll events (Progress bar + Scrollspy)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      updateProgressBar();
      if (!scrollTimeout) {
        scrollTimeout = requestAnimationFrame(() => {
          updateScrollspy();
          scrollTimeout = null;
        });
      }
    }, { passive: true });

    // 2. Hash change for back/forward navigation
    window.addEventListener('hashchange', () => {
      const docId = getDocFromHash();
      const anchor = getAnchorFromHash();
      if (docId && docId !== state.currentDocId) {
        navigateToDoc(docId, anchor);
      }
    });

    // 3. Theme toggle
    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.addEventListener('click', () => {
        applyTheme(state.theme === 'dark' ? 'light' : 'dark');
      });
    }

    // 4. Font size controls
    const fontDecBtn = document.getElementById('font-decrease-btn');
    const fontIncBtn = document.getElementById('font-increase-btn');
    if (fontDecBtn) fontDecBtn.addEventListener('click', () => applyFontSize(state.fontSize - 1));
    if (fontIncBtn) fontIncBtn.addEventListener('click', () => applyFontSize(state.fontSize + 1));

    // 5. Mark read button
    if (elements.markReadBtn) {
      elements.markReadBtn.addEventListener('click', () => {
        if (!state.currentDocId) return;
        if (state.completedDocs.has(state.currentDocId)) {
          state.completedDocs.delete(state.currentDocId);
          updateMarkReadBtnState(false);
          showToast('ยกเลิกเครื่องหมายอ่านจบแล้ว');
        } else {
          state.completedDocs.add(state.currentDocId);
          updateMarkReadBtnState(true);
          showToast('🎉 บันทึกว่าอ่านจบบทนี้แล้ว!');
        }
        saveCompletedState();
        updateSidebarActiveState();
      });
    }

    // 6. Mobile sidebar toggle
    if (elements.mobileToggleBtn) {
      elements.mobileToggleBtn.addEventListener('click', () => {
        elements.sidebar.classList.toggle('open');
        elements.sidebarBackdrop.classList.toggle('open');
      });
    }
    if (elements.sidebarBackdrop) {
      elements.sidebarBackdrop.addEventListener('click', closeMobileSidebar);
    }

    // 7. Search trigger
    const searchTriggerBtn = document.getElementById('search-trigger-btn');
    if (searchTriggerBtn) {
      searchTriggerBtn.addEventListener('click', openSearchModal);
    }
    const searchCloseBtn = document.getElementById('search-close-btn');
    if (searchCloseBtn) {
      searchCloseBtn.addEventListener('click', closeSearchModal);
    }
    if (elements.searchModal) {
      elements.searchModal.addEventListener('click', e => {
        if (e.target === elements.searchModal) closeSearchModal();
      });
    }
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', e => {
        renderSearchResults(e.target.value);
      });
    }

    // Keyboard shortcuts (Ctrl+K or '/' for search, Esc to close modals)
    window.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
      } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openSearchModal();
      } else if (e.key === 'Escape') {
        closeSearchModal();
        closeDiagramZoom();
        closeMobileSidebar();
      }
    });

    // Diagram Zoom Modal controls
    const diagramCloseBtn = document.getElementById('diagram-close-btn');
    if (diagramCloseBtn) diagramCloseBtn.addEventListener('click', closeDiagramZoom);

    const diagramZoomInBtn = document.getElementById('diagram-zoom-in-btn');
    if (diagramZoomInBtn) diagramZoomInBtn.addEventListener('click', () => zoomDiagram(0.25));

    const diagramZoomOutBtn = document.getElementById('diagram-zoom-out-btn');
    if (diagramZoomOutBtn) diagramZoomOutBtn.addEventListener('click', () => zoomDiagram(-0.25));

    const diagramResetBtn = document.getElementById('diagram-reset-btn');
    if (diagramResetBtn) diagramResetBtn.addEventListener('click', resetZoom);

    // Delegate wiki-links clicks inside article-body
    if (elements.articleBody) {
      elements.articleBody.addEventListener('click', e => {
        const link = e.target.closest('.wiki-link');
        if (link) {
          e.preventDefault();
          const docTarget = link.dataset.doc;
          const anchorTarget = link.dataset.anchor;
          navigateToDoc(docTarget, anchorTarget);
        }
      });
    }
  }

  function closeMobileSidebar() {
    if (elements.sidebar) elements.sidebar.classList.remove('open');
    if (elements.sidebarBackdrop) elements.sidebarBackdrop.classList.remove('open');
  }

  /* ---------------- Helpers ---------------- */

  function getDocFromHash() {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) return null;
    const parts = hash.split('#');
    return decodeURIComponent(parts[0]);
  }

  function getAnchorFromHash() {
    const hash = window.location.hash.replace(/^#\/?/, '');
    const parts = hash.split('#');
    return parts[1] ? decodeURIComponent(parts[1]) : null;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function unescapeHtml(str) {
    if (!str) return '';
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  }

  // Expose global methods for inline HTML events
  window.WikiApp = {
    openDiagramZoom,
    closeDiagramZoom,
    copyCode,
    runInSqlLab,
    navigateToDoc,
    renderMermaidDiagrams
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
