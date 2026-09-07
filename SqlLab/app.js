/**
 * SQL Lab Studio - Main Application Logic
 * Powered by SQLite WASM (sql.js)
 */

let SQL = null;
let db = null;
let isBeginnerMode = true;
let currentModuleIndex = 0;
let currentExerciseIndex = 0;

// DOM Elements
const beginnerContainer = document.getElementById("beginner-container");
const curriculumContainer = document.getElementById("curriculum-container");
const schemaContainer = document.getElementById("schema-container");
const schemaList = document.getElementById("schema-list");
const schemaCount = document.getElementById("schema-count");

const tabBeginner = document.getElementById("tab-beginner");
const tabCurriculum = document.getElementById("tab-curriculum");
const tabSchema = document.getElementById("tab-schema");

const crumbModule = document.getElementById("crumb-module");
const crumbExercise = document.getElementById("crumb-exercise");
const theoryTitle = document.getElementById("theory-title");
const theoryBadge = document.getElementById("theory-badge");
const theoryBody = document.getElementById("theory-body");

const sqlEditor = document.getElementById("sql-editor");
const resultContainer = document.getElementById("result-container");
const resultStatusBadge = document.getElementById("result-status-badge");
const resultRowsCount = document.getElementById("result-rows-count");
const resultExecTime = document.getElementById("result-exec-time");
const engineStatusText = document.getElementById("engine-status-text");

const btnRunSql = document.getElementById("btn-run-sql");
const btnResetDb = document.getElementById("btn-reset-db");
const btnLoadCleanSlate = document.getElementById("btn-load-clean-slate");
const btnCopyCode = document.getElementById("btn-copy-code");
const btnClearCode = document.getElementById("btn-clear-code");
const btnOpenGuide = document.getElementById("btn-open-guide");
const btnCloseModal = document.getElementById("btn-close-modal");
const guideModal = document.getElementById("guide-modal");

const editorGutter = document.getElementById("editor-gutter");
const editorCursorPos = document.getElementById("editor-cursor-pos");
const btnShortcutsHelp = document.getElementById("btn-shortcuts-help");
const btnCloseShortcutsModal = document.getElementById("btn-close-shortcuts-modal");
const shortcutsModal = document.getElementById("shortcuts-modal");
const btnFormatSql = document.getElementById("btn-format-sql");

// =============================================================================
// Initialize SQLite WASM Engine
// =============================================================================
async function initDatabaseEngine() {
  const statusDot = document.querySelector(".status-dot");
  if (statusDot) {
    statusDot.className = "status-dot loading";
  }
  engineStatusText.textContent = "กำลังเริ่มระบบ SQLite WASM...";

  if (typeof initSqlJs === "undefined") {
    console.error("ไม่พบไลบรารี initSqlJs");
    if (statusDot) statusDot.className = "status-dot error";
    engineStatusText.textContent = "ไม่พบไฟล์ไลบรารี SQLite";
    return;
  }

  // Strategy 1: Pre-embedded WASM Binary (Offline & file:// protocol supported 100%)
  if (typeof window !== "undefined" && window.SQL_WASM_BINARY) {
    try {
      SQL = await initSqlJs({ wasmBinary: window.SQL_WASM_BINARY });
      db = new SQL.Database();
      if (statusDot) statusDot.className = "status-dot ready";
      engineStatusText.textContent = "SQLite พร้อมใช้งาน (Offline In-Memory)";
      updateSchemaSidebar();
      return;
    } catch (binErr) {
      console.warn("Direct wasmBinary init failed, trying fetch fallback...", binErr);
    }
  }

  // Strategy 2: Local vendor/sql-wasm.wasm (Works when served via Web Server / Live Server)
  try {
    const config = {
      locateFile: (file) => `vendor/${file}`
    };
    SQL = await initSqlJs(config);
    db = new SQL.Database();
    if (statusDot) statusDot.className = "status-dot ready";
    engineStatusText.textContent = "SQLite WASM พร้อมใช้งาน (Local)";
    updateSchemaSidebar();
    return;
  } catch (err) {
    console.warn("Local WASM fetch failed, trying CDN fallback...", err);
  }

  // Strategy 3: CDN fallback
  try {
    const cdnConfig = {
      locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
    };
    SQL = await initSqlJs(cdnConfig);
    db = new SQL.Database();
    if (statusDot) statusDot.className = "status-dot ready";
    engineStatusText.textContent = "SQLite CDN พร้อมใช้งาน";
    updateSchemaSidebar();
  } catch (fallbackErr) {
    console.error("Critical: Cannot initialize SQLite engine", fallbackErr);
    if (statusDot) statusDot.className = "status-dot error";
    engineStatusText.textContent = "โหลดฐานข้อมูลไม่สำเร็จ";
    resultContainer.innerHTML = `
      <div class="error-banner">
        <strong>❌ ไม่สามารถเริ่มการทำงานของ SQLite WASM Engine ได้:</strong><br/>
        ${fallbackErr.message || fallbackErr}<br/><br/>
        <em>ข้อแนะนำ: หากเปิดไฟล์ผ่านเบราว์เซอร์ ลองเปิดด้วย Live Server หรือเปิดผ่าน Google Chrome/Edge เวอร์ชันล่าสุด</em>
      </div>
    `;
  }
}

// =============================================================================
// Render Beginner 101 Navigation
// =============================================================================
function renderBeginnerModules() {
  if (!beginnerContainer) return;
  beginnerContainer.innerHTML = "";

  BEGINNER_MODULES.forEach((mod, mIdx) => {
    const group = document.createElement("div");
    group.className = "module-group";

    const title = document.createElement("div");
    title.className = "module-title";
    title.textContent = mod.name;
    group.appendChild(title);

    mod.exercises.forEach((ex, eIdx) => {
      const item = document.createElement("div");
      item.className = "exercise-item";
      item.id = `nav-${ex.id}`;

      const nameSpan = document.createElement("span");
      nameSpan.textContent = ex.title;

      const badgeSpan = document.createElement("span");
      badgeSpan.className = "ex-badge";
      badgeSpan.textContent = ex.badge || "101";

      item.appendChild(nameSpan);
      item.appendChild(badgeSpan);

      item.addEventListener("click", () => {
        loadExercise(mIdx, eIdx, true);
      });

      group.appendChild(item);
    });

    beginnerContainer.appendChild(group);
  });
}

// =============================================================================
// Render Curriculum Navigation (Lecture Slides)
// =============================================================================
function renderCurriculum() {
  if (!curriculumContainer) return;
  curriculumContainer.innerHTML = "";

  LAB_MODULES.forEach((mod, mIdx) => {
    const group = document.createElement("div");
    group.className = "module-group";

    const title = document.createElement("div");
    title.className = "module-title";
    title.textContent = mod.name;
    group.appendChild(title);

    mod.exercises.forEach((ex, eIdx) => {
      const item = document.createElement("div");
      item.className = "exercise-item";
      item.id = `nav-${ex.id}`;

      const nameSpan = document.createElement("span");
      nameSpan.textContent = ex.title;

      const badgeSpan = document.createElement("span");
      badgeSpan.className = "ex-badge";
      badgeSpan.textContent = ex.badge || "Lab";

      item.appendChild(nameSpan);
      item.appendChild(badgeSpan);

      item.addEventListener("click", () => {
        loadExercise(mIdx, eIdx, false);
      });

      group.appendChild(item);
    });

    curriculumContainer.appendChild(group);
  });
}

// =============================================================================
// Load Exercise
// =============================================================================
function loadExercise(mIdx, eIdx, isBeginner = true) {
  isBeginnerMode = isBeginner;
  currentModuleIndex = mIdx;
  currentExerciseIndex = eIdx;

  const currentModuleList = isBeginner ? BEGINNER_MODULES : LAB_MODULES;
  const currentMod = currentModuleList[mIdx];
  const currentEx = currentMod.exercises[eIdx];

  // Update Breadcrumbs
  crumbModule.textContent = currentMod.name;
  crumbExercise.textContent = currentEx.title;

  // Update Theory Panel
  theoryTitle.textContent = currentEx.title;
  theoryBadge.textContent = currentEx.badge || (isBeginner ? "101" : "Lab");
  theoryBody.innerHTML = currentEx.theory || "<p>ไม่มีคำอธิบายเพิ่มเติม</p>";

  // Update Active Item in Sidebar
  document.querySelectorAll(".exercise-item").forEach((el) => el.classList.remove("active"));
  const activeNav = document.getElementById(`nav-${currentEx.id}`);
  if (activeNav) {
    activeNav.classList.add("active");
    activeNav.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  // On mobile/tablet, close sidebar drawer when an exercise is chosen
  if (window.innerWidth < 1024) {
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    if (sidebar) sidebar.classList.remove("open");
    if (sidebarOverlay) sidebarOverlay.classList.remove("active");
  }

  // Load default SQL into editor
  sqlEditor.value = currentEx.defaultSql || "";
  if (typeof updateLineNumbers === "function") {
    updateLineNumbers();
  }

  // Reset result viewer state
  resultStatusBadge.textContent = "พร้อมทำงาน";
  resultStatusBadge.style.color = "var(--text-muted)";
  resultRowsCount.textContent = "0 แถว";
  resultExecTime.textContent = "0 ms";

  resultContainer.innerHTML = `
    <div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
      <p>กดปุ่ม <b>"เรียกให้ทำงาน (Run)"</b> หรือ <code>Ctrl + Enter</code> เพื่อทดสอบคำสั่งนี้</p>
    </div>
  `;
}

// =============================================================================
// Execute SQL Query
// =============================================================================
function executeSql() {
  if (!db) {
    const statusText = engineStatusText ? engineStatusText.textContent : "";
    if (statusText.includes("กำลังเริ่ม") || statusText.includes("กำลังโหลด")) {
      alert("ระบบฐานข้อมูลกำลังเริ่มการทำงาน กรุณารอสักครู่ (ประมาณ 1 วินาที) แล้วกดใหม่อีกครั้งครับ");
    } else {
      alert("ระบบฐานข้อมูลยังไม่พร้อมใช้งาน กรุณารีเฟรชหน้าเว็บ หรือตรวจดูข้อความ Error ที่หน้าต่างผลลัพธ์");
    }
    return;
  }

  const query = sqlEditor.value.trim();
  if (!query) {
    resultContainer.innerHTML = `
      <div class="empty-state">
        <p>กรุณาพิมพ์คำสั่ง SQL ก่อนกดรัน</p>
      </div>
    `;
    return;
  }

  const startTime = performance.now();

  try {
    const results = db.exec(query);
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(1);

    resultExecTime.textContent = `${duration} ms`;

    if (!results || results.length === 0) {
      resultStatusBadge.textContent = "สำเร็จ (Success)";
      resultStatusBadge.style.color = "var(--accent-emerald)";
      resultRowsCount.textContent = "0 แถวที่คืนค่า";

      resultContainer.innerHTML = `
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 20px; color: #6ee7b7;">
          <h4 style="margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ประมวลผลคำสั่งสำเร็จสมบูรณ์!
          </h4>
          <p style="font-size: 0.88rem; color: #a7f3d0;">
            คำสั่งของคุณทำงานเรียบร้อยแล้ว หากเป็นคำสั่งสร้างตาราง (CREATE TABLE) หรือนำเข้าข้อมูล (INSERT) สามารถสลับไปดูที่แท็บ <b>"ตาราง"</b> ในแถบด้านข้างได้เลย
          </p>
        </div>
      `;
    } else {
      const lastResult = results[results.length - 1];
      const rows = lastResult.values;
      const columns = lastResult.columns;

      resultStatusBadge.textContent = "สำเร็จ (Success)";
      resultStatusBadge.style.color = "var(--accent-emerald)";
      resultRowsCount.textContent = `${rows.length} แถว`;

      renderResultTable(columns, rows);
    }

    updateSchemaSidebar();
  } catch (err) {
    const endTime = performance.now();
    resultExecTime.textContent = `${(endTime - startTime).toFixed(1)} ms`;
    resultStatusBadge.textContent = "ผิดพลาด (Error)";
    resultStatusBadge.style.color = "var(--accent-rose)";
    resultRowsCount.textContent = "-";

    resultContainer.innerHTML = `
      <div class="error-banner">
        <strong>❌ ข้อผิดพลาดของคำสั่ง SQL (Syntax/Runtime Error):</strong><br/><br/>
        <div style="background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 6px; font-size: 0.88rem;">
          ${escapeHtml(err.message)}
        </div>
        <p style="margin-top: 12px; font-size: 0.8rem; color: #fecdd3;">
          💡 ตรวจสอบ: ลืมใส่เครื่องหมายคำพูดรอบข้อความ, สะกดชื่อคอลัมน์หรือตารางผิด, หรือลืมใส่เครื่องหมายเซมิโคลอน (;) ปิดท้ายคำสั่งหรือไม่
        </p>
      </div>
    `;
  }
}

// =============================================================================
// Render Data Table HTML
// =============================================================================
function renderResultTable(columns, rows) {
  let html = `<table class="sql-table"><thead><tr>`;
  
  columns.forEach((col) => {
    html += `<th>${escapeHtml(col)}</th>`;
  });
  html += `</tr></thead><tbody>`;

  if (rows.length === 0) {
    html += `<tr><td colspan="${columns.length}" style="text-align: center; color: var(--text-muted); padding: 20px;">ไม่พบแถวข้อมูล (Empty set)</td></tr>`;
  } else {
    rows.forEach((row) => {
      html += `<tr>`;
      row.forEach((val) => {
        if (val === null || val === undefined) {
          html += `<td class="null-val">NULL</td>`;
        } else {
          html += `<td>${escapeHtml(String(val))}</td>`;
        }
      });
      html += `</tr>`;
    });
  }

  html += `</tbody></table>`;
  resultContainer.innerHTML = html;
}

// =============================================================================
// Update Table Schema Sidebar
// =============================================================================
function updateSchemaSidebar() {
  if (!db) return;

  try {
    const res = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;");
    if (!res || res.length === 0 || res[0].values.length === 0) {
      schemaCount.textContent = "0";
      schemaList.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); font-size: 0.85rem; padding: 20px;">
          ยังไม่มีตารางในฐานข้อมูล<br/>(ลองรันคำสั่งสร้างตารางในแบบฝึกหัด)
        </div>
      `;
      return;
    }

    const tableNames = res[0].values.map((row) => row[0]);
    schemaCount.textContent = tableNames.length;
    schemaList.innerHTML = "";

    tableNames.forEach((tableName) => {
      const card = document.createElement("div");
      card.className = "schema-table-card";

      let rowCount = 0;
      try {
        const countRes = db.exec(`SELECT COUNT(*) FROM "${tableName}";`);
        if (countRes.length > 0 && countRes[0].values.length > 0) {
          rowCount = countRes[0].values[0][0];
        }
      } catch (e) {}

      let cols = [];
      try {
        const colRes = db.exec(`PRAGMA table_info("${tableName}");`);
        if (colRes.length > 0) {
          cols = colRes[0].values.map((c) => ({
            name: c[1],
            type: c[2] || "TEXT",
            pk: c[5] === 1
          }));
        }
      } catch (e) {}

      const head = document.createElement("div");
      head.className = "schema-table-head";
      head.title = `คลิกเพื่อสร้างคำสั่ง SELECT * FROM ${tableName}`;
      head.innerHTML = `
        <strong>${escapeHtml(tableName)}</strong>
        <span class="schema-badge">${rowCount} แถว</span>
      `;

      head.addEventListener("click", () => {
        sqlEditor.value = `SELECT * FROM "${tableName}" LIMIT 50;`;
        if (typeof updateLineNumbers === "function") {
          updateLineNumbers();
        }
        executeSql();
      });

      const colsList = document.createElement("div");
      colsList.className = "schema-cols-list";

      cols.forEach((col) => {
        const colRow = document.createElement("div");
        colRow.className = "schema-col-row";
        colRow.innerHTML = `
          <span>${col.pk ? "🔑 " : ""}${escapeHtml(col.name)}</span>
          <span style="color: var(--text-muted); font-size: 0.7rem;">${escapeHtml(col.type)}</span>
        `;
        colsList.appendChild(colRow);
      });

      card.appendChild(head);
      card.appendChild(colsList);
      schemaList.appendChild(card);
    });
  } catch (e) {
    console.error("Error updating schema sidebar", e);
  }
}

// =============================================================================
// Helper Functions & Event Listeners
// =============================================================================
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Tab Switching in Sidebar
if (tabBeginner) {
  tabBeginner.addEventListener("click", () => {
    tabBeginner.classList.add("active");
    tabCurriculum.classList.remove("active");
    tabSchema.classList.remove("active");
    beginnerContainer.style.display = "block";
    curriculumContainer.style.display = "none";
    schemaContainer.style.display = "none";
  });
}

if (tabCurriculum) {
  tabCurriculum.addEventListener("click", () => {
    tabCurriculum.classList.add("active");
    if (tabBeginner) tabBeginner.classList.remove("active");
    tabSchema.classList.remove("active");
    if (beginnerContainer) beginnerContainer.style.display = "none";
    curriculumContainer.style.display = "block";
    schemaContainer.style.display = "none";
  });
}

if (tabSchema) {
  tabSchema.addEventListener("click", () => {
    tabSchema.classList.add("active");
    if (tabBeginner) tabBeginner.classList.remove("active");
    tabCurriculum.classList.remove("active");
    if (beginnerContainer) beginnerContainer.style.display = "none";
    curriculumContainer.style.display = "none";
    schemaContainer.style.display = "block";
    updateSchemaSidebar();
  });
}

// Run Button
btnRunSql.addEventListener("click", executeSql);

// Keyboard Shortcut: Ctrl + Enter / Cmd + Enter
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    executeSql();
  }
});

// Reset Database completely
btnResetDb.addEventListener("click", () => {
  if (confirm("คุณต้องการล้างฐานข้อมูลทั้งหมดใช่หรือไม่? (ตารางและข้อมูลทั้งหมดจะถูกลบ)")) {
    if (SQL) {
      db = new SQL.Database();
      updateSchemaSidebar();
      resultContainer.innerHTML = `
        <div class="empty-state">
          <p>ฐานข้อมูลถูกรีเซ็ตเรียบร้อยแล้ว ตารางทั้งหมดถูกล้างแล้ว</p>
        </div>
      `;
    }
  }
});

// Reload Clean Slate for Current Exercise
btnLoadCleanSlate.addEventListener("click", () => {
  const currentList = isBeginnerMode ? BEGINNER_MODULES : LAB_MODULES;
  const currentEx = currentList[currentModuleIndex].exercises[currentExerciseIndex];
  sqlEditor.value = currentEx.defaultSql || "";
  updateLineNumbers();
  resultContainer.innerHTML = `
    <div class="empty-state">
      <p>โหลดโค้ดตั้งต้นใหม่แล้ว กด <b>"เรียกให้ทำงาน (Run)"</b> เพื่อทดสอบ</p>
    </div>
  `;
});

// Copy Code
btnCopyCode.addEventListener("click", () => {
  navigator.clipboard.writeText(sqlEditor.value).then(() => {
    const originalText = btnCopyCode.textContent;
    btnCopyCode.textContent = "คัดลอกแล้ว! ✅";
    setTimeout(() => {
      btnCopyCode.textContent = originalText;
    }, 1500);
  });
});

// Clear Editor
btnClearCode.addEventListener("click", () => {
  sqlEditor.value = "";
  sqlEditor.focus();
  hideAutocomplete();
  updateLineNumbers();
});

// Format SQL Button
if (btnFormatSql) {
  btnFormatSql.addEventListener("click", () => {
    formatSqlCode();
  });
}

// Modal Dialog Handlers
btnOpenGuide.addEventListener("click", () => {
  guideModal.classList.add("open");
});

btnCloseModal.addEventListener("click", () => {
  guideModal.classList.remove("open");
});

guideModal.addEventListener("click", (e) => {
  if (e.target === guideModal) {
    guideModal.classList.remove("open");
  }
});

// Shortcuts Cheat Sheet Modal Handlers
if (btnShortcutsHelp) {
  btnShortcutsHelp.addEventListener("click", () => {
    if (shortcutsModal) shortcutsModal.classList.add("open");
  });
}

if (btnCloseShortcutsModal) {
  btnCloseShortcutsModal.addEventListener("click", () => {
    if (shortcutsModal) shortcutsModal.classList.remove("open");
  });
}

if (shortcutsModal) {
  shortcutsModal.addEventListener("click", (e) => {
    if (e.target === shortcutsModal) {
      shortcutsModal.classList.remove("open");
    }
  });
}

// =============================================================================
// VS Code-style Autocomplete / IntelliSense Engine
// =============================================================================
const acPopup = document.getElementById("autocomplete-popup");

const SQL_KEYWORDS = [
  { label: "SELECT", type: "keyword", desc: "เลือกคอลัมน์ที่ต้องการดู" },
  { label: "FROM", type: "keyword", desc: "ระบุตารางต้นทาง" },
  { label: "WHERE", type: "keyword", desc: "กรองเงื่อนไขแถว (Filter)" },
  { label: "INSERT INTO", type: "keyword", insertText: "INSERT INTO ", desc: "หยอดข้อมูลแถวใหม่" },
  { label: "VALUES", type: "keyword", desc: "ชุดข้อมูลที่จะหยอด" },
  { label: "CREATE TABLE", type: "keyword", insertText: "CREATE TABLE ", desc: "สร้างตารางใหม่" },
  { label: "DROP TABLE IF EXISTS", type: "keyword", insertText: "DROP TABLE IF EXISTS ", desc: "ลบตารางเดิมถ้ามีอยู่" },
  { label: "ALTER TABLE", type: "keyword", insertText: "ALTER TABLE ", desc: "แก้ไขโครงสร้างตาราง" },
  { label: "ADD", type: "keyword", desc: "เพิ่มคอลัมน์ใหม่" },
  { label: "DROP COLUMN", type: "keyword", insertText: "DROP COLUMN ", desc: "ลบคอลัมน์ทิ้ง" },
  { label: "UPDATE", type: "keyword", desc: "แก้ไขข้อมูลแถว" },
  { label: "SET", type: "keyword", desc: "กำหนดค่าใหม่" },
  { label: "DELETE FROM", type: "keyword", insertText: "DELETE FROM ", desc: "ลบข้อมูลแถว" },
  { label: "ORDER BY", type: "keyword", insertText: "ORDER BY ", desc: "จัดเรียงลำดับแถว" },
  { label: "GROUP BY", type: "keyword", insertText: "GROUP BY ", desc: "มัดรวมกลุ่ม (Pivot)" },
  { label: "HAVING", type: "keyword", desc: "กรองผลรวมกลุ่ม" },
  { label: "INNER JOIN", type: "keyword", insertText: "INNER JOIN ", desc: "เชื่อมตารางแบบตรงกัน" },
  { label: "LEFT JOIN", type: "keyword", insertText: "LEFT JOIN ", desc: "เชื่อมตารางเก็บฝั่งซ้ายครบ" },
  { label: "RIGHT JOIN", type: "keyword", insertText: "RIGHT JOIN ", desc: "เชื่อมตารางเก็บฝั่งขวาครบ" },
  { label: "ON", type: "keyword", desc: "เงื่อนไขการเชื่อมตาราง" },
  { label: "AS", type: "keyword", desc: "ตั้งชื่อเล่น (Alias)" },
  { label: "DISTINCT", type: "keyword", desc: "ตัดข้อมูลที่ซ้ำกันออก" },
  { label: "LIMIT", type: "keyword", desc: "จำกัดจำนวนแถว" },
  { label: "LIKE", type: "keyword", desc: "ค้นหาข้อความบางส่วน" },
  { label: "IN", type: "keyword", desc: "อยู่ในกลุ่มที่กำหนด" },
  { label: "BETWEEN", type: "keyword", desc: "อยู่ระหว่างช่วง" },
  { label: "IS NULL", type: "keyword", desc: "เป็นค่าว่างเปล่า" },
  { label: "IS NOT NULL", type: "keyword", desc: "ไม่ใช่ค่าว่างเปล่า" },
  { label: "AND", type: "keyword", desc: "และ (ต้องจริงทั้งคู่)" },
  { label: "OR", type: "keyword", desc: "หรือ (จริงอย่างใดอย่างหนึ่ง)" },
  { label: "NOT", type: "keyword", desc: "ตรงกันข้าม" },
  { label: "UNION", type: "keyword", desc: "รวมผลลัพธ์ 2 ตาราง" },
  { label: "UNION ALL", type: "keyword", desc: "รวมผลลัพธ์แบบเก็บตัวซ้ำ" },
  { label: "PRIMARY KEY", type: "type", desc: "คีย์หลัก ห้ามซ้ำ/ห้ามว่าง" },
  { label: "FOREIGN KEY", type: "type", desc: "คีย์นอก เชื่อมตารางแม่" },
  { label: "REFERENCES", type: "keyword", desc: "อ้างอิงตารางแม่" },
  { label: "DESC", type: "keyword", desc: "เรียงจากมากไปน้อย" },
  { label: "ASC", type: "keyword", desc: "เรียงจากน้อยไปมาก" },
  { label: "CREATE VIEW", type: "keyword", insertText: "CREATE VIEW ", desc: "สร้างตารางเสมือน" },
  
  // Types
  { label: "VARCHAR(50)", type: "type", desc: "ข้อความความยาวแปรผัน (สูงสุด 50)" },
  { label: "VARCHAR(100)", type: "type", desc: "ข้อความความยาวแปรผัน (สูงสุด 100)" },
  { label: "VARCHAR(255)", type: "type", desc: "ข้อความมาตรฐาน W3Schools (255)" },
  { label: "CHAR(10)", type: "type", desc: "ข้อความความยาวคงที่ 10 ช่อง" },
  { label: "INT", type: "type", desc: "ตัวเลขจำนวนเต็ม" },
  { label: "INTEGER", type: "type", desc: "ตัวเลขจำนวนเต็ม" },
  { label: "DECIMAL(10,2)", type: "type", desc: "ตัวเลขทศนิยม 2 ตำแหน่ง" },
  { label: "TEXT", type: "type", desc: "ข้อความยาวไม่จำกัด" },
  { label: "DATE", type: "type", desc: "วันที่ (YYYY-MM-DD)" },
  
  // Functions
  { label: "COUNT(*)", type: "function", desc: "นับจำนวนแถวทั้งหมด" },
  { label: "SUM()", type: "function", insertText: "SUM()", desc: "หาผลรวมตัวเลข" },
  { label: "AVG()", type: "function", insertText: "AVG()", desc: "หาค่าเฉลี่ยตัวเลข" },
  { label: "MIN()", type: "function", insertText: "MIN()", desc: "หาค่าน้อยที่สุด" },
  { label: "MAX()", type: "function", insertText: "MAX()", desc: "หาค่ามากที่สุด" },
  { label: "ROUND()", type: "function", insertText: "ROUND()", desc: "ปัดเศษทศนิยม" },
  
  // Snippets
  { 
    label: "sel*", 
    type: "snippet", 
    insertText: "SELECT * FROM ", 
    desc: "คำสั่งดึงข้อมูลครบทุกคอลัมน์" 
  },
  { 
    label: "create-table", 
    type: "snippet", 
    insertText: "CREATE TABLE MyTable (\n    ID INT PRIMARY KEY,\n    Name VARCHAR(50)\n);", 
    desc: "แม่แบบสร้างตารางใหม่" 
  },
  { 
    label: "insert-values", 
    type: "snippet", 
    insertText: "INSERT INTO MyTable VALUES (1, 'ตัวอย่าง');", 
    desc: "แม่แบบหยอดข้อมูลแถวใหม่" 
  },
  { 
    label: "drop-table", 
    type: "snippet", 
    insertText: "DROP TABLE IF EXISTS MyTable;", 
    desc: "แม่แบบลบตารางทิ้งถ้ามี" 
  },
  { 
    label: "alter-add", 
    type: "snippet", 
    insertText: "ALTER TABLE MyTable ADD NewColumn VARCHAR(50);", 
    desc: "แม่แบบเพิ่มคอลัมน์ใหม่ในตาราง" 
  }
];

let acItems = [];
let acSelectedIndex = 0;
let mirrorDiv = null;

// Get dynamic tables and columns currently in SQLite
function getDynamicDatabaseSchema() {
  const dynamicItems = [];
  if (!db) return dynamicItems;

  try {
    const res = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
    if (res && res.length > 0 && res[0].values) {
      res[0].values.forEach(([tableName]) => {
        dynamicItems.push({
          label: tableName,
          type: "table",
          desc: "ตารางในระบบ"
        });

        try {
          const colRes = db.exec(`PRAGMA table_info("${tableName}");`);
          if (colRes && colRes.length > 0 && colRes[0].values) {
            colRes[0].values.forEach((c) => {
              dynamicItems.push({
                label: c[1],
                type: "column",
                desc: `คอลัมน์ของ ${tableName}`
              });
            });
          }
        } catch (e) {}
      });
    }
  } catch (e) {}

  return dynamicItems;
}

// Mirror div for Caret Coordinates
function getCaretCoordinates(element, position) {
  if (!mirrorDiv) {
    mirrorDiv = document.createElement("div");
    mirrorDiv.id = "textarea-caret-mirror";
    document.body.appendChild(mirrorDiv);
  }

  const style = window.getComputedStyle(element);
  const properties = [
    "direction", "boxSizing", "width", "height", "overflowX", "overflowY",
    "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth",
    "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
    "fontStyle", "fontVariant", "fontWeight", "fontSize",
    "lineHeight", "fontFamily", "textAlign", "textTransform",
    "letterSpacing", "wordSpacing"
  ];

  properties.forEach(prop => {
    mirrorDiv.style[prop] = style[prop];
  });

  mirrorDiv.style.position = "absolute";
  mirrorDiv.style.top = "-9999px";
  mirrorDiv.style.left = "-9999px";
  mirrorDiv.style.visibility = "hidden";
  mirrorDiv.style.whiteSpace = "pre";
  mirrorDiv.style.wordWrap = "normal";

  const text = element.value.substring(0, position);
  mirrorDiv.textContent = text;

  const span = document.createElement("span");
  span.textContent = element.value.substring(position) || ".";
  mirrorDiv.appendChild(span);

  return {
    top: span.offsetTop,
    left: span.offsetLeft,
    height: span.offsetHeight || 18
  };
}

function updateAcPosition() {
  if (!acPopup || acPopup.classList.contains("hidden")) return;
  const cursorPos = sqlEditor.selectionStart;
  const coords = getCaretCoordinates(sqlEditor, cursorPos);
  const editorHeaderHeight = 38;
  const gutterWidth = 44;

  let top = coords.top - sqlEditor.scrollTop + editorHeaderHeight + coords.height + 4;
  let left = coords.left - sqlEditor.scrollLeft + gutterWidth + 12;

  const maxLeft = sqlEditor.clientWidth + gutterWidth - 330;
  if (left > maxLeft) left = Math.max(gutterWidth + 12, maxLeft);
  if (left < gutterWidth + 12) left = gutterWidth + 12;

  const maxTop = sqlEditor.clientHeight + editorHeaderHeight - 240;
  if (top > maxTop) {
    top = Math.max(editorHeaderHeight + 4, coords.top - sqlEditor.scrollTop + editorHeaderHeight - 240);
  }

  acPopup.style.top = `${top}px`;
  acPopup.style.left = `${left}px`;
}

function triggerAutocomplete(force = false) {
  const cursorPos = sqlEditor.selectionStart;
  const text = sqlEditor.value;
  const beforeCursor = text.substring(0, cursorPos);
  const wordMatch = beforeCursor.match(/([a-zA-Z0-9_*]+)$/);
  const query = wordMatch ? wordMatch[1] : "";

  if (!force && query.length === 0) {
    hideAutocomplete();
    return;
  }

  // Combine static and dynamic items
  const dynamicItems = getDynamicDatabaseSchema();
  const seen = new Set();
  const allCandidates = [];

  [...dynamicItems, ...SQL_KEYWORDS].forEach(item => {
    const key = item.label.toUpperCase();
    if (!seen.has(key)) {
      seen.add(key);
      allCandidates.push(item);
    }
  });

  const qUpper = query.toUpperCase();
  acItems = allCandidates.filter(item => {
    if (!query) return true;
    return item.label.toUpperCase().includes(qUpper);
  });

  acItems.sort((a, b) => {
    const aStarts = a.label.toUpperCase().startsWith(qUpper);
    const bStarts = b.label.toUpperCase().startsWith(qUpper);
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return a.label.length - b.label.length;
  });

  acItems = acItems.slice(0, 10);

  if (acItems.length === 0) {
    hideAutocomplete();
    return;
  }

  acSelectedIndex = 0;
  renderAcList(query);
  acPopup.classList.remove("hidden");
  updateAcPosition();
}

function renderAcList(query) {
  acPopup.innerHTML = "";
  const listContainer = document.createElement("div");

  acItems.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = `autocomplete-item ${idx === acSelectedIndex ? "selected" : ""}`;

    let labelHtml = escapeHtml(item.label);
    if (query) {
      const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(${escapedQuery})`, "gi");
      labelHtml = labelHtml.replace(regex, "<mark>$1</mark>");
    }

    row.innerHTML = `
      <div class="ac-left">
        <span class="ac-tag ${item.type}">${item.type.slice(0, 4)}</span>
        <span class="ac-name">${labelHtml}</span>
      </div>
      <span class="ac-detail">${escapeHtml(item.desc || "")}</span>
    `;

    row.addEventListener("mousedown", (e) => {
      e.preventDefault();
      applyAcItem(item);
    });

    listContainer.appendChild(row);
  });

  acPopup.appendChild(listContainer);

  const footer = document.createElement("div");
  footer.className = "autocomplete-footer";
  footer.innerHTML = `
    <span>↑↓ เลื่อน | Tab/Enter เติมคำ</span>
    <span>Esc ปิด</span>
  `;
  acPopup.appendChild(footer);
}

function moveAcSelection(delta) {
  if (acItems.length === 0) return;
  acSelectedIndex = (acSelectedIndex + delta + acItems.length) % acItems.length;
  const items = acPopup.querySelectorAll(".autocomplete-item");
  items.forEach((el, i) => {
    if (i === acSelectedIndex) {
      el.classList.add("selected");
      el.scrollIntoView({ block: "nearest" });
    } else {
      el.classList.remove("selected");
    }
  });
}

function applyAcSelection() {
  if (acItems.length > 0 && acItems[acSelectedIndex]) {
    applyAcItem(acItems[acSelectedIndex]);
  }
}

function applyAcItem(item) {
  const cursorPos = sqlEditor.selectionStart;
  const text = sqlEditor.value;
  const beforeCursor = text.substring(0, cursorPos);
  const afterCursor = text.substring(cursorPos);

  const wordMatch = beforeCursor.match(/([a-zA-Z0-9_*]+)$/);
  const word = wordMatch ? wordMatch[1] : "";
  const replaceStart = cursorPos - word.length;

  let insertText = item.insertText !== undefined ? item.insertText : item.label;
  if (item.type === "keyword" && !insertText.endsWith(" ") && !insertText.endsWith(")") && !insertText.endsWith("\n")) {
    insertText += " ";
  }

  const newText = text.substring(0, replaceStart) + insertText + afterCursor;
  sqlEditor.value = newText;

  const newCursor = replaceStart + insertText.length;
  sqlEditor.setSelectionRange(newCursor, newCursor);
  sqlEditor.focus();
  hideAutocomplete();
  updateLineNumbers();
}

function hideAutocomplete() {
  if (acPopup) {
    acPopup.classList.add("hidden");
  }
}

// =============================================================================
// VS Code-style Editor Enhancements (Gutter, Shortcuts, Smart Indent, Auto-pairs)
// =============================================================================

function updateCursorPosition() {
  if (!editorCursorPos) return;
  const pos = sqlEditor.selectionStart || 0;
  const val = sqlEditor.value || "";
  const textBefore = val.substring(0, pos);
  const lines = textBefore.split("\n");
  const lineNum = lines.length;
  const colNum = lines[lines.length - 1].length + 1;
  editorCursorPos.textContent = `Ln ${lineNum}, Col ${colNum}`;

  if (editorGutter) {
    const activeLines = editorGutter.querySelectorAll(".line-num.active");
    activeLines.forEach(el => el.classList.remove("active"));
    const currentLineEl = editorGutter.children[lineNum - 1];
    if (currentLineEl) {
      currentLineEl.classList.add("active");
    }
  }
}

function updateLineNumbers() {
  if (!editorGutter) return;
  const lines = (sqlEditor.value || "").split("\n");
  const lineCount = Math.max(1, lines.length);

  const pos = sqlEditor.selectionStart || 0;
  const textBefore = (sqlEditor.value || "").substring(0, pos);
  const activeLineIdx = textBefore.split("\n").length;

  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= lineCount; i++) {
    const div = document.createElement("div");
    div.className = `line-num${i === activeLineIdx ? " active" : ""}`;
    div.textContent = i;
    fragment.appendChild(div);
  }
  editorGutter.innerHTML = "";
  editorGutter.appendChild(fragment);

  editorGutter.scrollTop = sqlEditor.scrollTop;
  updateCursorPosition();
}

function toggleLineComment() {
  const start = sqlEditor.selectionStart;
  const end = sqlEditor.selectionEnd;
  const val = sqlEditor.value;

  const lineStart = val.lastIndexOf("\n", start - 1) + 1;
  let lineEnd = val.indexOf("\n", end);
  if (lineEnd === -1) lineEnd = val.length;

  const selectedLinesStr = val.substring(lineStart, lineEnd);
  const lines = selectedLinesStr.split("\n");

  const nonBlank = lines.filter(l => l.trim().length > 0);
  const allCommented = nonBlank.length > 0 && nonBlank.every(l => l.trimStart().startsWith("--"));

  let modifiedLines;
  if (allCommented) {
    // Uncomment
    modifiedLines = lines.map(l => {
      const match = l.match(/^(\s*)--\s?(.*)$/);
      return match ? match[1] + match[2] : l;
    });
  } else {
    // Comment
    modifiedLines = lines.map(l => {
      if (l.trim().length === 0 && lines.length > 1) return l;
      return "-- " + l;
    });
  }

  const replacement = modifiedLines.join("\n");
  sqlEditor.value = val.substring(0, lineStart) + replacement + val.substring(lineEnd);

  if (start === end) {
    const shift = allCommented ? -3 : 3;
    const newPos = Math.max(lineStart, Math.min(sqlEditor.value.length, start + shift));
    sqlEditor.setSelectionRange(newPos, newPos);
  } else {
    const diff = replacement.length - selectedLinesStr.length;
    sqlEditor.setSelectionRange(lineStart, Math.max(lineStart, end + diff));
  }

  updateLineNumbers();
}

function toggleBlockComment() {
  const start = sqlEditor.selectionStart;
  const end = sqlEditor.selectionEnd;
  const val = sqlEditor.value;

  if (start !== end) {
    const selected = val.substring(start, end);
    if (selected.startsWith("/*") && selected.endsWith("*/")) {
      const unwrapped = selected.substring(2, selected.length - 2).trim();
      sqlEditor.value = val.substring(0, start) + unwrapped + val.substring(end);
      sqlEditor.setSelectionRange(start, start + unwrapped.length);
    } else {
      sqlEditor.value = val.substring(0, start) + "/* " + selected + " */" + val.substring(end);
      sqlEditor.setSelectionRange(start, end + 6);
    }
  } else {
    sqlEditor.value = val.substring(0, start) + "/*  */" + val.substring(end);
    sqlEditor.setSelectionRange(start + 3, start + 3);
  }
  updateLineNumbers();
}

function moveLine(direction) {
  const start = sqlEditor.selectionStart;
  const end = sqlEditor.selectionEnd;
  const val = sqlEditor.value;

  const lineStart = val.lastIndexOf("\n", start - 1) + 1;
  let lineEnd = val.indexOf("\n", end);
  if (lineEnd === -1) lineEnd = val.length;

  const currentBlock = val.substring(lineStart, lineEnd);

  if (direction === -1) {
    if (lineStart === 0) return;
    const prevLineStart = val.lastIndexOf("\n", lineStart - 2) + 1;
    const prevBlock = val.substring(prevLineStart, lineStart - 1);

    sqlEditor.value = val.substring(0, prevLineStart) + currentBlock + "\n" + prevBlock + val.substring(lineEnd);
    const offset = prevBlock.length + 1;
    sqlEditor.setSelectionRange(start - offset, end - offset);
  } else if (direction === 1) {
    if (lineEnd >= val.length) return;
    let nextLineEnd = val.indexOf("\n", lineEnd + 1);
    if (nextLineEnd === -1) nextLineEnd = val.length;
    const nextBlock = val.substring(lineEnd + 1, nextLineEnd);

    sqlEditor.value = val.substring(0, lineStart) + nextBlock + "\n" + currentBlock + val.substring(nextLineEnd);
    const offset = nextBlock.length + 1;
    sqlEditor.setSelectionRange(start + offset, end + offset);
  }

  updateLineNumbers();
}

function duplicateLine(direction) {
  const start = sqlEditor.selectionStart;
  const end = sqlEditor.selectionEnd;
  const val = sqlEditor.value;

  const lineStart = val.lastIndexOf("\n", start - 1) + 1;
  let lineEnd = val.indexOf("\n", end);
  if (lineEnd === -1) lineEnd = val.length;

  const currentBlock = val.substring(lineStart, lineEnd);

  if (direction === 1) {
    sqlEditor.value = val.substring(0, lineEnd) + "\n" + currentBlock + val.substring(lineEnd);
    const offset = currentBlock.length + 1;
    sqlEditor.setSelectionRange(start + offset, end + offset);
  } else {
    sqlEditor.value = val.substring(0, lineStart) + currentBlock + "\n" + val.substring(lineStart);
    sqlEditor.setSelectionRange(start, end);
  }

  updateLineNumbers();
}

function deleteLine() {
  const start = sqlEditor.selectionStart;
  const end = sqlEditor.selectionEnd;
  const val = sqlEditor.value;

  let lineStart = val.lastIndexOf("\n", start - 1) + 1;
  let lineEnd = val.indexOf("\n", end);

  if (lineEnd === -1) {
    if (lineStart > 0) {
      lineStart -= 1;
    }
    lineEnd = val.length;
  } else {
    lineEnd += 1;
  }

  sqlEditor.value = val.substring(0, lineStart) + val.substring(lineEnd);
  sqlEditor.setSelectionRange(lineStart, lineStart);
  updateLineNumbers();
}

function handleTab(e) {
  e.preventDefault();
  const start = sqlEditor.selectionStart;
  const end = sqlEditor.selectionEnd;
  const val = sqlEditor.value;

  if (start !== end && val.substring(start, end).includes("\n")) {
    const lineStart = val.lastIndexOf("\n", start - 1) + 1;
    let lineEnd = val.indexOf("\n", end);
    if (lineEnd === -1) lineEnd = val.length;

    const block = val.substring(lineStart, lineEnd);
    const lines = block.split("\n");
    let lengthDiff = 0;

    let modifiedLines;
    if (e.shiftKey) {
      modifiedLines = lines.map(l => {
        if (l.startsWith("  ")) {
          lengthDiff -= 2;
          return l.substring(2);
        } else if (l.startsWith(" ") || l.startsWith("\t")) {
          lengthDiff -= 1;
          return l.substring(1);
        }
        return l;
      });
    } else {
      modifiedLines = lines.map(l => {
        lengthDiff += 2;
        return "  " + l;
      });
    }

    const replacement = modifiedLines.join("\n");
    sqlEditor.value = val.substring(0, lineStart) + replacement + val.substring(lineEnd);
    sqlEditor.setSelectionRange(lineStart, lineEnd + lengthDiff);
    updateLineNumbers();
    return;
  }

  if (e.shiftKey) {
    const lineStart = val.lastIndexOf("\n", start - 1) + 1;
    const beforeCursor = val.substring(lineStart, start);
    if (beforeCursor.endsWith("  ")) {
      sqlEditor.value = val.substring(0, start - 2) + val.substring(start);
      sqlEditor.setSelectionRange(start - 2, start - 2);
    } else if (beforeCursor.endsWith(" ") || beforeCursor.endsWith("\t")) {
      sqlEditor.value = val.substring(0, start - 1) + val.substring(start);
      sqlEditor.setSelectionRange(start - 1, start - 1);
    }
  } else {
    sqlEditor.value = val.substring(0, start) + "  " + val.substring(end);
    sqlEditor.setSelectionRange(start + 2, start + 2);
  }
  updateLineNumbers();
}

function handleSmartEnter(e) {
  e.preventDefault();
  const start = sqlEditor.selectionStart;
  const end = sqlEditor.selectionEnd;
  const val = sqlEditor.value;

  const lineStart = val.lastIndexOf("\n", start - 1) + 1;
  const currentLine = val.substring(lineStart, start);
  const matchIndent = currentLine.match(/^(\s*)/);
  let indent = matchIndent ? matchIndent[1] : "";

  if (currentLine.trimEnd().endsWith("(")) {
    indent += "  ";
  }

  const insertText = "\n" + indent;
  sqlEditor.value = val.substring(0, start) + insertText + val.substring(end);
  const newPos = start + insertText.length;
  sqlEditor.setSelectionRange(newPos, newPos);
  updateLineNumbers();
}

const PAIR_MAP = {
  "(": ")",
  "[": "]",
  "{": "}",
  "'": "'",
  '"': '"',
  "`": "`"
};
const CLOSING_CHARS = [")", "]", "}", "'", '"', "`"];

function handleAutoClosePair(e) {
  const key = e.key;
  const start = sqlEditor.selectionStart;
  const end = sqlEditor.selectionEnd;
  const val = sqlEditor.value;

  // 1. Text is selected -> Auto-surround selection
  if (start !== end && PAIR_MAP[key]) {
    e.preventDefault();
    const selected = val.substring(start, end);
    const closing = PAIR_MAP[key];
    sqlEditor.value = val.substring(0, start) + key + selected + closing + val.substring(end);
    sqlEditor.setSelectionRange(start + 1, end + 1);
    updateLineNumbers();
    return true;
  }

  // 2. User types closing character and it's already right after cursor -> Step over
  if (start === end && CLOSING_CHARS.includes(key)) {
    if (val[start] === key) {
      e.preventDefault();
      sqlEditor.setSelectionRange(start + 1, start + 1);
      updateCursorPosition();
      return true;
    }
  }

  // 3. User types opening pair -> Insert both and place cursor in middle
  if (start === end && PAIR_MAP[key]) {
    if ((key === "'" || key === '"') && start > 0 && /[a-zA-Z0-9_]/.test(val[start - 1])) {
      return false;
    }
    if (start < val.length && /[a-zA-Z0-9_]/.test(val[start])) {
      return false;
    }

    e.preventDefault();
    const closing = PAIR_MAP[key];
    sqlEditor.value = val.substring(0, start) + key + closing + val.substring(end);
    sqlEditor.setSelectionRange(start + 1, start + 1);
    updateLineNumbers();
    return true;
  }

  // 4. Backspace between empty pair -> Delete both
  if (key === "Backspace" && start === end && start > 0 && start < val.length) {
    const prevChar = val[start - 1];
    const nextChar = val[start];
    if (PAIR_MAP[prevChar] === nextChar) {
      e.preventDefault();
      sqlEditor.value = val.substring(0, start - 1) + val.substring(start + 1);
      sqlEditor.setSelectionRange(start - 1, start - 1);
      updateLineNumbers();
      return true;
    }
  }

  return false;
}

function handleSelectWordOrNext(e) {
  e.preventDefault();
  const start = sqlEditor.selectionStart;
  const end = sqlEditor.selectionEnd;
  const val = sqlEditor.value;

  if (start === end) {
    let left = start;
    while (left > 0 && /[a-zA-Z0-9_]/.test(val[left - 1])) {
      left--;
    }
    let right = start;
    while (right < val.length && /[a-zA-Z0-9_]/.test(val[right])) {
      right++;
    }
    if (left < right) {
      sqlEditor.setSelectionRange(left, right);
      updateCursorPosition();
    }
  } else {
    const selected = val.substring(start, end);
    let nextPos = val.indexOf(selected, end);
    if (nextPos === -1) {
      nextPos = val.indexOf(selected, 0);
    }
    if (nextPos !== -1) {
      sqlEditor.setSelectionRange(nextPos, nextPos + selected.length);
      updateCursorPosition();
    }
  }
}

function formatSqlCode() {
  const raw = sqlEditor.value.trim();
  if (!raw) return;

  const KEYWORDS = [
    "SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET",
    "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN", "CROSS JOIN", "JOIN", "ON",
    "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM",
    "CREATE TABLE", "DROP TABLE", "ALTER TABLE", "ADD COLUMN",
    "PRIMARY KEY", "FOREIGN KEY", "REFERENCES", "NOT NULL", "UNIQUE", "DEFAULT", "CHECK", "AUTOINCREMENT",
    "AND", "OR", "NOT", "IN", "BETWEEN", "LIKE", "IS NULL", "IS NOT NULL", "EXISTS",
    "AS", "DISTINCT", "UNION ALL", "UNION", "INTERSECT", "EXCEPT",
    "COUNT", "SUM", "AVG", "MIN", "MAX",
    "CASE", "WHEN", "THEN", "ELSE", "END",
    "ASC", "DESC"
  ];

  KEYWORDS.sort((a, b) => b.length - a.length);

  const tokens = raw.split(/('(?:''|[^'])*')/g);
  for (let i = 0; i < tokens.length; i++) {
    if (!tokens[i].startsWith("'")) {
      KEYWORDS.forEach(kw => {
        const regex = new RegExp(`\\b${kw.replace(/\s+/g, "\\s+")}\\b`, "gi");
        tokens[i] = tokens[i].replace(regex, kw);
      });
    }
  }

  sqlEditor.value = tokens.join("");
  updateLineNumbers();
}

// SQL Editor Keydown Handling (VS Code Shortcuts)
sqlEditor.addEventListener("keydown", (e) => {
  // 1. Ctrl + Enter / Cmd + Enter -> Run SQL
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    hideAutocomplete();
    executeSql();
    return;
  }

  // 2. Ctrl + / or Cmd + / -> Toggle Line Comment (--)
  if ((e.ctrlKey || e.metaKey) && (e.key === "/" || e.code === "Slash")) {
    e.preventDefault();
    hideAutocomplete();
    toggleLineComment();
    return;
  }

  // 3. Shift + Alt + A or Ctrl + Shift + / -> Toggle Block Comment (/* ... */)
  if (((e.shiftKey && e.altKey && (e.key === "A" || e.key === "a" || e.code === "KeyA")) ||
       ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "?" || e.key === "/" || e.code === "Slash")))) {
    e.preventDefault();
    hideAutocomplete();
    toggleBlockComment();
    return;
  }

  // 4. Ctrl + Shift + K -> Delete Line
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "K" || e.key === "k" || e.code === "KeyK")) {
    e.preventDefault();
    hideAutocomplete();
    deleteLine();
    return;
  }

  // 5. Shift + Alt + ArrowDown / ArrowUp -> Duplicate Line Down / Up
  if (e.shiftKey && e.altKey && (e.key === "ArrowDown" || e.code === "ArrowDown")) {
    e.preventDefault();
    hideAutocomplete();
    duplicateLine(1);
    return;
  }
  if (e.shiftKey && e.altKey && (e.key === "ArrowUp" || e.code === "ArrowUp")) {
    e.preventDefault();
    hideAutocomplete();
    duplicateLine(-1);
    return;
  }

  // 6. Alt + ArrowDown / ArrowUp -> Move Line Down / Up
  if (e.altKey && !e.shiftKey && (e.key === "ArrowDown" || e.code === "ArrowDown")) {
    e.preventDefault();
    hideAutocomplete();
    moveLine(1);
    return;
  }
  if (e.altKey && !e.shiftKey && (e.key === "ArrowUp" || e.code === "ArrowUp")) {
    e.preventDefault();
    hideAutocomplete();
    moveLine(-1);
    return;
  }

  // 7. Ctrl + D -> Select Word or Next Occurrence
  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && (e.key === "d" || e.key === "D" || e.code === "KeyD")) {
    e.preventDefault();
    handleSelectWordOrNext(e);
    return;
  }

  // 8. Ctrl + Space -> Manual trigger Autocomplete
  if ((e.ctrlKey || e.metaKey) && e.key === " ") {
    e.preventDefault();
    triggerAutocomplete(true);
    return;
  }

  // 9. Autocomplete Navigation (when popup is open)
  if (!acPopup.classList.contains("hidden")) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      moveAcSelection(1);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      moveAcSelection(-1);
      return;
    }
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      applyAcSelection();
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      hideAutocomplete();
      return;
    }
  }

  // 10. Tab / Shift + Tab -> Indent / Outdent
  if (e.key === "Tab") {
    handleTab(e);
    return;
  }

  // 11. Enter -> Smart Indent Continuation
  if (e.key === "Enter" && !e.ctrlKey && !e.metaKey && !e.altKey) {
    handleSmartEnter(e);
    return;
  }

  // 12. Auto-close pairs & Auto-surround selection
  if (handleAutoClosePair(e)) {
    return;
  }
});

sqlEditor.addEventListener("input", (e) => {
  updateLineNumbers();
  if (e.data === " " || e.data === "\n" || e.data === ";") {
    hideAutocomplete();
  } else {
    triggerAutocomplete(false);
  }
});

sqlEditor.addEventListener("scroll", () => {
  if (editorGutter) {
    editorGutter.scrollTop = sqlEditor.scrollTop;
  }
  updateAcPosition();
});

sqlEditor.addEventListener("click", () => {
  hideAutocomplete();
  updateCursorPosition();
});

sqlEditor.addEventListener("keyup", (e) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"].includes(e.key)) {
    updateCursorPosition();
  }
});

sqlEditor.addEventListener("select", () => {
  updateCursorPosition();
});

if (editorGutter) {
  editorGutter.addEventListener("click", (e) => {
    const lineEl = e.target.closest(".line-num");
    if (!lineEl) return;
    const lineNum = parseInt(lineEl.textContent, 10);
    if (isNaN(lineNum)) return;

    const lines = sqlEditor.value.split("\n");
    let charIdx = 0;
    for (let i = 0; i < lineNum - 1; i++) {
      charIdx += lines[i].length + 1;
    }
    const endIdx = charIdx + (lines[lineNum - 1] ? lines[lineNum - 1].length : 0);
    sqlEditor.focus();
    sqlEditor.setSelectionRange(charIdx, endIdx);
    updateCursorPosition();
  });
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".editor-wrapper")) {
    hideAutocomplete();
  }
});

// =============================================================================
// Responsive Mobile View & Drawer Logic
// =============================================================================
function initResponsiveMobile() {
  const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const mTabTheory = document.getElementById("m-tab-theory");
  const mTabStudio = document.getElementById("m-tab-studio");
  const splitContent = document.getElementById("split-content");

  if (btnToggleSidebar && sidebar && sidebarOverlay) {
    btnToggleSidebar.addEventListener("click", () => {
      const isOpen = sidebar.classList.toggle("open");
      sidebarOverlay.classList.toggle("active", isOpen);
    });

    sidebarOverlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
      sidebarOverlay.classList.remove("active");
    });
  }

  if (mTabTheory && mTabStudio && splitContent) {
    mTabTheory.addEventListener("click", () => {
      mTabTheory.classList.add("active");
      mTabStudio.classList.remove("active");
      splitContent.classList.remove("view-studio");
      splitContent.classList.add("view-theory");
    });

    mTabStudio.addEventListener("click", () => {
      mTabStudio.classList.add("active");
      mTabTheory.classList.remove("active");
      splitContent.classList.remove("view-theory");
      splitContent.classList.add("view-studio");

      setTimeout(() => {
        if (typeof updateLineNumbers === "function") updateLineNumbers();
        if (typeof updateCursorPosition === "function") updateCursorPosition();
      }, 50);
    });
  }
}

// =============================================================================
// Resizable Panels Engine (Mouse + Touch, Double-click reset, localStorage)
// =============================================================================
function initResizablePanels() {
  const sidebar = document.getElementById("sidebar");
  const resizerSidebar = document.getElementById("resizer-sidebar");

  const theoryPanel = document.getElementById("theory-panel");
  const resizerTheory = document.getElementById("resizer-theory");
  const studioPanel = document.getElementById("studio-panel");

  const editorWrapper = document.getElementById("editor-wrapper") || document.querySelector(".editor-wrapper");
  const resizerEditor = document.getElementById("resizer-editor");

  // Restore saved layout dimensions from localStorage
  try {
    const savedSidebarWidth = localStorage.getItem("sqllab_sidebar_width");
    if (savedSidebarWidth && sidebar && window.innerWidth >= 1024) {
      const w = parseInt(savedSidebarWidth, 10);
      if (w >= 220 && w <= 600) {
        sidebar.style.width = `${w}px`;
        sidebar.style.minWidth = `${w}px`;
      }
    }

    const savedTheoryWidth = localStorage.getItem("sqllab_theory_width");
    if (savedTheoryWidth && theoryPanel && window.innerWidth >= 900) {
      const w = parseInt(savedTheoryWidth, 10);
      if (w >= 260 && w <= 900) {
        theoryPanel.style.width = `${w}px`;
        theoryPanel.style.minWidth = `${w}px`;
      }
    }

    const savedEditorHeight = localStorage.getItem("sqllab_editor_height");
    if (savedEditorHeight && editorWrapper) {
      const h = parseInt(savedEditorHeight, 10);
      if (h >= 120 && h <= 1200) {
        editorWrapper.style.height = `${h}px`;
        editorWrapper.style.flex = "none";
      }
    }
  } catch (e) {}

  function attachResizer({
    resizer,
    target,
    isVertical,
    getMin,
    getMax,
    storageKey,
    defaultSize,
    onResize
  }) {
    if (!resizer || !target) return;

    let isDragging = false;
    let startPos = 0;
    let startSize = 0;

    function startDrag(clientX, clientY) {
      if (!isVertical && window.innerWidth < 900) return;
      isDragging = true;
      document.body.classList.add(isVertical ? "resizing-vertical" : "resizing-horizontal");
      resizer.classList.add("active");

      startPos = isVertical ? clientY : clientX;
      startSize = isVertical ? target.offsetHeight : target.offsetWidth;

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onEnd);
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onEnd);
    }

    function doResize(currentPos) {
      if (!isDragging) return;
      const delta = currentPos - startPos;
      let newSize = startSize + delta;

      const min = typeof getMin === "function" ? getMin() : getMin;
      const max = typeof getMax === "function" ? getMax() : getMax;

      if (newSize < min) newSize = min;
      if (newSize > max) newSize = max;

      if (isVertical) {
        target.style.height = `${newSize}px`;
        target.style.flex = "none";
      } else {
        target.style.width = `${newSize}px`;
        target.style.minWidth = `${newSize}px`;
        target.style.maxWidth = `${newSize}px`;
      }

      if (onResize) onResize(newSize);
    }

    function onMove(e) {
      doResize(isVertical ? e.clientY : e.clientX);
    }

    function onTouchMove(e) {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();
      if (e.touches && e.touches[0]) {
        doResize(isVertical ? e.touches[0].clientY : e.touches[0].clientX);
      }
    }

    function onEnd() {
      if (!isDragging) return;
      isDragging = false;
      document.body.classList.remove("resizing-vertical", "resizing-horizontal");
      resizer.classList.remove("active");

      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);

      const finalSize = isVertical ? target.offsetHeight : target.offsetWidth;
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, String(finalSize));
        } catch (e) {}
      }
    }

    resizer.addEventListener("mousedown", (e) => {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    });

    resizer.addEventListener("touchstart", (e) => {
      if (e.touches && e.touches[0]) {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    // Double-click resets to default size
    resizer.addEventListener("dblclick", () => {
      if (isVertical) {
        target.style.height = `${defaultSize}px`;
        target.style.flex = "";
      } else {
        target.style.width = `${defaultSize}px`;
        target.style.minWidth = `${defaultSize}px`;
        target.style.maxWidth = `${defaultSize}px`;
      }
      if (storageKey) {
        try {
          localStorage.removeItem(storageKey);
        } catch (e) {}
      }
      if (onResize) onResize(defaultSize);
    });
  }

  // 1. Sidebar Resizer
  attachResizer({
    resizer: resizerSidebar,
    target: sidebar,
    isVertical: false,
    getMin: 240,
    getMax: () => Math.min(520, window.innerWidth * 0.45),
    defaultSize: 320,
    storageKey: "sqllab_sidebar_width"
  });

  // 2. Theory Panel Resizer
  attachResizer({
    resizer: resizerTheory,
    target: theoryPanel,
    isVertical: false,
    getMin: 280,
    getMax: () => {
      const ws = document.getElementById("workspace");
      const wsWidth = ws ? ws.clientWidth : window.innerWidth - 320;
      return Math.max(300, wsWidth - 360);
    },
    defaultSize: 420,
    storageKey: "sqllab_theory_width",
    onResize: () => {
      if (typeof updateAcPosition === "function") updateAcPosition();
    }
  });

  // 3. Editor Wrapper Resizer (Vertical)
  attachResizer({
    resizer: resizerEditor,
    target: editorWrapper,
    isVertical: true,
    getMin: 120,
    getMax: () => {
      const sp = studioPanel || document.getElementById("studio-panel");
      const spHeight = sp ? sp.clientHeight : 600;
      return Math.max(140, spHeight - 120);
    },
    defaultSize: 280,
    storageKey: "sqllab_editor_height",
    onResize: () => {
      if (typeof updateLineNumbers === "function") updateLineNumbers();
      if (typeof updateAcPosition === "function") updateAcPosition();
    }
  });

  // On window resize: handle responsive constraints gracefully
  window.addEventListener("resize", () => {
    if (window.innerWidth < 1024) {
      if (sidebar) {
        sidebar.style.width = "";
        sidebar.style.minWidth = "";
      }
    } else {
      const savedSidebarWidth = localStorage.getItem("sqllab_sidebar_width") || 320;
      if (sidebar) {
        sidebar.style.width = `${savedSidebarWidth}px`;
        sidebar.style.minWidth = `${savedSidebarWidth}px`;
        sidebar.classList.remove("open");
      }
      const overlay = document.getElementById("sidebar-overlay");
      if (overlay) overlay.classList.remove("active");
    }

    if (window.innerWidth < 900) {
      if (theoryPanel) {
        theoryPanel.style.width = "";
        theoryPanel.style.minWidth = "";
      }
    } else {
      const savedTheoryWidth = localStorage.getItem("sqllab_theory_width") || 420;
      if (theoryPanel) {
        theoryPanel.style.width = `${savedTheoryWidth}px`;
        theoryPanel.style.minWidth = `${savedTheoryWidth}px`;
      }
    }
    if (typeof updateAcPosition === "function") updateAcPosition();
  });
}

// Start App
renderBeginnerModules();
renderCurriculum();
loadExercise(0, 0, true);
updateLineNumbers();
initResponsiveMobile();
initResizablePanels();
initDatabaseEngine();
