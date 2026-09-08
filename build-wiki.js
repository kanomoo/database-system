/**
 * build-wiki.js
 * Scans all Markdown files in Wiki/, extracts metadata & headings,
 * and compiles them into Wiki/wiki-data.js for instant offline reading.
 */

const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.join(__dirname, 'Wiki');
const OUTPUT_FILE = path.join(WIKI_DIR, 'wiki-data.js');

const CATEGORY_MAP = [
  {
    id: 'exam-prep',
    title: '🎯 [ข้อสอบ] โซนเตรียมสอบปฏิบัติการในคาบ',
    description: 'คู่มือและแนวข้อสอบเดี่ยว Normalization & SQL',
    files: [
      'In-Class Exam Guide - Normalization and SQL.md'
    ]
  },
  {
    id: 'exam-part1',
    title: '🎯 [ข้อสอบ ส่วนที่ 1] ออกแบบ & Normalization',
    description: 'บทที่ 4, 5, 6 — แผนภาพ ER, FDs, นอร์มัลไลเซชัน',
    files: [
      'Lecture 4 - ER Model.md',
      'Lecture 5 - Functional Dependencies.md',
      'Lecture 6 - Database Design and Normalization.md'
    ]
  },
  {
    id: 'exam-part2',
    title: '🎯 [ข้อสอบ ส่วนที่ 2] การเขียนคำสั่ง SQL',
    description: 'บทที่ 7 & 7.2 — SQL Fundamentals & Advanced Query',
    files: [
      'Lecture 7 (Part 1) - SQL Fundamentals (Slide 1-40).md',
      'Lecture 7 (Part 2) - SQL Fundamentals (Slide 41-80).md',
      'Lecture 7 (Part 3) - SQL Fundamentals (Slide 81-94).md',
      'Lecture 7.5 (Part 1) - Advanced SQL (Slide 1-40).md',
      'Lecture 7.5 (Part 2) - Advanced SQL (Slide 41-79).md'
    ]
  },
  {
    id: 'foundations',
    title: '📚 บทที่ 1 - 3: รากฐาน & Relational Algebra',
    description: 'Ch1-Ch3: สถาปัตยกรรม, Relational Model, พีชคณิต',
    files: [
      'Lecture 1 - Overview of Databases and Transaction Processing.md',
      'Lecture 2 - Database Architecture and Relational Model.md',
      'Lecture 3 - Relational Algebra.md'
    ]
  },
  {
    id: 'advanced',
    title: '🚀 บทที่ 8 - 9: หัวข้อขั้นสูง (Transactions & NoSQL)',
    description: 'Ch8-Ch9: สถาปัตยกรรมระดับองค์กร & ฐานข้อมูล NoSQL',
    files: [
      'Lecture 8 - Database System Architecture.md',
      'Lecture 9 - NoSQL Databases.md'
    ]
  },
  {
    id: 'resources',
    title: '📌 แผนการเรียน & คู่มือห้องทดลอง (Lab Guide)',
    description: 'สารบัญรวม & คู่มือปฏิบัติการ SQL Lab Zero to Hero',
    files: [
      'Database System Index.md',
      'Progress Checklist.md',
      'SQL Lab Practice Guide - Zero to Hero.md'
    ]
  }
];

function parseFrontmatter(text) {
  const meta = {};
  let body = text;
  if (text.startsWith('---')) {
    const endIdx = text.indexOf('\n---', 3);
    if (endIdx !== -1) {
      const rawMeta = text.slice(3, endIdx).trim();
      body = text.slice(endIdx + 4).trim();
      const lines = rawMeta.split('\n');
      let currentKey = null;
      lines.forEach(line => {
        const colonIdx = line.indexOf(':');
        if (line.trim().startsWith('- ') && currentKey) {
          if (!Array.isArray(meta[currentKey])) meta[currentKey] = [];
          meta[currentKey].push(line.trim().slice(2).trim());
        } else if (colonIdx !== -1) {
          const key = line.slice(0, colonIdx).trim();
          const val = line.slice(colonIdx + 1).trim();
          currentKey = key;
          meta[key] = val || [];
        }
      });
    }
  }
  return { meta, body };
}

function extractHeadings(markdown) {
  const headings = [];
  const lines = markdown.split('\n');
  lines.forEach(line => {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const title = match[2].replace(/\[!.*?\]/g, '').trim();
      const id = title
        .toLowerCase()
        .replace(/[^\w\u0E00-\u0E7F\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      headings.push({ level, title, id });
    }
  });
  return headings;
}

function extractExcerpt(markdown) {
  const lines = markdown.split('\n');
  for (let line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('> [!SUMMARY]') || trimmed.startsWith('> [!INFO]')) {
      continue;
    }
    if (trimmed.startsWith('>')) {
      const clean = trimmed.replace(/^>\s*/, '').trim();
      if (clean.length > 20) return clean.slice(0, 160) + '...';
    }
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('---') && !trimmed.startsWith('```')) {
      if (trimmed.length > 20) return trimmed.slice(0, 160) + '...';
    }
  }
  return '';
}

function build() {
  console.log('Building Wiki Data...');
  const allFiles = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));
  const processedMap = new Map();

  allFiles.forEach(filename => {
    const filePath = path.join(WIKI_DIR, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    const { meta, body } = parseFrontmatter(content);

    const titleMatch = content.match(/^#\s+(.+)$/m);
    const displayTitle = titleMatch ? titleMatch[1].trim() : filename.replace('.md', '');
    const headings = extractHeadings(content);
    const excerpt = extractExcerpt(body);
    const charCount = content.length;
    const wordCount = content.split(/\s+/).length;
    const estMinutes = Math.max(1, Math.round(charCount / 650)); // ~650 chars/min for Thai/technical text

    const id = filename.replace('.md', '').trim();

    processedMap.set(filename, {
      id,
      filename,
      title: displayTitle,
      meta,
      excerpt,
      charCount,
      wordCount,
      estMinutes,
      headings,
      content // Full raw markdown for fast client-side rendering
    });
  });

  const categories = CATEGORY_MAP.map(cat => {
    const docs = cat.files.map(f => {
      const doc = processedMap.get(f);
      if (!doc) {
        console.warn('Warning: file listed in category not found:', f);
        return null;
      }
      return {
        id: doc.id,
        filename: doc.filename,
        title: doc.title,
        excerpt: doc.excerpt,
        charCount: doc.charCount,
        estMinutes: doc.estMinutes,
        headingsCount: doc.headings.length
      };
    }).filter(Boolean);

    return {
      id: cat.id,
      title: cat.title,
      description: cat.description,
      docs
    };
  });

  // Also catch any orphan files not categorized
  const categorizedFilenames = new Set(CATEGORY_MAP.flatMap(c => c.files));
  const orphans = allFiles.filter(f => !categorizedFilenames.has(f));
  if (orphans.length > 0) {
    categories.push({
      id: 'other',
      title: '📁 เอกสารอื่นๆ',
      description: 'เอกสารเพิ่มเติม',
      docs: orphans.map(f => {
        const doc = processedMap.get(f);
        return {
          id: doc.id,
          filename: doc.filename,
          title: doc.title,
          excerpt: doc.excerpt,
          charCount: doc.charCount,
          estMinutes: doc.estMinutes,
          headingsCount: doc.headings.length
        };
      })
    });
  }

  // Convert map to plain object
  const documents = {};
  processedMap.forEach((val, key) => {
    documents[val.id] = val;
  });

  const wikiData = {
    generatedAt: new Date().toISOString(),
    categories,
    documents
  };

  const jsContent = `/**
 * Pre-bundled Database System Wiki Data
 * Generated: ${new Date().toLocaleString('th-TH')}
 * Total Documents: ${Object.keys(documents).length}
 * Allows 100% offline file:// reading without any CORS restrictions.
 */
window.WIKI_DATA = ${JSON.stringify(wikiData)};
`;

  fs.writeFileSync(OUTPUT_FILE, jsContent, 'utf8');
  console.log(`Successfully compiled ${Object.keys(documents).length} documents to ${OUTPUT_FILE}`);
  console.log(`Bundle size: ${(jsContent.length / 1024).toFixed(1)} KB`);
}

build();
