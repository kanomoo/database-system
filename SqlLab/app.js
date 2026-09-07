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

// =============================================================================
// Initialize SQLite WASM Engine
// =============================================================================
async function initDatabaseEngine() {
  engineStatusText.textContent = "กำลังโหลด SQLite WASM...";
  try {
    const config = {
      locateFile: (file) => `vendor/${file}`
    };
    
    if (typeof initSqlJs === "undefined") {
      throw new Error("ไม่พบไลบรารี initSqlJs");
    }

    SQL = await initSqlJs(config);
    db = new SQL.Database();
    engineStatusText.textContent = "SQLite WASM พร้อมใช้งาน (In-Memory)";
    
    updateSchemaSidebar();
    // Default to Beginner 101 exercise 0
    loadExercise(0, 0, true);
  } catch (err) {
    console.warn("Local WASM failed, trying CDN fallback...", err);
    try {
      const cdnConfig = {
        locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
      };
      SQL = await initSqlJs(cdnConfig);
      db = new SQL.Database();
      engineStatusText.textContent = "SQLite CDN พร้อมใช้งาน";
      updateSchemaSidebar();
      loadExercise(0, 0, true);
    } catch (fallbackErr) {
      console.error("Critical: Cannot initialize SQLite engine", fallbackErr);
      engineStatusText.textContent = "โหลดฐานข้อมูลไม่สำเร็จ";
      resultContainer.innerHTML = `
        <div class="error-banner">
          <strong>❌ ไม่สามารถเริ่มการทำงานของ SQLite WASM Engine ได้:</strong><br/>
          ${fallbackErr.message}<br/><br/>
          <em>ข้อแนะนำ: หากเปิดไฟล์ผ่าน file:// โดยตรง เบราว์เซอร์อาจบล็อกการโหลด WASM กรุณาเปิดผ่าน Local Web Server หรือรันคำสั่ง <code>python3 -m http.server</code></em>
        </div>
      `;
    }
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

  // Load default SQL into editor
  sqlEditor.value = currentEx.defaultSql || "";

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
    alert("ระบบฐานข้อมูลยังไม่พร้อมใช้งาน กรุณารอสักครู่");
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
});

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
  mirrorDiv.style.whiteSpace = "pre-wrap";
  mirrorDiv.style.wordWrap = "break-word";

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

  let top = coords.top - sqlEditor.scrollTop + editorHeaderHeight + coords.height + 4;
  let left = coords.left - sqlEditor.scrollLeft + 16;

  const maxLeft = sqlEditor.clientWidth - 330;
  if (left > maxLeft) left = Math.max(16, maxLeft);
  if (left < 16) left = 16;

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
}

function hideAutocomplete() {
  if (acPopup) {
    acPopup.classList.add("hidden");
  }
}

// SQL Editor Keydown Handling
sqlEditor.addEventListener("keydown", (e) => {
  // 1. Ctrl + Enter / Cmd + Enter -> Run SQL
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    hideAutocomplete();
    executeSql();
    return;
  }

  // 2. Ctrl + Space -> Manual trigger Autocomplete
  if ((e.ctrlKey || e.metaKey) && e.key === " ") {
    e.preventDefault();
    triggerAutocomplete(true);
    return;
  }

  // 3. Autocomplete Navigation
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
});

sqlEditor.addEventListener("input", (e) => {
  if (e.data === " " || e.data === "\n" || e.data === ";") {
    hideAutocomplete();
  } else {
    triggerAutocomplete(false);
  }
});

sqlEditor.addEventListener("click", hideAutocomplete);
sqlEditor.addEventListener("scroll", updateAcPosition);
document.addEventListener("click", (e) => {
  if (!e.target.closest(".editor-wrapper")) {
    hideAutocomplete();
  }
});

// Start App
renderBeginnerModules();
renderCurriculum();
initDatabaseEngine();
