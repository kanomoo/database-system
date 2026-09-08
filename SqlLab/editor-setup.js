/**
 * SQL Lab Studio - VS Code / Antigravity Style Monaco Editor Integration
 * Features:
 * - Real-time syntax highlighting with VS Code Dark+ / Antigravity theme
 * - Instant IntelliSense Autocomplete triggering on single letter keystrokes
 * - Rich Hover Tooltips with syntax definitions, Thai explanations, and code examples
 * - Dynamic table schema preview on hovering over database tables
 * - Exact Error Diagnostics / Markers (red squiggly lines) on syntax & runtime errors
 * - Native VS Code keybindings (Ctrl+Enter, Alt+Up/Down, Ctrl+/, Find/Replace, Multi-cursor)
 */

(function () {
  let monacoEditor = null;
  let monacoInstance = null;
  let getDatabaseInstance = null;
  let currentErrorMarkers = [];

  // ===========================================================================
  // Comprehensive SQL Knowledge Base (Keywords, Types, Functions, Hover Docs)
  // ===========================================================================

  const SQL_KEYWORDS = [
    { label: "SELECT", desc: "เลือกคอลัมน์ที่ต้องการดูข้อมูล", syntax: "SELECT [DISTINCT] column1, column2 FROM table;", example: "SELECT ID, Name, GPA FROM Students WHERE GPA >= 3.0;" },
    { label: "FROM", desc: "ระบุตารางต้นทางของข้อมูล", syntax: "FROM table_name", example: "SELECT * FROM Students;" },
    { label: "WHERE", desc: "กรองเงื่อนไขของแถวข้อมูล (Filter)", syntax: "WHERE condition", example: "SELECT * FROM Students WHERE Age > 20 AND Major = 'CS';" },
    { label: "INSERT INTO", insertText: "INSERT INTO ${1:table} (${2:columns}) VALUES (${3:values});", isSnippet: true, desc: "เพิ่ม/หยอดข้อมูลแถวใหม่เข้าตาราง", syntax: "INSERT INTO table (col1, col2) VALUES (val1, val2);", example: "INSERT INTO Students (ID, Name, Age) VALUES (1, 'Few', 20);" },
    { label: "VALUES", desc: "ชุดข้อมูลที่จะแทรกลงในตาราง", syntax: "VALUES (v1, v2), (v3, v4);", example: "VALUES (1, 'John', 22), (2, 'Jane', 21);" },
    { label: "UPDATE", insertText: "UPDATE ${1:table} SET ${2:col} = ${3:val} WHERE ${4:condition};", isSnippet: true, desc: "แก้ไขข้อมูลแถวที่มีอยู่ตามเงื่อนไข", syntax: "UPDATE table SET col = val WHERE condition;", example: "UPDATE Students SET Age = 22 WHERE ID = 1;" },
    { label: "SET", desc: "กำหนดค่าใหม่ให้คอลัมน์ในการ UPDATE", syntax: "SET col1 = val1, col2 = val2", example: "UPDATE Students SET GPA = 3.8 WHERE ID = 1;" },
    { label: "DELETE FROM", insertText: "DELETE FROM ${1:table} WHERE ${2:condition};", isSnippet: true, desc: "ลบแถวข้อมูลตามเงื่อนไข (ระวัง: หากไม่มี WHERE จะลบทุกแถว)", syntax: "DELETE FROM table WHERE condition;", example: "DELETE FROM Students WHERE ID = 3;" },
    { label: "CREATE TABLE", insertText: "CREATE TABLE ${1:table_name} (\n    ${2:ID} INT PRIMARY KEY,\n    ${3:Name} VARCHAR(50)\n);", isSnippet: true, desc: "สร้างตารางใหม่พร้อมกำหนดคอลัมน์และ Data Types", syntax: "CREATE TABLE table_name (\n  col1 type [constraints],\n  col2 type\n);", example: "CREATE TABLE Students (\n  ID INT PRIMARY KEY,\n  Name VARCHAR(50),\n  Age INT\n);" },
    { label: "DROP TABLE IF EXISTS", insertText: "DROP TABLE IF EXISTS ${1:table_name};", isSnippet: true, desc: "ลบตารางทิ้งถ้ามีอยู่แล้ว เพื่อป้องกัน Error สร้างตารางซ้ำ", syntax: "DROP TABLE IF EXISTS table_name;", example: "DROP TABLE IF EXISTS Students;" },
    { label: "ALTER TABLE", insertText: "ALTER TABLE ${1:table_name} ADD COLUMN ${2:new_col} ${3:type};", isSnippet: true, desc: "แก้ไขโครงสร้างตารางเดิม เช่น เพิ่มคอลัมน์", syntax: "ALTER TABLE table_name ADD COLUMN col_name type;", example: "ALTER TABLE Students ADD COLUMN Email VARCHAR(100);" },
    { label: "ADD COLUMN", desc: "เพิ่มคอลัมน์ใหม่เข้าในตาราง", syntax: "ADD COLUMN col_name data_type", example: "ALTER TABLE Students ADD COLUMN Grade VARCHAR(2);" },
    { label: "DROP COLUMN", desc: "ลบคอลัมน์ออกจากตาราง", syntax: "DROP COLUMN col_name", example: "ALTER TABLE Students DROP COLUMN TempData;" },
    { label: "ORDER BY", insertText: "ORDER BY ${1:column} ${2|ASC,DESC|}", isSnippet: true, desc: "จัดเรียงลำดับผลลัพธ์ข้อมูล", syntax: "ORDER BY column [ASC | DESC]", example: "SELECT * FROM Students ORDER BY GPA DESC;" },
    { label: "GROUP BY", insertText: "GROUP BY ${1:column}", isSnippet: true, desc: "จัดกลุ่มแถวข้อมูล มักใช้ร่วมกับ COUNT, SUM, AVG", syntax: "GROUP BY col1, col2", example: "SELECT Major, COUNT(*) FROM Students GROUP BY Major;" },
    { label: "HAVING", desc: "กรองเงื่อนไขผลลัพธ์หลังจากการ GROUP BY", syntax: "HAVING aggregate_condition", example: "SELECT Major, AVG(GPA) FROM Students GROUP BY Major HAVING AVG(GPA) > 3.0;" },
    { label: "INNER JOIN", insertText: "INNER JOIN ${1:table2} ON ${2:table1.id} = ${3:table2.id}", isSnippet: true, desc: "เชื่อมตารางแบบนำเฉพาะแถวที่มีค่าตรงกันทั้งสองฝั่งมาแสดง", syntax: "INNER JOIN table2 ON table1.id = table2.id", example: "SELECT s.Name, d.DeptName FROM Students s INNER JOIN Depts d ON s.DeptID = d.ID;" },
    { label: "LEFT JOIN", insertText: "LEFT JOIN ${1:table2} ON ${2:table1.id} = ${3:table2.id}", isSnippet: true, desc: "เชื่อมตารางโดยเก็บข้อมูลตารางซ้ายไว้ครบทุกแถว", syntax: "LEFT JOIN table2 ON table1.id = table2.id", example: "SELECT s.Name, e.Score FROM Students s LEFT JOIN Exams e ON s.ID = e.StudentID;" },
    { label: "RIGHT JOIN", desc: "เชื่อมตารางโดยเก็บข้อมูลตารางขวาไว้ครบทุกแถว", syntax: "RIGHT JOIN table2 ON table1.id = table2.id", example: "SELECT * FROM Orders RIGHT JOIN Customers ON Orders.CustID = Customers.ID;" },
    { label: "FULL JOIN", desc: "เชื่อมตารางโดยเก็บข้อมูลของทั้งสองฝั่งไว้ทั้งหมด", syntax: "FULL OUTER JOIN table2 ON condition", example: "SELECT * FROM A FULL OUTER JOIN B ON A.id = B.id;" },
    { label: "CROSS JOIN", desc: "จับคู่แถวแบบคูณคาร์ทีเซียน ทุกแถวของตารางแรกกับตารางสอง", syntax: "CROSS JOIN table2", example: "SELECT * FROM Colors CROSS JOIN Sizes;" },
    { label: "ON", desc: "เงื่อนไขความสัมพันธ์ที่ใช้ในการเชื่อมตาราง (JOIN)", syntax: "ON table1.key = table2.key", example: "ON Students.DeptID = Departments.ID" },
    { label: "AS", desc: "ตั้งชื่อเล่น (Alias) ชั่วคราวให้คอลัมน์หรือตาราง", syntax: "expression AS alias_name", example: "SELECT Name AS Student_Name, GPA * 25 AS Percentage FROM Students;" },
    { label: "DISTINCT", desc: "ตัดแถวข้อมูลที่มีค่าซ้ำกันออก ให้แสดงเฉพาะค่าที่ไม่ซ้ำ", syntax: "SELECT DISTINCT column FROM table;", example: "SELECT DISTINCT Major FROM Students;" },
    { label: "LIMIT", insertText: "LIMIT ${1:10}", isSnippet: true, desc: "จำกัดจำนวนแถวผลลัพธ์ที่จะแสดง", syntax: "LIMIT count [OFFSET n]", example: "SELECT * FROM Students ORDER BY GPA DESC LIMIT 5;" },
    { label: "OFFSET", desc: "ข้ามผลลัพธ์ n แถวแรก (มักใช้ทำแบ่งหน้า Pagination)", syntax: "OFFSET n", example: "SELECT * FROM Students LIMIT 10 OFFSET 20;" },
    { label: "LIKE", desc: "ค้นหาข้อความบางส่วนด้วย Wildcard (% = ข้อความใดๆ, _ = 1 ตัวอักษร)", syntax: "column LIKE 'pattern'", example: "SELECT * FROM Students WHERE Name LIKE 'Phongs%';" },
    { label: "IN", desc: "ตรวจสอบว่าค่าตรงกับตัวใดตัวหนึ่งในชุดข้อมูลหรือไม่", syntax: "column IN (val1, val2, ...)", example: "SELECT * FROM Students WHERE Major IN ('CS', 'IT', 'SE');" },
    { label: "BETWEEN", desc: "ตรวจสอบว่าค่าอยู่ในช่วงที่กำหนด (รวมหัวและท้าย)", syntax: "column BETWEEN val1 AND val2", example: "SELECT * FROM Students WHERE Age BETWEEN 18 AND 22;" },
    { label: "IS NULL", desc: "ตรวจสอบว่าคอลัมน์มีค่าเป็นค่าว่างเปล่า (NULL)", syntax: "column IS NULL", example: "SELECT * FROM Students WHERE GPA IS NULL;" },
    { label: "IS NOT NULL", desc: "ตรวจสอบว่าคอลัมน์มีข้อมูล (ไม่ใช่ค่าว่าง)", syntax: "column IS NOT NULL", example: "SELECT * FROM Students WHERE GPA IS NOT NULL;" },
    { label: "AND", desc: "ตัวดำเนินการตรรกะ 'และ' (ต้องจริงทั้งคู่)", syntax: "cond1 AND cond2", example: "WHERE Age >= 20 AND GPA >= 3.0" },
    { label: "OR", desc: "ตัวดำเนินการตรรกะ 'หรือ' (จริงอย่างใดอย่างหนึ่ง)", syntax: "cond1 OR cond2", example: "WHERE Major = 'CS' OR Major = 'IT'" },
    { label: "NOT", desc: "ตัวดำเนินการตรรกะ 'ไม่ใช่' (กลับค่าความจริง)", syntax: "NOT condition", example: "WHERE NOT (Age < 18)" },
    { label: "UNION", desc: "รวมผลลัพธ์ 2 ตารางเข้าด้วยกัน (ตัดแถวซ้ำออกอัตโนมัติ)", syntax: "SELECT ... UNION SELECT ...", example: "SELECT Name FROM Students UNION SELECT Name FROM Teachers;" },
    { label: "UNION ALL", desc: "รวมผลลัพธ์ 2 ตารางเข้าด้วยกัน (เก็บแถวซ้ำไว้ทั้งหมด)", syntax: "SELECT ... UNION ALL SELECT ...", example: "SELECT ID FROM TableA UNION ALL SELECT ID FROM TableB;" },
    { label: "INTERSECT", desc: "หาผลลัพธ์ร่วมที่มีอยู่ในทั้งสองตาราง", syntax: "SELECT ... INTERSECT SELECT ...", example: "SELECT StudentID FROM MathClass INTERSECT SELECT StudentID FROM PhysicsClass;" },
    { label: "EXCEPT", desc: "หาแถวที่มีในตารางแรกแต่ไม่มีในตารางที่สอง", syntax: "SELECT ... EXCEPT SELECT ...", example: "SELECT ID FROM AllStudents EXCEPT SELECT ID FROM GraduatedStudents;" },
    { label: "PRIMARY KEY", desc: "กำหนดคีย์หลักของตาราง ห้ามซ้ำและห้ามว่าง (NOT NULL)", syntax: "column_name type PRIMARY KEY", example: "ID VARCHAR(20) PRIMARY KEY" },
    { label: "FOREIGN KEY", desc: "คีย์นอกที่อ้างอิงไปยังคีย์หลักของตารางแม่", syntax: "FOREIGN KEY (col) REFERENCES parent(id)", example: "FOREIGN KEY (DeptID) REFERENCES Departments(ID)" },
    { label: "REFERENCES", desc: "ระบุตารางแม่และคอลัมน์ที่ Foreign Key อ้างถึง", syntax: "REFERENCES parent_table(col)", example: "REFERENCES Students(ID)" },
    { label: "DEFAULT", desc: "กำหนดค่าปริยายเริ่มต้นเมื่อไม่มีการใส่ข้อมูล", syntax: "column type DEFAULT default_val", example: "Status VARCHAR(20) DEFAULT 'Active'" },
    { label: "CHECK", desc: "กำหนดเงื่อนไขตรวจสอบความถูกต้องของข้อมูล", syntax: "CHECK (condition)", example: "Age INT CHECK (Age >= 0 AND Age <= 120)" },
    { label: "UNIQUE", desc: "กำหนดให้ค่าในคอลัมน์ห้ามซ้ำกัน", syntax: "UNIQUE(column_name)", example: "Email VARCHAR(100) UNIQUE" },
    { label: "AUTOINCREMENT", desc: "กำหนดให้ตัวเลข ID เพิ่มขึ้นทีละ 1 อัตโนมัติ (เฉพาะ SQLite)", syntax: "INTEGER PRIMARY KEY AUTOINCREMENT", example: "ID INTEGER PRIMARY KEY AUTOINCREMENT" },
    { label: "DESC", desc: "จัดเรียงจากมากไปน้อย (Descending)", syntax: "ORDER BY col DESC", example: "ORDER BY Age DESC" },
    { label: "ASC", desc: "จัดเรียงจากน้อยไปมาก (Ascending - ค่าปริยาย)", syntax: "ORDER BY col ASC", example: "ORDER BY Age ASC" },
    { label: "CASE", desc: "คำสั่งเงื่อนไข If-Else ในภาษา SQL", syntax: "CASE WHEN cond THEN val ELSE default END", example: "CASE WHEN GPA >= 3.5 THEN 'Honor' ELSE 'Regular' END" },
    { label: "WHEN", desc: "ระบุเงื่อนไขในคำสั่ง CASE", syntax: "WHEN condition THEN result", example: "WHEN Age >= 18 THEN 'Adult'" },
    { label: "THEN", desc: "ระบุผลลัพธ์เมื่อเงื่อนไข WHEN เป็นจริง", syntax: "THEN result_value", example: "THEN 'Pass'" },
    { label: "ELSE", desc: "ระบุผลลัพธ์กรณีไม่ตรงกับเงื่อนไขใดเลยใน CASE", syntax: "ELSE default_value", example: "ELSE 'Fail'" },
    { label: "END", desc: "ปิดท้ายคำสั่ง CASE", syntax: "END", example: "END AS ResultGrade" },
    { label: "CREATE VIEW", insertText: "CREATE VIEW ${1:view_name} AS\nSELECT ${2:*}\nFROM ${3:table};", isSnippet: true, desc: "สร้างตารางเสมือน (View) จากคำสั่ง SELECT", syntax: "CREATE VIEW view_name AS SELECT ...;", example: "CREATE VIEW TopStudents AS SELECT * FROM Students WHERE GPA >= 3.5;" }
  ];

  const SQL_TYPES = [
    { label: "INT", desc: "ตัวเลขจำนวนเต็ม (Integer) เช่น 1, 2, 100, -5" },
    { label: "INTEGER", desc: "ตัวเลขจำนวนเต็ม (Integer) เช่น 1, 2, 100, -5" },
    { label: "VARCHAR(50)", insertText: "VARCHAR(${1:50})", isSnippet: true, desc: "ข้อความความยาวแปรผัน สูงสุดไม่เกินจำนวนที่ระบุ เช่น VARCHAR(50)" },
    { label: "VARCHAR(100)", insertText: "VARCHAR(${1:100})", isSnippet: true, desc: "ข้อความความยาวแปรผัน สูงสุด 100 ตัวอักษร" },
    { label: "VARCHAR(255)", insertText: "VARCHAR(${1:255})", isSnippet: true, desc: "ข้อความความยาวแปรผัน สูงสุด 255 ตัวอักษร (มาตรฐาน)" },
    { label: "CHAR(10)", insertText: "CHAR(${1:10})", isSnippet: true, desc: "ข้อความความยาวคงที่ เช่น รหัสนักศึกษา หรือรหัสไปรษณีย์" },
    { label: "TEXT", desc: "ข้อความตัวอักษรความยาวไม่จำกัด" },
    { label: "DECIMAL(3,2)", insertText: "DECIMAL(${1:3}, ${2:2})", isSnippet: true, desc: "ตัวเลขทศนิยมความแม่นยำสูง (เช่น DECIMAL(3,2) สำหรับเกรดเฉลี่ย GPA 0.00-4.00)" },
    { label: "DECIMAL(10,2)", insertText: "DECIMAL(${1:10}, ${2:2})", isSnippet: true, desc: "ตัวเลขทศนิยมความแม่นยำสูงสำหรับเงินตรา 2 ตำแหน่ง" },
    { label: "REAL", desc: "ตัวเลขทศนิยมแบบ Floating point 8-byte" },
    { label: "FLOAT", desc: "ตัวเลขทศนิยมแบบ Floating point" },
    { label: "BOOLEAN", desc: "ค่าความจริง (ใน SQLite เก็บเป็น 0 หรือ 1)" },
    { label: "DATE", desc: "วันที่ในรูปแบบ YYYY-MM-DD เช่น '2026-09-08'" },
    { label: "DATETIME", desc: "วันที่และเวลาในรูปแบบ YYYY-MM-DD HH:MM:SS" },
    { label: "BLOB", desc: "ข้อมูลไบนารี เช่น ไฟล์รูปภาพหรือไฟล์เสียง" }
  ];

  const SQL_FUNCTIONS = [
    { label: "COUNT", insertText: "COUNT(${1:*})", desc: "นับจำนวนแถวข้อมูล โดย COUNT(*) จะนับทุกแถวรวมทั้งแถวที่เป็น NULL", syntax: "COUNT([DISTINCT] expression | *)", example: "SELECT COUNT(*) AS total_rows FROM Students;" },
    { label: "SUM", insertText: "SUM(${1:column})", desc: "คำนวณหาผลรวมของตัวเลขในคอลัมน์", syntax: "SUM(column)", example: "SELECT SUM(Salary) FROM Employees;" },
    { label: "AVG", insertText: "AVG(${1:column})", desc: "คำนวณหาค่าเฉลี่ยตัวเลขในคอลัมน์", syntax: "AVG(column)", example: "SELECT AVG(GPA) AS avg_gpa FROM Students;" },
    { label: "MIN", insertText: "MIN(${1:column})", desc: "หาค่าที่น้อยที่สุดในคอลัมน์", syntax: "MIN(column)", example: "SELECT MIN(Age) FROM Students;" },
    { label: "MAX", insertText: "MAX(${1:column})", desc: "หาค่าที่มากที่สุดในคอลัมน์", syntax: "MAX(column)", example: "SELECT MAX(GPA) FROM Students;" },
    { label: "ROUND", insertText: "ROUND(${1:val}, ${2:2})", desc: "ปัดเศษทศนิยมตามจำนวนตำแหน่งที่ระบุ", syntax: "ROUND(value, [decimals])", example: "SELECT ROUND(AVG(GPA), 2) FROM Students;" },
    { label: "UPPER", insertText: "UPPER(${1:text})", desc: "แปลงข้อความเป็นตัวพิมพ์ใหญ่ทั้งหมด", syntax: "UPPER(string)", example: "SELECT UPPER(Name) FROM Students;" },
    { label: "LOWER", insertText: "LOWER(${1:text})", desc: "แปลงข้อความเป็นตัวพิมพ์เล็กทั้งหมด", syntax: "LOWER(string)", example: "SELECT LOWER(Email) FROM Users;" },
    { label: "LENGTH", insertText: "LENGTH(${1:text})", desc: "คืนค่าจำนวนตัวอักษรของข้อความ", syntax: "LENGTH(string)", example: "SELECT Name, LENGTH(Name) FROM Students;" },
    { label: "SUBSTR", insertText: "SUBSTR(${1:text}, ${2:start}, ${3:length})", desc: "ตัดข้อความย่อยตั้งแต่ตำแหน่ง start เป็นความยาว length", syntax: "SUBSTR(string, start, [length])", example: "SELECT SUBSTR(ID, 1, 2) AS EntryYear FROM Students;" },
    { label: "TRIM", insertText: "TRIM(${1:text})", desc: "ตัดช่องว่างด้านหน้าและด้านหลังข้อความออก", syntax: "TRIM(string)", example: "SELECT TRIM('  hello  ');" },
    { label: "REPLACE", insertText: "REPLACE(${1:text}, '${2:from}', '${3:to}')", desc: "ค้นหาและแทนที่ข้อความย่อยในสตริง", syntax: "REPLACE(string, from_str, to_str)", example: "SELECT REPLACE(Name, 'Mr. ', '') FROM Students;" },
    { label: "COALESCE", insertText: "COALESCE(${1:val1}, ${2:val2})", desc: "คืนค่าแรกที่ไม่เป็น NULL ในชุดพารามิเตอร์", syntax: "COALESCE(val1, val2, ...)", example: "SELECT COALESCE(Phone, 'ไม่มีเบอร์โทร') FROM Students;" },
    { label: "IFNULL", insertText: "IFNULL(${1:val}, ${2:default_val})", desc: "ถ้าค่าเป็น NULL ให้แทนที่ด้วยค่าที่สอง", syntax: "IFNULL(expression, default_value)", example: "SELECT IFNULL(GPA, 0.0) FROM Students;" },
    { label: "STRFTIME", insertText: "STRFTIME('${1:%Y-%m-%d}', ${2:'now'})", desc: "จัดรูปแบบวันที่และเวลาใน SQLite", syntax: "STRFTIME(format, timestring)", example: "SELECT STRFTIME('%Y', 'now');" },
    { label: "DATE", insertText: "DATE('${1:now}')", desc: "คืนค่าวันที่ในรูปแบบ YYYY-MM-DD", syntax: "DATE(timestring)", example: "SELECT DATE('now');" },
    { label: "DATETIME", insertText: "DATETIME('${1:now}')", desc: "คืนค่าวันและเวลาในรูปแบบ YYYY-MM-DD HH:MM:SS", syntax: "DATETIME(timestring)", example: "SELECT DATETIME('now', 'localtime');" }
  ];

  const SQL_SNIPPETS = [
    { label: "sel", insertText: "SELECT * FROM ${1:Students};", desc: "คำสั่งดึงข้อมูลครบทุกคอลัมน์" },
    { label: "selw", insertText: "SELECT * FROM ${1:Students} WHERE ${2:Age > 20};", desc: "ดึงข้อมูลแบบมีเงื่อนไข WHERE" },
    { label: "ins", insertText: "INSERT INTO ${1:Students} (${2:ID, Name, Age}) VALUES\n(${3:1, 'Few', 20});", desc: "แทรกข้อมูลแถวใหม่เข้าตาราง" },
    { label: "upd", insertText: "UPDATE ${1:Students} SET ${2:Age = 22} WHERE ${3:ID = 1};", desc: "แก้ไขข้อมูลแถวตามเงื่อนไข" },
    { label: "del", insertText: "DELETE FROM ${1:Students} WHERE ${2:ID = 1};", desc: "ลบแถวข้อมูลตามเงื่อนไข" },
    { label: "tbl-safe", insertText: "DROP TABLE IF EXISTS ${1:Students};\n\nCREATE TABLE ${1:Students} (\n    ${2:ID} INT PRIMARY KEY,\n    ${3:Name} VARCHAR(50),\n    ${4:Age} INT\n);", desc: "แม่แบบสร้างตารางพร้อม DROP TABLE IF EXISTS เพื่อรันซ้ำได้ปลอดภัย" }
  ];

  // Map for fast Hover lookup
  const HOVER_DOCS_MAP = {};
  [...SQL_KEYWORDS, ...SQL_TYPES, ...SQL_FUNCTIONS].forEach(item => {
    HOVER_DOCS_MAP[item.label.toUpperCase()] = item;
  });

  // ===========================================================================
  // Helper: Query dynamic database tables and columns from SQLite
  // ===========================================================================

  function getDynamicSchema() {
    const items = [];
    if (!getDatabaseInstance) return items;
    const db = getDatabaseInstance();
    if (!db) return items;

    try {
      const res = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
      if (res && res.length > 0 && res[0].values) {
        res[0].values.forEach(([tableName]) => {
          items.push({
            name: tableName,
            type: "table",
            columns: []
          });

          try {
            const colRes = db.exec(`PRAGMA table_info("${tableName}");`);
            if (colRes && colRes.length > 0 && colRes[0].values) {
              const currentTable = items[items.length - 1];
              colRes[0].values.forEach(c => {
                currentTable.columns.push({
                  name: c[1],
                  type: c[2] || "TEXT",
                  pk: !!c[5]
                });
              });
            }
          } catch (e) {}
        });
      }
    } catch (e) {}

    return items;
  }

  // ===========================================================================
  // Monaco Custom Theme Definition (Antigravity IDE / VS Code Dark+ Aesthetic)
  // ===========================================================================

  function defineMonacoTheme(monaco) {
    monaco.editor.defineTheme("sqllab-antigravity", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "38bdf8", fontStyle: "bold" },
        { token: "keyword.sql", foreground: "38bdf8", fontStyle: "bold" },
        { token: "operator.sql", foreground: "94a3b8" },
        { token: "string.sql", foreground: "f472b6" },
        { token: "string", foreground: "f472b6" },
        { token: "number.sql", foreground: "a78bfa" },
        { token: "number", foreground: "a78bfa" },
        { token: "comment.sql", foreground: "64748b", fontStyle: "italic" },
        { token: "comment", foreground: "64748b", fontStyle: "italic" },
        { token: "type.sql", foreground: "34d399", fontStyle: "bold" },
        { token: "predefined.sql", foreground: "fbbf24", fontStyle: "bold" },
        { token: "delimiter.sql", foreground: "cbd5e1" }
      ],
      colors: {
        "editor.background": "#0b0f19",
        "editor.foreground": "#e2e8f0",
        "editorLineNumber.foreground": "#475569",
        "editorLineNumber.activeForeground": "#38bdf8",
        "editor.lineHighlightBackground": "#1e293b50",
        "editor.selectionBackground": "#0284c740",
        "editor.inactiveSelectionBackground": "#0284c725",
        "editorCursor.foreground": "#38bdf8",
        "editorSuggestWidget.background": "#0f172a",
        "editorSuggestWidget.border": "#1e293b",
        "editorSuggestWidget.foreground": "#e2e8f0",
        "editorSuggestWidget.selectedBackground": "#1e293b",
        "editorSuggestWidget.highlightForeground": "#38bdf8",
        "editorHoverWidget.background": "#0b0f19",
        "editorHoverWidget.border": "#334155",
        "editorHoverWidget.foreground": "#e2e8f0",
        "editorWidget.background": "#0f172a",
        "editorWidget.border": "#334155",
        "scrollbarSlider.background": "#33415540",
        "scrollbarSlider.hoverBackground": "#47556980",
        "scrollbarSlider.activeBackground": "#64748bb0"
      }
    });
  }

  // ===========================================================================
  // Register Monaco Language Providers (Autocomplete & Hover Tooltips)
  // ===========================================================================

  function registerLanguageProviders(monaco) {
    // 1. Completion Provider (Instant IntelliSense on single-letter keystroke)
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_.*".split("");
    monaco.languages.registerCompletionItemProvider("sql", {
      triggerCharacters: [" ", ".", "(", ",", ...alphabet],
      provideCompletionItems: function (model, position) {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };

        const suggestions = [];

        // Dynamic Tables & Columns (Highest Priority)
        const schema = getDynamicSchema();
        schema.forEach(tbl => {
          suggestions.push({
            label: tbl.name,
            kind: monaco.languages.CompletionItemKind.Class,
            insertText: tbl.name,
            detail: "🗄️ ตารางในระบบ",
            documentation: {
              value: `**ตาราง: \`${tbl.name}\`**\n\nจำนวนคอลัมน์: ${tbl.columns.length}\n\nคอลัมน์: ${tbl.columns.map(c => `\`${c.name}\` (${c.type})`).join(", ")}`
            },
            range: range,
            sortText: "00_" + tbl.name
          });

          tbl.columns.forEach(col => {
            suggestions.push({
              label: col.name,
              kind: monaco.languages.CompletionItemKind.Field,
              insertText: col.name,
              detail: `คอลัมน์ของตาราง ${tbl.name} (${col.type}${col.pk ? ", 🔑 PK" : ""})`,
              documentation: {
                value: `**คอลัมน์:** \`${col.name}\`\n\n- ตาราง: \`${tbl.name}\`\n- ชนิดข้อมูล: \`${col.type}\`\n- คีย์หลัก: ${col.pk ? "ใช่ (Primary Key)" : "ไม่ใช่"}`
              },
              range: range,
              sortText: "01_" + col.name
            });
          });
        });

        // Keywords
        SQL_KEYWORDS.forEach(kw => {
          suggestions.push({
            label: kw.label,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: kw.insertText || kw.label,
            insertTextRules: kw.isSnippet ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet : undefined,
            detail: "คำสั่ง SQL (Keyword)",
            documentation: {
              value: `### 🔑 ${kw.label}\n\n${kw.desc}\n\n**ไวยากรณ์:**\n\`\`\`sql\n${kw.syntax || ""}\n\`\`\`\n\n**ตัวอย่าง:**\n\`\`\`sql\n${kw.example || ""}\n\`\`\``
            },
            range: range,
            sortText: "10_" + kw.label
          });
        });

        // Data Types
        SQL_TYPES.forEach(tp => {
          suggestions.push({
            label: tp.label,
            kind: monaco.languages.CompletionItemKind.TypeParameter,
            insertText: tp.insertText || tp.label,
            insertTextRules: tp.isSnippet ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet : undefined,
            detail: "ชนิดข้อมูล (Data Type)",
            documentation: {
              value: `### 📦 ${tp.label}\n\n${tp.desc}`
            },
            range: range,
            sortText: "20_" + tp.label
          });
        });

        // Functions
        SQL_FUNCTIONS.forEach(fn => {
          suggestions.push({
            label: fn.label,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: fn.insertText || (fn.label + "(${1:expr})"),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: "ฟังก์ชัน SQL (Built-in Function)",
            documentation: {
              value: `### ⚡ ${fn.label}()\n\n${fn.desc}\n\n**รูปแบบ:**\n\`\`\`sql\n${fn.syntax || ""}\n\`\`\`\n\n**ตัวอย่าง:**\n\`\`\`sql\n${fn.example || ""}\n\`\`\``
            },
            range: range,
            sortText: "30_" + fn.label
          });
        });

        // Snippets
        SQL_SNIPPETS.forEach(sn => {
          suggestions.push({
            label: sn.label,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: sn.insertText,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: `แม่แบบโค้ด: ${sn.desc}`,
            documentation: {
              value: `### ⚡ Snippet: \`${sn.label}\`\n\n${sn.desc}`
            },
            range: range,
            sortText: "40_" + sn.label
          });
        });

        return { suggestions: suggestions };
      }
    });

    // 2. Hover Provider (VS Code / Antigravity style interactive tooltips)
    monaco.languages.registerHoverProvider("sql", {
      provideHover: function (model, position) {
        const word = model.getWordAtPosition(position);
        if (!word) return null;
        const upperWord = word.word.toUpperCase();

        // Check SQL Keywords / Types / Functions
        if (HOVER_DOCS_MAP[upperWord]) {
          const item = HOVER_DOCS_MAP[upperWord];
          const contents = [
            { value: `### 💡 SQL: \`${item.label}\`` },
            { value: item.desc }
          ];
          if (item.syntax) {
            contents.push({ value: `**ไวยากรณ์ (Syntax):**\n\`\`\`sql\n${item.syntax}\n\`\`\`` });
          }
          if (item.example) {
            contents.push({ value: `**ตัวอย่างการใช้งาน (Example):**\n\`\`\`sql\n${item.example}\n\`\`\`` });
          }

          return {
            range: new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn),
            contents: contents
          };
        }

        // Check Dynamic SQLite Tables
        const schema = getDynamicSchema();
        const foundTable = schema.find(t => t.name.toUpperCase() === upperWord);
        if (foundTable) {
          let tableMd = `ตารางในฐานข้อมูล SQLite ปัจจุบัน (${foundTable.columns.length} คอลัมน์)\n\n`;
          tableMd += `| คอลัมน์ | ชนิดข้อมูล | คุณสมบัติ |\n| :--- | :--- | :--- |\n`;
          foundTable.columns.forEach(c => {
            tableMd += `| \`${c.name}\` | \`${c.type}\` | ${c.pk ? "🔑 Primary Key" : "-"} |\n`;
          });

          return {
            range: new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn),
            contents: [
              { value: `### 🗄️ ตาราง: \`${foundTable.name}\`` },
              { value: tableMd }
            ]
          };
        }

        // Check Column of any table
        for (const tbl of schema) {
          const foundCol = tbl.columns.find(c => c.name.toUpperCase() === upperWord);
          if (foundCol) {
            return {
              range: new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn),
              contents: [
                { value: `### 🏷️ คอลัมน์: \`${foundCol.name}\`` },
                { value: `- สังกัดตาราง: \`${tbl.name}\`\n- ชนิดข้อมูล (Data Type): \`${foundCol.type}\`\n- คุณสมบัติ: ${foundCol.pk ? "🔑 Primary Key" : "Normal Column"}` }
              ]
            };
          }
        }

        return null;
      }
    });
  }

  // ===========================================================================
  // Initialize Monaco Editor Instance
  // ===========================================================================

  function initMonaco(onReadyCallback) {
    if (typeof require === "undefined") {
      console.warn("Monaco loader not found, falling back to textarea editor.");
      if (onReadyCallback) onReadyCallback(false);
      return;
    }

    require.config({
      paths: {
        vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs"
      }
    });

    require(["vs/editor/editor.main"], function () {
      monacoInstance = window.monaco;
      defineMonacoTheme(monacoInstance);
      registerLanguageProviders(monacoInstance);

      const container = document.getElementById("monaco-editor-container");
      const textarea = document.getElementById("sql-editor");
      const gutter = document.getElementById("editor-gutter");
      const acPopup = document.getElementById("autocomplete-popup");

      const initialValue = textarea ? textarea.value : "";

      monacoEditor = monacoInstance.editor.create(container, {
        value: initialValue,
        language: "sql",
        theme: "sqllab-antigravity",
        fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
        fontSize: 14,
        lineHeight: 22,
        tabSize: 2,
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        bracketPairColorization: { enabled: true },
        cursorBlinking: "smooth",
        cursorSmoothCaretAnimation: "on",
        smoothScrolling: true,
        wordWrap: "on",
        quickSuggestions: { other: true, comments: false, strings: false },
        quickSuggestionsDelay: 10,
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: "on",
        tabCompletion: "on",
        renderLineHighlight: "all",
        padding: { top: 12, bottom: 12 }
      });

      // Hide legacy textarea and gutter
      if (textarea) textarea.style.display = "none";
      if (gutter) gutter.style.display = "none";
      if (acPopup) acPopup.style.display = "none";

      // Bind Cursor Position Badge
      const cursorBadge = document.getElementById("editor-cursor-pos");
      monacoEditor.onDidChangeCursorPosition(e => {
        if (cursorBadge) {
          cursorBadge.textContent = `Ln ${e.position.lineNumber}, Col ${e.position.column}`;
        }
      });

      // Clear Error Markers on edit
      monacoEditor.onDidChangeModelContent(() => {
        if (currentErrorMarkers.length > 0) {
          clearEditorErrors();
        }
      });

      // Bind Ctrl+Enter / Cmd+Enter to execute SQL
      monacoEditor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter, () => {
        const btnRun = document.getElementById("btn-run-sql");
        if (btnRun) btnRun.click();
      });

      // Listen for window/container resize
      const ro = new ResizeObserver(() => {
        if (monacoEditor) monacoEditor.layout();
      });
      const editorWrapper = document.getElementById("editor-wrapper");
      if (editorWrapper) ro.observe(editorWrapper);

      console.log("⚡ Monaco Editor successfully initialized with VS Code & Antigravity IDE capabilities!");
      if (onReadyCallback) onReadyCallback(true);
    });
  }

  // ===========================================================================
  // Error Markers & Diagnostics (Red squiggly underline on exact line)
  // ===========================================================================

  function setEditorError(errorMessage, queryText) {
    if (!monacoEditor || !monacoInstance) return;
    const model = monacoEditor.getModel();
    if (!model) return;

    // Parse line number from SQLite error (e.g. "Parse error near line 7: ...")
    const lineMatch = errorMessage.match(/(?:near line|line)\s+(\d+)/i);
    let lineNum = 1;
    let startCol = 1;
    let endCol = 1000;

    if (lineMatch) {
      lineNum = Math.min(model.getLineCount(), Math.max(1, parseInt(lineMatch[1], 10)));
      const lineContent = model.getLineContent(lineNum) || "";
      startCol = Math.max(1, lineContent.search(/\S/) + 1);
      endCol = Math.max(startCol + 1, lineContent.length + 1);
    } else {
      const pos = monacoEditor.getPosition();
      if (pos) {
        lineNum = pos.lineNumber;
        startCol = 1;
        endCol = model.getLineMaxColumn(lineNum);
      }
    }

    currentErrorMarkers = [
      {
        startLineNumber: lineNum,
        startColumn: startCol,
        endLineNumber: lineNum,
        endColumn: endCol,
        message: errorMessage,
        severity: monacoInstance.MarkerSeverity.Error
      }
    ];

    monacoInstance.editor.setModelMarkers(model, "sqlite-runtime", currentErrorMarkers);

    // Reveal error line if out of viewport
    monacoEditor.revealLineInCenterIfOutsideViewport(lineNum);
  }

  function clearEditorErrors() {
    if (!monacoEditor || !monacoInstance) return;
    const model = monacoEditor.getModel();
    if (!model) return;
    currentErrorMarkers = [];
    monacoInstance.editor.setModelMarkers(model, "sqlite-runtime", []);
  }

  // ===========================================================================
  // Public Interface (SqlEditorManager)
  // ===========================================================================

  window.SqlEditorManager = {
    init: initMonaco,
    setDbGetter: function (fn) {
      getDatabaseInstance = fn;
    },
    isMonacoActive: function () {
      return !!monacoEditor;
    },
    getValue: function () {
      if (monacoEditor) return monacoEditor.getValue();
      const ta = document.getElementById("sql-editor");
      return ta ? ta.value : "";
    },
    setValue: function (val) {
      if (monacoEditor) {
        monacoEditor.setValue(val || "");
        clearEditorErrors();
      } else {
        const ta = document.getElementById("sql-editor");
        if (ta) ta.value = val || "";
      }
    },
    focus: function () {
      if (monacoEditor) monacoEditor.focus();
      else {
        const ta = document.getElementById("sql-editor");
        if (ta) ta.focus();
      }
    },
    formatCode: function () {
      if (monacoEditor) {
        monacoEditor.getAction("editor.action.formatDocument").run().catch(() => {});
      }
    },
    layout: function () {
      if (monacoEditor) monacoEditor.layout();
    },
    setError: setEditorError,
    clearError: clearEditorErrors
  };
})();
