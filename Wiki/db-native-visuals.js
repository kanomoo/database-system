/**
 * Database System Wiki — Native Visual Architecture Engine
 * 100% Zero Mermaid Dependency
 * Maps all 41 textbook, exam and lab diagrams to world-class pedagogical SVG/HTML models.
 */

window.DbNativeVisuals = (function () {
  'use strict';

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function render(code, docId, inDocIdx) {
    const clean = (code || '').trim();
    const lower = clean.toLowerCase();
    const dId = docId || '';

    // =========================================================================
    // #01: MASTER KNOWLEDGE MAP (Database System Index.md - Diagram 1)
    // =========================================================================
    if ((dId.includes('Index') && inDocIdx === 1) || (lower.includes('database system<br/>knowledge base') || (lower.includes('mindmap') && lower.includes('root((database system')))) {
      return {
        title: '🗺️ สถาปัตยกรรมภาพรวมวิชา Database System & Master Knowledge Map',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;">
              <div class="db-card" style="border-left:4px solid #4fd1e8;background:#131722;padding:16px;border-radius:10px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#4fd1e8;font-size:15px;margin-bottom:8px;">1. Foundations (รากฐาน)</div>
                <div style="font-size:13px;color:#c7cad6;line-height:1.6;">
                  • <b>Ch1 Overview & TPS</b>: Components, Data Independence, TP Monitor<br/>
                  • <b>Ch2 Architecture</b>: ANSI/SPARC 3-Schema, Relational Model, Keys
                </div>
              </div>
              <div class="db-card" style="border-left:4px solid #f59e0b;background:#131722;padding:16px;border-radius:10px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#f59e0b;font-size:15px;margin-bottom:8px;">2. Data Modeling & Theory (ทฤษฎี)</div>
                <div style="font-size:13px;color:#c7cad6;line-height:1.6;">
                  • <b>Ch3 Relational Algebra</b>: σ, π, ⨝, ∪, ∩, −, Optimizer<br/>
                  • <b>Ch4 ER Model</b>: Entities, Attributes, Cardinality (1:1, 1:N, M:N)<br/>
                  • <b>Ch5 Functional Dependencies</b>: Full vs Partial vs Transitive FDs<br/>
                  • <b>Ch6 Normalization</b>: 1NF ➔ 2NF ➔ 3NF ➔ BCNF Decompositions
                </div>
              </div>
              <div class="db-card" style="border-left:4px solid #10b981;background:#131722;padding:16px;border-radius:10px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#10b981;font-size:15px;margin-bottom:8px;">3. Practical SQL & Lab (ปฏิบัติการ)</div>
                <div style="font-size:13px;color:#c7cad6;line-height:1.6;">
                  • <b>Ch7 SQL Fundamentals</b>: DDL, DML, DQL (SELECT, WHERE, LIKE)<br/>
                  • <b>Ch7.2 Advanced SQL</b>: GROUP BY, HAVING, Subqueries, JOINs<br/>
                  • <b>SQL Lab Practice Guide</b>: Roadmap 0-7, Enterprise 7-Table Store
                </div>
              </div>
              <div class="db-card" style="border-left:4px solid #b794f6;background:#131722;padding:16px;border-radius:10px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#b794f6;font-size:15px;margin-bottom:8px;">4. Engine & Advanced Topics (ขั้นสูง)</div>
                <div style="font-size:13px;color:#c7cad6;line-height:1.6;">
                  • <b>Ch8 Transaction Processing</b>: ACID, WAL Log, Recovery UNDO/REDO<br/>
                  • <b>Ch8 Concurrency Control</b>: Lost Update, Lock-S/Lock-X, Strict 2PL<br/>
                  • <b>Ch9 NoSQL Databases</b>: CAP Theorem, Key-Value, Document, Graph
                </div>
              </div>
            </div>
            <div class="db-tree-footer">
              <span class="db-tree-chip">📌 สถาปัตยกรรมครอบคลุมครบทั้ง 4 เสาหลักของวิชา Database Systems พร้อมห้องทดลอง SQL Lab เต็มรูปแบบ</span>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #02: EXAM GUIDE MINDMAP (In-Class Exam Guide - Diagram 1)
    // =========================================================================
    if ((dId.includes('In-Class Exam Guide') && inDocIdx === 1) || (lower.includes('สอบปฏิบัติการเดี่ยว') && lower.includes('normalization and schema design'))) {
      return {
        title: '🎯 พิมพ์เขียวข้อสอบปฏิบัติการเดี่ยวในชั้นเรียน (Exam Architecture & Blueprint)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
              <div style="background:#131722;border:1.5px solid #4fd1e8;border-radius:12px;padding:18px;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
                  <span style="background:rgba(79,209,232,0.15);color:#4fd1e8;padding:4px 8px;border-radius:6px;font-size:12px;font-weight:700;">PART 1</span>
                  <span style="font-family:'Chakra Petch',sans-serif;font-size:15px;font-weight:700;color:#e2e8f0;">Normalization & Schema Design</span>
                </div>
                <div style="font-size:13px;color:#94a3b8;line-height:1.6;margin-bottom:12px;">
                  • <b>Ch4 ER Modeling</b>: วิเคราะห์ Cardinality (1:N, M:N) และระบุ Entities<br/>
                  • <b>Ch5 Functional Dependencies</b>: เขียนสายเชื่อมโยง X ➔ Y ชัดเจน<br/>
                  • <b>Ch6 ขั้นตอนหั่นตาราง</b>: แปลง UNF ➔ 1NF ➔ 2NF ➔ 3NF ห้ามสูญหายข้อมูล
                </div>
                <div style="background:rgba(79,209,232,0.08);padding:10px 14px;border-radius:8px;border:1px dashed rgba(79,209,232,0.3);font-size:12.5px;color:#38bdf8;">
                  🎯 <b>ผลลัพธ์ที่ต้องส่งอาจารย์:</b> ตารางชุดใหม่ที่อยู่ในรูป 3NF พร้อมระบุ PK / FK และวาด ER Diagram รองรับความต้องการครบถ้วน
                </div>
              </div>

              <div style="background:#131722;border:1.5px solid #10b981;border-radius:12px;padding:18px;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
                  <span style="background:rgba(16,185,129,0.15);color:#10b981;padding:4px 8px;border-radius:6px;font-size:12px;font-weight:700;">PART 2</span>
                  <span style="font-family:'Chakra Petch',sans-serif;font-size:15px;font-weight:700;color:#e2e8f0;">Scenario-Based SQL Queries</span>
                </div>
                <div style="font-size:13px;color:#94a3b8;line-height:1.6;margin-bottom:12px;">
                  • <b>Ch7 SQL พื้นฐาน</b>: SELECT, WHERE, LIKE, ORDER BY, INNER JOIN<br/>
                  • <b>Ch7.2 SQL ขั้นสูง</b>: GROUP BY, HAVING, Subquery ซ้อนหลายชั้น<br/>
                  • <b>Anti-Join & Set Ops</b>: ค้นหาข้อมูลที่ไม่เคยเกิดขึ้นจริง (เช่น ลูกค้าที่ไม่เคยสั่งซื้อ)
                </div>
                <div style="background:rgba(16,185,129,0.08);padding:10px 14px;border-radius:8px;border:1px dashed rgba(16,185,129,0.3);font-size:12.5px;color:#34d399;">
                  🎯 <b>ผลลัพธ์ที่ต้องส่งอาจารย์:</b> คำสั่ง SQL Query ถูกต้องตามหลักไวยากรณ์ รันผ่าน และให้ชุดข้อมูล (Result Set) แม่นยำ 100%
                </div>
              </div>
            </div>
            <div class="db-tree-footer">
              <span class="db-tree-chip">💡 กลยุทธ์ทำข้อสอบ: ทำ Part 1 ให้เสร็จก่อนเพื่อสร้าง Schema ที่ถูกต้อง จากนั้นจึงเขียนคำสั่ง SQL Query ใน Part 2</span>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #03: NORMALIZATION PIPELINE (In-Class Exam Guide - Diagram 2)
    // =========================================================================
    if ((dId.includes('In-Class Exam Guide') && inDocIdx === 2) || (lower.includes('unf:') && lower.includes('1nf:') && lower.includes('2nf:') && lower.includes('3nf:'))) {
      return {
        title: '⚙️ กระบวนการทำนอร์มัลไลเซชัน (Normalization Pipeline Architecture: UNF ➔ BCNF)',
        html: `
          <div class="db-native-wrap">
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div style="display:grid;grid-template-columns:100px 1fr;gap:16px;align-items:center;background:#131722;padding:12px 18px;border-radius:10px;border-left:4px solid #ef4444;">
                <span class="db-stage-badge" style="background:#ef4444;color:#fff;font-weight:700;font-size:12px;padding:4px 8px;border-radius:6px;text-align:center;">UNF ➔ 1NF</span>
                <div>
                  <div style="font-weight:700;color:#f87171;font-size:14px;">กำจัดค่าซ้ำ (Repeating Groups) &amp; กำหนด Primary Key</div>
                  <div style="font-size:12.5px;color:#c7cad6;margin-top:2px;">• แยกข้อมูลแต่ละช่องให้เป็น <b>Atomic Value</b> (ค่าเดี่ยว ไม่เก็บ Array หรือ Comma-separated)<br/>• กำหนด <b>Composite Primary Key</b> (มักเกิดจากการรวมรหัสหลัก + รหัสรายการ)</div>
                </div>
              </div>

              <div style="display:grid;grid-template-columns:100px 1fr;gap:16px;align-items:center;background:#131722;padding:12px 18px;border-radius:10px;border-left:4px solid #f59e0b;">
                <span class="db-stage-badge" style="background:#f59e0b;color:#1e293b;font-weight:700;font-size:12px;padding:4px 8px;border-radius:6px;text-align:center;">1NF ➔ 2NF</span>
                <div>
                  <div style="font-weight:700;color:#fbbf24;font-size:14px;">กำจัด Partial Functional Dependencies (การขึ้นต่อกันเพียงบางส่วน)</div>
                  <div style="font-size:12.5px;color:#c7cad6;margin-top:2px;">• ทุกฟิลด์ที่ไม่ใช่คีย์ (Non-key) ต้องขึ้นต่อ <b>Full Primary Key</b> ครบทุกส่วนของ Composite Key<br/>• หากฟิลด์ใดขึ้นต่อคีย์หลักเพียงบางตัว <b>ต้องหั่นแยกออกไปเป็นตารางใหม่</b> ทันที</div>
                </div>
              </div>

              <div style="display:grid;grid-template-columns:100px 1fr;gap:16px;align-items:center;background:#131722;padding:12px 18px;border-radius:10px;border-left:4px solid #10b981;">
                <span class="db-stage-badge" style="background:#10b981;color:#1e293b;font-weight:700;font-size:12px;padding:4px 8px;border-radius:6px;text-align:center;">2NF ➔ 3NF</span>
                <div>
                  <div style="font-weight:700;color:#34d399;font-size:14px;">กำจัด Transitive Functional Dependencies (การขึ้นต่อกันแบบทอดๆ)</div>
                  <div style="font-size:12.5px;color:#c7cad6;margin-top:2px;">• ห้ามมีสถานการณ์ที่ <b>Non-key ฟิลด์หนึ่ง ไปกำหนดค่าให้ Non-key อีกฟิลด์หนึ่ง</b> (A ➔ B ➔ C)<br/>• ตารางต้องไม่มี Redundant Data ที่สามารถคำนวณหรือหาได้จากความสัมพันธ์อื่น</div>
                </div>
              </div>

              <div style="display:grid;grid-template-columns:100px 1fr;gap:16px;align-items:center;background:#131722;padding:12px 18px;border-radius:10px;border-left:4px solid #4fd1e8;">
                <span class="db-stage-badge" style="background:#4fd1e8;color:#0f172a;font-weight:700;font-size:12px;padding:4px 8px;border-radius:6px;text-align:center;">3NF ➔ BCNF</span>
                <div>
                  <div style="font-weight:700;color:#38bdf8;font-size:14px;">กฎเหล็ก Determinant: ทุกฝั่งซ้ายของ FD ต้องเป็น Superkey</div>
                  <div style="font-size:12.5px;color:#c7cad6;margin-top:2px;">• ในทุก Functional Dependency <code>X ➔ Y</code> ตัวกำหนดค่า <code>X</code> จะต้องเป็น <b>Superkey</b> เท่านั้น<br/>• ครอบคลุมกรณีพิเศษที่มี Overlapping Candidate Keys อย่างรัดกุม</div>
                </div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #04: EXAM CASE 1 (In-Class Exam Guide - Diagram 3)
    // =========================================================================
    if ((dId.includes('In-Class Exam Guide') && inDocIdx === 3) || (lower.includes('advisors') && lower.includes('enrollments') && lower.includes('advisoroffice'))) {
      return {
        title: '🎓 สถาปัตยกรรม Schema กรณีศึกษา 1: ระบบทะเบียน อาจารย์ที่ปรึกษา และการลงทะเบียนเรียน',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(230px, 1fr));gap:14px;">
              <div class="db-entity-card">
                <div class="db-entity-header">🏛️ ADVISORS <span class="db-entity-tag">Master</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>AdvisorID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">AdvisorName <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">AdvisorOffice <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <div class="db-entity-card">
                <div class="db-entity-header">👨‍🎓 STUDENTS <span class="db-entity-tag">Master</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>StudentID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">StudentName <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">Major <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row"><span class="db-fk-badge">FK</span> <i>AdvisorID</i> <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <div class="db-entity-card">
                <div class="db-entity-header">📚 COURSES <span class="db-entity-tag">Master</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>CourseID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">CourseName <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">Credits <span class="db-data-type">INT</span></div>
                </div>
              </div>

              <div class="db-entity-card" style="border-color:#10b981;">
                <div class="db-entity-header" style="background:rgba(16,185,129,0.15);color:#34d399;">📝 ENROLLMENTS <span class="db-entity-tag" style="background:#10b981;color:#0f172a;">Junction (M:N)</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span><span class="db-fk-badge">FK</span> <b>StudentID</b></div>
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span><span class="db-fk-badge">FK</span> <b>CourseID</b></div>
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>Semester</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">Grade <span class="db-data-type">CHAR(2)</span></div>
                </div>
              </div>
            </div>
            <div class="db-tree-footer">
              <span class="db-tree-chip">🔗 ความสัมพันธ์: ADVISORS (1) ➔ (N) STUDENTS | STUDENTS (M) ➔ (N) COURSES เชื่อมผ่านตาราง ENROLLMENTS</span>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #05: EXAM CASE 2 (In-Class Exam Guide - Diagram 4)
    // =========================================================================
    if ((dId.includes('In-Class Exam Guide') && inDocIdx === 4) || (lower.includes('customercity') && lower.includes('invoiceno') && lower.includes('invoice_items'))) {
      return {
        title: '🧾 สถาปัตยกรรม Schema กรณีศึกษา 2: ระบบใบเสร็จรับเงิน ลูกค้า และสินค้า (Retail Billing Model)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(230px, 1fr));gap:14px;">
              <div class="db-entity-card">
                <div class="db-entity-header">👤 CUSTOMERS <span class="db-entity-tag">Master</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>CustomerID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">CustomerName <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">CustomerCity <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <div class="db-entity-card">
                <div class="db-entity-header">📑 INVOICES <span class="db-entity-tag">Header</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>InvoiceNo</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">InvoiceDate <span class="db-data-type">DATE</span></div>
                  <div class="db-attr-row"><span class="db-fk-badge">FK</span> <i>CustomerID</i> <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <div class="db-entity-card" style="border-color:#f59e0b;">
                <div class="db-entity-header" style="background:rgba(245,158,11,0.15);color:#fbbf24;">📦 INVOICE_ITEMS <span class="db-entity-tag" style="background:#f59e0b;color:#0f172a;">Detail (M:N)</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span><span class="db-fk-badge">FK</span> <b>InvoiceNo</b></div>
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span><span class="db-fk-badge">FK</span> <b>ProductID</b></div>
                  <div class="db-attr-row">Quantity <span class="db-data-type">INT</span></div>
                </div>
              </div>

              <div class="db-entity-card">
                <div class="db-entity-header">🏷️ PRODUCTS <span class="db-entity-tag">Master</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>ProductID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">ProductName <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">Category <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">UnitPrice <span class="db-data-type">DECIMAL</span></div>
                </div>
              </div>
            </div>
            <div class="db-tree-footer">
              <span class="db-tree-chip">🔗 ความสัมพันธ์: CUSTOMERS (1) ➔ (N) INVOICES | INVOICES (1) ➔ (N) INVOICE_ITEMS (N) 🠔 (1) PRODUCTS</span>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #06: EXAM CASE 3 (In-Class Exam Guide - Diagram 5)
    // =========================================================================
    if ((dId.includes('In-Class Exam Guide') && inDocIdx === 5) || (lower.includes('patientphone') && lower.includes('treatmentfee') && lower.includes('appointdate'))) {
      return {
        title: '🏥 สถาปัตยกรรม Schema กรณีศึกษา 3: ระบบนัดหมายแพทย์และประวัติผู้ป่วย (Clinic Appointment Model)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));gap:16px;">
              <div class="db-entity-card">
                <div class="db-entity-header">🩺 PATIENTS <span class="db-entity-tag">Master</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>PatientID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">PatientName <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">PatientPhone <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <div class="db-entity-card" style="border-color:#4fd1e8;">
                <div class="db-entity-header" style="background:rgba(79,209,232,0.15);color:#4fd1e8;">🗓️ APPOINTMENTS <span class="db-entity-tag" style="background:#4fd1e8;color:#0f172a;">Transaction</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>AppointID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">AppointDate <span class="db-data-type">DATETIME</span></div>
                  <div class="db-attr-row"><span class="db-fk-badge">FK</span> <i>PatientID</i> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row"><span class="db-fk-badge">FK</span> <i>DoctorID</i> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">Diagnosis <span class="db-data-type">TEXT</span></div>
                  <div class="db-attr-row">TreatmentFee <span class="db-data-type">DECIMAL</span></div>
                </div>
              </div>

              <div class="db-entity-card">
                <div class="db-entity-header">👨‍⚕️ DOCTORS <span class="db-entity-tag">Master</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>DoctorID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">DoctorName <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">Specialty <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">RoomNo <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>
            </div>
            <div class="db-tree-footer">
              <span class="db-tree-chip">🔗 ความสัมพันธ์: ผู้ป่วย 1 คนนัดหมายได้หลายครั้ง (1:N) และแพทย์ 1 คนมีคิวนัดหมายได้หลายครั้ง (1:N)</span>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #07: EXAM CASE 4 (In-Class Exam Guide - Diagram 6)
    // =========================================================================
    if ((dId.includes('In-Class Exam Guide') && inDocIdx === 6) || (lower.includes('hoursworked') && lower.includes('staffed_by') && lower.includes('assigned_to'))) {
      return {
        title: '💼 สถาปัตยกรรม Schema กรณีศึกษา 4: ระบบจัดสรรงาน แผนก พนักงาน และโครงการ (Project Staffing Model)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(230px, 1fr));gap:14px;">
              <div class="db-entity-card">
                <div class="db-entity-header">🏢 DEPARTMENTS <span class="db-entity-tag">Master</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>DeptID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">DeptName <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <div class="db-entity-card">
                <div class="db-entity-header">👔 EMPLOYEES <span class="db-entity-tag">Master</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>EmpID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">EmpName <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">Position <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row"><span class="db-fk-badge">FK</span> <i>DeptID</i> <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <div class="db-entity-card" style="border-color:#b794f6;">
                <div class="db-entity-header" style="background:rgba(183,148,246,0.15);color:#c084fc;">⏱️ WORKS_ON <span class="db-entity-tag" style="background:#b794f6;color:#0f172a;">Junction (M:N)</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span><span class="db-fk-badge">FK</span> <b>EmpID</b></div>
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span><span class="db-fk-badge">FK</span> <b>ProjID</b></div>
                  <div class="db-attr-row">HoursWorked <span class="db-data-type">DECIMAL</span></div>
                </div>
              </div>

              <div class="db-entity-card">
                <div class="db-entity-header">🚀 PROJECTS <span class="db-entity-tag">Master</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>ProjID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">ProjName <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">Budget <span class="db-data-type">DECIMAL</span></div>
                </div>
              </div>
            </div>
            <div class="db-tree-footer">
              <span class="db-tree-chip">🔗 ความสัมพันธ์: DEPARTMENTS (1) ➔ (N) EMPLOYEES | EMPLOYEES (M) ➔ (N) PROJECTS ผ่าน WORKS_ON เก็บชั่วโมงทำงาน</span>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #08: EXAM CASE 5 (In-Class Exam Guide - Diagram 7)
    // =========================================================================
    if ((dId.includes('In-Class Exam Guide') && inDocIdx === 7) || (lower.includes('ratepernight') && lower.includes('totalnights') && lower.includes('booked_for'))) {
      return {
        title: '🏨 สถาปัตยกรรม Schema กรณีศึกษา 5: ระบบจองห้องพักโรงแรมและลูกค้า (Hotel Booking Model)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));gap:16px;">
              <div class="db-entity-card">
                <div class="db-entity-header">🧳 GUESTS <span class="db-entity-tag">Master</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>GuestID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">GuestName <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">GuestEmail <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <div class="db-entity-card" style="border-color:#f59e0b;">
                <div class="db-entity-header" style="background:rgba(245,158,11,0.15);color:#fbbf24;">🛎️ BOOKINGS <span class="db-entity-tag" style="background:#f59e0b;color:#0f172a;">Reservation</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>BookingID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">CheckInDate <span class="db-data-type">DATE</span></div>
                  <div class="db-attr-row">CheckOutDate <span class="db-data-type">DATE</span></div>
                  <div class="db-attr-row"><span class="db-fk-badge">FK</span> <i>GuestID</i> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row"><span class="db-fk-badge">FK</span> <i>RoomNo</i> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">TotalNights <span class="db-data-type">INT</span></div>
                  <div class="db-attr-row">TotalAmount <span class="db-data-type">DECIMAL</span></div>
                </div>
              </div>

              <div class="db-entity-card">
                <div class="db-entity-header">🚪 ROOMS <span class="db-entity-tag">Master</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>RoomNo</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">RoomType <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">RatePerNight <span class="db-data-type">DECIMAL</span></div>
                </div>
              </div>
            </div>
            <div class="db-tree-footer">
              <span class="db-tree-chip">🔗 ความสัมพันธ์: แขก 1 คนสามารถจองได้หลายครั้ง (1:N) และห้อง 1 ห้องสามารถมีประวัติการจองได้หลายครั้ง (1:N)</span>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #09: CH1 HIGH-LEVEL TAXONOMY (Lecture 1 - Diagram 1)
    // =========================================================================
    if ((dId.includes('Lecture 1') && inDocIdx === 1) || (lower.includes('a[database system]') && lower.includes('b[components]'))) {
      return {
        title: '🏛️ โครงสร้าง 4 เสาหลักของระบบฐานข้อมูล (Database System Taxonomy Architecture)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;">
              <div style="background:#131722;border:1.5px solid #4fd1e8;border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#4fd1e8;font-size:15px;margin-bottom:6px;">1. Components</div>
                <div style="font-size:12.5px;color:#c7cad6;line-height:1.6;">• ข้อมูล (Data)<br/>• ฮาร์ดแวร์ (Hardware)<br/>• ซอฟต์แวร์ (Software)<br/>• บุคลากร (Users)</div>
              </div>
              <div style="background:#131722;border:1.5px solid #f59e0b;border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#f59e0b;font-size:15px;margin-bottom:6px;">2. Core Concepts</div>
                <div style="font-size:12.5px;color:#c7cad6;line-height:1.6;">• Database vs DBMS<br/>• โมเดลข้อมูล (Data Model)<br/>• ความเป็นอิสระของข้อมูล (Data Independence)</div>
              </div>
              <div style="background:#131722;border:1.5px solid #10b981;border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#10b981;font-size:15px;margin-bottom:6px;">3. Transaction (TPS)</div>
                <div style="font-size:12.5px;color:#c7cad6;line-height:1.6;">• หน่วยการทำงานเชิงตรรกะ<br/>• TP Monitor คุมคิวงาน<br/>• TPS ระดับองค์กร</div>
              </div>
              <div style="background:#131722;border:1.5px solid #b794f6;border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#b794f6;font-size:15px;margin-bottom:6px;">4. Requirements &amp; Roles</div>
                <div style="font-size:12.5px;color:#c7cad6;line-height:1.6;">• 6 ข้อกำหนดความต้องการ<br/>• 5 บทบาททางวิชาชีพ (Analyst, Designer, Dev, DBA, Admin)</div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #10: CH1 COMPONENTS (Lecture 1 - Diagram 2)
    // =========================================================================
    if ((dId.includes('Lecture 1') && inDocIdx === 2) || (lower.includes('integrated') && lower.includes('secondary storage') && lower.includes('db server'))) {
      return {
        title: '🧩 ส่วนประกอบสำคัญ 4 ประการของระบบฐานข้อมูล (Hardware, Software, Data & Users)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:16px;">
              <div style="background:#131722;border:1.5px solid #10b981;border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#10b981;font-size:15px;margin-bottom:8px;">📊 Data (ข้อมูล)</div>
                <div style="font-size:13px;color:#c7cad6;line-height:1.6;">
                  • <b>Integrated</b>: รวบรวมข้อมูลทุกแผนกมาอยู่ในถังเดียวกัน ลดความซ้ำซ้อน<br/>
                  • <b>Shared</b>: ผู้ใช้หลายคนเปิดอ่านและแก้ไขได้พร้อมกัน (Multi-user concurrency)
                </div>
              </div>
              <div style="background:#131722;border:1.5px solid #f59e0b;border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#f59e0b;font-size:15px;margin-bottom:8px;">🖥️ Hardware (อุปกรณ์)</div>
                <div style="font-size:13px;color:#c7cad6;line-height:1.6;">
                  • <b>CPU & Memory (RAM)</b>: บัฟเฟอร์แคชสำหรับรันคำสั่งและพักตาราง<br/>
                  • <b>Secondary Storage</b>: NVMe SSD/HDD เก็บดิสก์ถาวร<br/>
                  • <b>Network</b>: Client/Server Topology
                </div>
              </div>
              <div style="background:#131722;border:1.5px solid #4fd1e8;border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#4fd1e8;font-size:15px;margin-bottom:8px;">💿 Software (ซอฟต์แวร์)</div>
                <div style="font-size:13px;color:#c7cad6;line-height:1.6;">
                  • <b>DB Server</b>: เช่น MySQL, PostgreSQL, Oracle, SQLite<br/>
                  • <b>DBMS Engine</b>: ตัวควบคุมความปลอดภัย การล็อก (Locks) และกู้คืนข้อมูล (Recovery)
                </div>
              </div>
              <div style="background:#131722;border:1.5px solid #b794f6;border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#b794f6;font-size:15px;margin-bottom:8px;">👥 Users (บุคลากร)</div>
                <div style="font-size:13px;color:#c7cad6;line-height:1.6;">
                  • <b>Application Programmers</b>: เขียนโค้ดเชื่อมต่อ<br/>
                  • <b>End Users</b>: ผู้ใช้งานทั่วไปผ่านระบบหน้าเว็บ/แอป<br/>
                  • <b>Database Administrator (DBA)</b>: ผู้ดูแลระบบสูงสุด
                </div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #11: CH1 QUERY EXECUTION (Lecture 1 - Diagram 3)
    // =========================================================================
    if ((dId.includes('Lecture 1') && inDocIdx === 3) || (lower.includes('select * from students where gpa > 3.0') && lower.includes('parse & interpret sql'))) {
      return {
        title: '⚡ วงจรการรันคำสั่ง SQL Query: Application ➔ DBMS ➔ Physical Storage',
        html: `
          <div class="db-native-wrap">
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div style="display:grid;grid-template-columns:60px 140px 1fr;align-items:center;background:#131722;padding:12px 16px;border-radius:8px;border-left:4px solid #4fd1e8;">
                <span style="font-family:'JetBrains Mono',monospace;color:#4fd1e8;font-weight:700;">STEP 1</span>
                <span style="color:#e2e8f0;font-weight:600;font-size:13px;">App ส่งคำร้อง</span>
                <span style="font-family:'JetBrains Mono',monospace;color:#38bdf8;font-size:12.5px;">SELECT * FROM Students WHERE GPA &gt; 3.0</span>
              </div>
              <div style="display:grid;grid-template-columns:60px 140px 1fr;align-items:center;background:#131722;padding:12px 16px;border-radius:8px;border-left:4px solid #f59e0b;">
                <span style="font-family:'JetBrains Mono',monospace;color:#f59e0b;font-weight:700;">STEP 2</span>
                <span style="color:#e2e8f0;font-weight:600;font-size:13px;">DBMS Parse</span>
                <span style="font-size:12.5px;color:#c7cad6;">ตรวจไวยากรณ์ (Syntax Check) + ตรวจสอบสิทธิ์ + วางแผน Cost-based Optimizer</span>
              </div>
              <div style="display:grid;grid-template-columns:60px 140px 1fr;align-items:center;background:#131722;padding:12px 16px;border-radius:8px;border-left:4px solid #b794f6;">
                <span style="font-family:'JetBrains Mono',monospace;color:#b794f6;font-weight:700;">STEP 3</span>
                <span style="color:#e2e8f0;font-weight:600;font-size:13px;">ดึงบล็อกข้อมูล</span>
                <span style="font-size:12.5px;color:#c7cad6;">สแกน B-Tree Index / กวาด Data Blocks จากดิสก์เข้าสู่ RAM Buffer Pool</span>
              </div>
              <div style="display:grid;grid-template-columns:60px 140px 1fr;align-items:center;background:#131722;padding:12px 16px;border-radius:8px;border-left:4px solid #10b981;">
                <span style="font-family:'JetBrains Mono',monospace;color:#10b981;font-weight:700;">STEP 4</span>
                <span style="color:#e2e8f0;font-weight:600;font-size:13px;">ส่งผลลัพธ์</span>
                <span style="font-size:12.5px;color:#34d399;">ส่งชุดแถวข้อมูล (Result Set: นศ. ที่มี GPA &gt; 3.0) กลับคืนให้แอปพลิเคชันอย่างสมบูรณ์</span>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #12: CH1 DATA MODEL DUALITY (Lecture 1 - Diagram 4)
    // =========================================================================
    if ((dId.includes('Lecture 1') && inDocIdx === 4) || (lower.includes('model the structure of data') && lower.includes('model the behavior of data'))) {
      return {
        title: '📐 สองมิติของโมเดลข้อมูล: Objects (โครงสร้าง) vs Operators (พฤติกรรม)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
              <div style="background:#131722;border:1.5px solid #4fd1e8;border-radius:12px;padding:18px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#4fd1e8;font-size:16px;margin-bottom:8px;">📦 Objects (โมเดลโครงสร้างข้อมูล)</div>
                <div style="font-size:13px;color:#94a3b8;margin-bottom:10px;">นิยาม <b>"Data Structure"</b> หน้าตาและชนิดของข้อมูล</div>
                <div style="background:rgba(79,209,232,0.1);padding:12px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:12.5px;color:#e2e8f0;line-height:1.6;">
                  • Relations / Tables (ตาราง)<br/>
                  • Attributes / Columns (คอลัมน์)<br/>
                  • Data Types (INT, VARCHAR, DATE)<br/>
                  • Integrity Constraints (PK, FK, UNIQUE, NOT NULL)
                </div>
              </div>

              <div style="background:#131722;border:1.5px solid #f59e0b;border-radius:12px;padding:18px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#f59e0b;font-size:16px;margin-bottom:8px;">⚙️ Operators (โมเดลพฤติกรรมข้อมูล)</div>
                <div style="font-size:13px;color:#94a3b8;margin-bottom:10px;">นิยาม <b>"Operations &amp; Behavior"</b> การกระทำต่อข้อมูล</div>
                <div style="background:rgba(245,158,11,0.1);padding:12px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:12.5px;color:#e2e8f0;line-height:1.6;">
                  • Selection σ (กรองแถว WHERE)<br/>
                  • Projection π (เลือกคอลัมน์ SELECT)<br/>
                  • Natural Join ⨝ (เชื่อมตาราง)<br/>
                  • Set Operations (UNION, INTERSECT, MINUS)
                </div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #13: CH1 BENEFITS (Lecture 1 - Diagram 5)
    // =========================================================================
    if ((dId.includes('Lecture 1') && inDocIdx === 5) || (lower.includes('benefits of<br/>database') || (lower.includes('inconsistency avoidance') && lower.includes('standards enforcement')))) {
      return {
        title: '🌟 7 ประโยชน์พื้นฐานของการนำระบบฐานข้อมูลมาใช้แทนระบบไฟล์แฟ้มข้อมูลเดิม',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:12px;">
              <div style="background:#131722;border-left:3.5px solid #4fd1e8;padding:12px 14px;border-radius:8px;">
                <b style="color:#4fd1e8;font-size:13.5px;">1. Data Sharing</b>
                <div style="font-size:12.5px;color:#c7cad6;margin-top:2px;">ข้อมูลถูกใช้ร่วมกันได้ทุกแผนกในองค์กรแบบ Real-time</div>
              </div>
              <div style="background:#131722;border-left:3.5px solid #10b981;padding:12px 14px;border-radius:8px;">
                <b style="color:#10b981;font-size:13.5px;">2. Redundancy Reduction</b>
                <div style="font-size:12.5px;color:#c7cad6;margin-top:2px;">ลดการบันทึกข้อมูลซ้ำซ้อน ประหยัดพื้นที่จัดเก็บข้อมูล</div>
              </div>
              <div style="background:#131722;border-left:3.5px solid #f59e0b;padding:12px 14px;border-radius:8px;">
                <b style="color:#f59e0b;font-size:13.5px;">3. Inconsistency Avoidance</b>
                <div style="font-size:12.5px;color:#c7cad6;margin-top:2px;">หลีกเลี่ยงความขัดแย้งของข้อมูล (เมื่อแก้ที่หนึ่ง ทุกที่จะตรงกัน)</div>
              </div>
              <div style="background:#131722;border-left:3.5px solid #b794f6;padding:12px 14px;border-radius:8px;">
                <b style="color:#b794f6;font-size:13.5px;">4. Transaction Support</b>
                <div style="font-size:12.5px;color:#c7cad6;margin-top:2px;">รับประกันคุณสมบัติ ACID ไม่สูญหายแม้ระบบไฟฟ้าดับ</div>
              </div>
              <div style="background:#131722;border-left:3.5px solid #38bdf8;padding:12px 14px;border-radius:8px;">
                <b style="color:#38bdf8;font-size:13.5px;">5. Integrity Maintenance</b>
                <div style="font-size:12.5px;color:#c7cad6;margin-top:2px;">รักษากฎความถูกต้อง (PK, FK, Domain Constraints) เสมอ</div>
              </div>
              <div style="background:#131722;border-left:3.5px solid #f43f5e;padding:12px 14px;border-radius:8px;">
                <b style="color:#f43f5e;font-size:13.5px;">6. Security Enforcement</b>
                <div style="font-size:12.5px;color:#c7cad6;margin-top:2px;">กำหนดสิทธิ์รายบุคคลและบทบาท (GRANT/REVOKE Roles)</div>
              </div>
              <div style="background:#131722;border-left:3.5px solid #34d399;padding:12px 14px;border-radius:8px;">
                <b style="color:#34d399;font-size:13.5px;">7. Standards Enforcement</b>
                <div style="font-size:12.5px;color:#c7cad6;margin-top:2px;">บังคับใช้มาตรฐานชื่อฟิลด์ รหัส และรูปแบบวันเวลาสากล</div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #14: CH1 DATA INDEPENDENCE (Lecture 1 - Diagram 6)
    // =========================================================================
    if ((dId.includes('Lecture 1') && inDocIdx === 6) || (lower.includes('ไม่มี data independence') && lower.includes('มี data independence'))) {
      return {
        title: '🛡️ เปรียบเทียบสถาปัตยกรรม: ไร้ Data Independence ❌ vs มี Data Independence ✅',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
              <div style="background:#131722;border:1.5px solid #ef4444;border-radius:12px;padding:16px;">
                <div style="font-weight:700;color:#f87171;font-size:15px;margin-bottom:8px;">❌ ไม่มี Data Independence (ยุคแฟ้มข้อมูลเดิม)</div>
                <div style="font-size:13px;color:#94a3b8;margin-bottom:12px;">โปรแกรมผูกติดกับโครงสร้างการจัดเก็บในระดับฮาร์ดแวร์โดยตรง</div>
                <div style="display:flex;flex-direction:column;gap:6px;font-size:12.5px;color:#cbd5e1;">
                  <div style="background:rgba(239,68,68,0.1);padding:8px 12px;border-radius:6px;">App ฝ่ายขาย / บัญชี รู้ขนาด Byte Offset &amp; Sector ในดิสก์</div>
                  <div style="text-align:center;color:#ef4444;">🠗 ผูกแน่น (Tightly Coupled) 🠗</div>
                  <div style="background:#1f1319;border:1px solid #ef4444;padding:8px 12px;border-radius:6px;color:#fca5a5;">Physical Storage: เปลี่ยนประเภทดิสก์หรือ Index ➔ <b>โปรแกรมพังหมดทุกแอป!</b></div>
                </div>
              </div>

              <div style="background:#131722;border:1.5px solid #10b981;border-radius:12px;padding:16px;">
                <div style="font-weight:700;color:#34d399;font-size:15px;margin-bottom:8px;">✅ มี Data Independence (ยุค DBMS สมัยใหม่)</div>
                <div style="font-size:13px;color:#94a3b8;margin-bottom:12px;">มีเลเยอร์นามธรรม (Abstraction Layer) คั่นกลางผ่านระบบ Mapping</div>
                <div style="display:flex;flex-direction:column;gap:6px;font-size:12.5px;color:#cbd5e1;">
                  <div style="background:rgba(16,185,129,0.1);padding:8px 12px;border-radius:6px;">External Views: โปรแกรมเห็นเฉพาะวิวข้อมูลตารางที่ตนเองต้องใช้</div>
                  <div style="text-align:center;color:#10b981;">🠗 Logical &amp; Physical Mapping 🠗</div>
                  <div style="background:#10221c;border:1px solid #10b981;padding:8px 12px;border-radius:6px;color:#6ee7b7;">DBMS จัดการดิสก์ให้: อัปเกรดเป็น NVMe หรือเปลี่ยน B-Tree ➔ <b>โปรแกรมไม่ต้องแก้โค้ดเลย!</b></div>
                </div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #15: CH1 TP MONITOR (Lecture 1 - Diagram 7)
    // =========================================================================
    if ((dId.includes('Lecture 1') && inDocIdx === 7) || (lower.includes('tp monitor') && lower.includes('transactions') && lower.includes('dbms1'))) {
      return {
        title: '🖧 สถาปัตยกรรมระบบประมวลผลธุรกรรมระดับองค์กร (Enterprise TPS & TP Monitor)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:1fr 50px 1.4fr 50px 1fr;gap:10px;align-items:center;">
              <div style="background:#131722;border:1.5px solid #4fd1e8;border-radius:10px;padding:16px;text-align:center;">
                <div style="font-size:24px;">📝</div>
                <div style="font-weight:700;color:#4fd1e8;font-size:14px;margin-top:4px;">Transactions</div>
                <div style="font-size:11.5px;color:#94a3b8;margin-top:4px;">คำร้องนับหมื่นรายการต่อวินาทีจาก ATM, Web, Mobile</div>
              </div>
              <div style="text-align:center;color:#4fd1e8;font-size:20px;">➔</div>
              <div style="background:#131722;border:2px solid #f59e0b;border-radius:12px;padding:18px;text-align:center;">
                <div style="font-size:26px;">🖧</div>
                <div style="font-weight:700;color:#fbbf24;font-size:15px;margin-top:4px;">TP Monitor (ตัวคุมทรานแซกชัน)</div>
                <div style="font-size:12px;color:#cbd5e1;margin-top:6px;line-height:1.5;">
                  • จัดการคิวงาน (Queue Management)<br/>
                  • กระจายโหลด (Load Balancing)<br/>
                  • ตรวจจับ Deadlock &amp; ความเสถียร
                </div>
              </div>
              <div style="text-align:center;color:#f59e0b;font-size:20px;">➔</div>
              <div style="display:flex;flex-direction:column;gap:8px;">
                <div style="background:#131722;border:1.5px solid #10b981;border-radius:8px;padding:10px;text-align:center;">
                  <div style="font-weight:700;color:#34d399;font-size:12.5px;">DBMS Cluster Node 1</div>
                  <div style="font-size:10.5px;color:#94a3b8;">Primary Database</div>
                </div>
                <div style="background:#131722;border:1.5px solid #10b981;border-radius:8px;padding:10px;text-align:center;">
                  <div style="font-weight:700;color:#34d399;font-size:12.5px;">DBMS Cluster Node 2</div>
                  <div style="font-size:10.5px;color:#94a3b8;">Replica / Standby</div>
                </div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #16: CH1 THEN VS NOW (Lecture 1 - Diagram 8)
    // =========================================================================
    if ((dId.includes('Lecture 1') && inDocIdx === 8) || (lower.includes('then (อดีต)') && lower.includes('now (ปัจจุบัน)'))) {
      return {
        title: '⏳ การเปลี่ยนผ่านของเทคโนโลยีฐานข้อมูล: อดีต (Then) ➔ ปัจจุบัน (Now)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:1fr 40px 1fr;gap:12px;align-items:center;">
              <div style="background:#131722;border:1px solid #64748b;border-radius:10px;padding:14px;">
                <div style="font-weight:700;color:#94a3b8;font-size:14px;margin-bottom:8px;">🕰️ ยุคอดีต (Then: Legacy Systems)</div>
                <div style="font-size:12.5px;color:#cbd5e1;line-height:1.7;">
                  1. มุมมองระดับต่ำ (Low-level view)<br/>
                  2. ข้อความและตัวเลขเท่านั้น (Alphanumeric only)<br/>
                  3. งานแบบแบทช์ออฟไลน์ (Off-line, Batch)<br/>
                  4. ทำงานทีละขั้นตอน (Sequential)<br/>
                  5. รวมศูนย์อยู่ที่เดียว (Centralized)<br/>
                  6. ระบบเดี่ยวไม่หลากหลาย (Homogeneous)<br/>
                  7. เฉพาะผู้เชี่ยวชาญเท่านั้นที่ใช้ได้ (Trained personnel)
                </div>
              </div>
              <div style="text-align:center;font-size:22px;color:#4fd1e8;">➔</div>
              <div style="background:#131722;border:1.5px solid #10b981;border-radius:10px;padding:14px;">
                <div style="font-weight:700;color:#34d399;font-size:14px;margin-bottom:8px;">⚡ ยุคปัจจุบัน (Now: Modern RDBMS &amp; Cloud)</div>
                <div style="font-size:12.5px;color:#e2e8f0;line-height:1.7;">
                  1. SQL &amp; Relational Model นามธรรมระดับสูง<br/>
                  2. มัลติมีเดีย, ภาพ, วิดีโอ, พิกัด JSON (Multimedia)<br/>
                  3. ออนไลน์ตอบสนองทันที (On-line, Real-time)<br/>
                  4. ทำงานพร้อมกันหลายคน (Concurrent Multi-user)<br/>
                  5. กระจายศูนย์ทั่วโลก (Distributed Cloud)<br/>
                  6. เชื่อมต่อระบบต่างชนิดได้ (Heterogeneous Hybrid)<br/>
                  7. ผู้ใช้งานทุกคนเข้าถึงได้ผ่านแอปและเว็บ (Universal Access)
                </div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #17: CH1 ROLES (Lecture 1 - Diagram 9)
    // =========================================================================
    if ((dId.includes('Lecture 1') && inDocIdx === 9) || (lower.includes('system analyst') && lower.includes('database designer') && lower.includes('app programmer'))) {
      return {
        title: '👥 วงจรชีวิตการพัฒนาระบบและ 5 บทบาทวิชาชีพด้านฐานข้อมูล (Database Engineering Roles)',
        html: `
          <div class="db-native-wrap">
            <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;">
              <div style="background:#131722;border:1px solid #4fd1e8;border-radius:8px;padding:12px 16px;min-width:180px;text-align:center;">
                <div style="font-size:20px;">👔</div>
                <div style="font-weight:700;color:#4fd1e8;font-size:13.5px;">System Analyst</div>
                <div style="font-size:11.5px;color:#94a3b8;margin-top:2px;">วิเคราะห์ Requirement</div>
              </div>
              <div style="display:flex;align-items:center;color:#4fd1e8;">➔</div>
              <div style="background:#131722;border:1px solid #b794f6;border-radius:8px;padding:12px 16px;min-width:180px;text-align:center;">
                <div style="font-size:20px;">📐</div>
                <div style="font-weight:700;color:#c084fc;font-size:13.5px;">Database Designer</div>
                <div style="font-size:11.5px;color:#94a3b8;margin-top:2px;">ออกแบบ ER &amp; Normalization</div>
              </div>
              <div style="display:flex;align-items:center;color:#b794f6;">➔</div>
              <div style="background:#131722;border:1px solid #10b981;border-radius:8px;padding:12px 16px;min-width:180px;text-align:center;">
                <div style="font-size:20px;">💻</div>
                <div style="font-weight:700;color:#34d399;font-size:13.5px;">App Programmer</div>
                <div style="font-size:11.5px;color:#94a3b8;margin-top:2px;">เขียนคำสั่ง SQL ในโค้ดแอป</div>
              </div>
              <div style="display:flex;align-items:center;color:#10b981;">➔</div>
              <div style="background:#131722;border:1px solid #f59e0b;border-radius:8px;padding:12px 16px;min-width:180px;text-align:center;">
                <div style="font-size:20px;">🔧</div>
                <div style="font-weight:700;color:#fbbf24;font-size:13.5px;">DB Administrator (DBA)</div>
                <div style="font-size:11.5px;color:#94a3b8;margin-top:2px;">จูนเนอร์ ปรับ Index &amp; Backup</div>
              </div>
              <div style="display:flex;align-items:center;color:#f59e0b;">➔</div>
              <div style="background:#131722;border:1px solid #f43f5e;border-radius:8px;padding:12px 16px;min-width:180px;text-align:center;">
                <div style="font-size:20px;">🖥️</div>
                <div style="font-weight:700;color:#f87171;font-size:13.5px;">System Admin</div>
                <div style="font-size:11.5px;color:#94a3b8;margin-top:2px;">ดูแล OS, Server &amp; Network</div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #18: CH2 ANSI/SPARC ARCHITECTURE (Lecture 2 - Diagram 1)
    // =========================================================================
    if ((dId.includes('Lecture 2') && inDocIdx === 1) || (lower.includes('external level') && lower.includes('conceptual schema') && lower.includes('internal schema'))) {
      return {
        title: '🏛️ สถาปัตยกรรม 3 ระดับของฐานข้อมูล ANSI/SPARC 3-Schema Architecture',
        html: `
          <div class="db-native-wrap">
            <div style="display:flex;flex-direction:column;gap:14px;">
              <!-- 1. External Level -->
              <div style="background:#131722;border:1.5px solid #4fd1e8;border-radius:12px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#4fd1e8;font-size:15px;margin-bottom:8px;">1. External Level (ระดับภายนอก / ผู้ใช้งาน)</div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;">
                  <div style="background:rgba(79,209,232,0.1);padding:10px;border-radius:8px;border:1px dashed #4fd1e8;font-size:12.5px;">
                    <b>External View 1 (ฝ่ายบุคคล)</b><br/>เห็นเฉพาะชื่อ, สังกัด, ตำแหน่ง
                  </div>
                  <div style="background:rgba(79,209,232,0.1);padding:10px;border-radius:8px;border:1px dashed #4fd1e8;font-size:12.5px;">
                    <b>External View 2 (ฝ่ายการเงิน)</b><br/>เห็นเฉพาะรหัสพนักงาน, เงินเดือน, ภาษี
                  </div>
                  <div style="background:rgba(79,209,232,0.1);padding:10px;border-radius:8px;border:1px dashed #4fd1e8;font-size:12.5px;">
                    <b>External View 3 (พนักงานทั่วไป)</b><br/>เห็นเฉพาะประวัติการเข้างานของตน
                  </div>
                </div>
              </div>

              <!-- Bridge 1: Logical Mapping -->
              <div style="text-align:center;font-size:12px;color:#fbbf24;font-weight:700;letter-spacing:0.5px;">
                🠗 LOGICAL DATA INDEPENDENCE MAPPING (ปรับปรุงตารางกลาง ไม่กระทบวิวด้านบน) 🠗
              </div>

              <!-- 2. Conceptual Level -->
              <div style="background:#131722;border:1.5px solid #f59e0b;border-radius:12px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#fbbf24;font-size:15px;margin-bottom:6px;">2. Conceptual Level (ระดับแนวคิดส่วนกลาง)</div>
                <div style="font-size:13px;color:#c7cad6;line-height:1.6;">
                  • <b>Conceptual Schema</b>: รวบรวมทุกฟิลด์ของทั้งองค์กรไว้ในตารางมาตรฐาน ไม่ขึ้นกับเทคโนโลยีฮาร์ดแวร์<br/>
                  • กำหนดความสัมพันธ์ระหว่างเอนทิตี (ER Model) และกฎบังคับ Integrity Constraints ครบถ้วน
                </div>
              </div>

              <!-- Bridge 2: Physical Mapping -->
              <div style="text-align:center;font-size:12px;color:#34d399;font-weight:700;letter-spacing:0.5px;">
                🠗 PHYSICAL DATA INDEPENDENCE MAPPING (เปลี่ยนวิธีเก็บดิสก์ ไม่กระทบตารางกลาง) 🠗
              </div>

              <!-- 3. Internal Level -->
              <div style="background:#131722;border:1.5px solid #10b981;border-radius:12px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#34d399;font-size:15px;margin-bottom:6px;">3. Internal Level (ระดับภายใน / กายภาพ)</div>
                <div style="font-size:13px;color:#c7cad6;line-height:1.6;">
                  • <b>Internal Schema</b>: การจัดโครงสร้างไฟล์ในดิสก์จริง เช่น B-Tree Index, Hashing, ขนาด Data Block<br/>
                  • ควบคุมการบีบอัดข้อมูล (Compression) และการจัดสรรลง NVMe SSD หรือ Hard Disk Drive
                </div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #19: CH3 RELATIONAL ALGEBRA & OPTIMIZER (Lecture 3 - Diagram 1)
    // =========================================================================
    if ((dId.includes('Lecture 3') && inDocIdx === 1) || (lower.includes('relational algebra<br>expression') && lower.includes('query optimizer') && lower.includes('executable code'))) {
      return {
        title: '🚀 ท่อประมวลผลและการเพิ่มประสิทธิภาพคิวรี (Relational Query Processing & Optimization Pipeline)',
        html: `
          <div class="db-native-wrap">
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div style="display:grid;grid-template-columns:130px 1fr;background:#131722;padding:12px 16px;border-radius:8px;border-left:4px solid #4fd1e8;align-items:center;">
                <span style="font-weight:700;color:#4fd1e8;">1. SQL Query</span>
                <span style="font-size:13px;color:#cbd5e1;">คำสั่งระดับสูงภาษา SQL ที่ผู้ใช้เขียนส่งเข้ามา</span>
              </div>
              <div style="display:grid;grid-template-columns:130px 1fr;background:#131722;padding:12px 16px;border-radius:8px;border-left:4px solid #38bdf8;align-items:center;">
                <span style="font-weight:700;color:#38bdf8;">2. Parser</span>
                <span style="font-size:13px;color:#cbd5e1;">ตรวจไวยากรณ์ (Syntax) และแปลเป็นต้นไม้ Relational Algebra Expression ตั้งต้น</span>
              </div>
              <div style="display:grid;grid-template-columns:130px 1fr;background:#131722;padding:12px 16px;border-radius:8px;border-left:4px solid #f59e0b;align-items:center;">
                <span style="font-weight:700;color:#fbbf24;">3. Query Optimizer</span>
                <span style="font-size:13px;color:#cbd5e1;"><b>หัวใจสำคัญ:</b> สลับตำแหน่ง Push Select (σ) ลงไปทำก่อน Join และจัดลำดับการ Join ให้เปลืองทรัพยากรน้อยที่สุด</span>
              </div>
              <div style="display:grid;grid-template-columns:130px 1fr;background:#131722;padding:12px 16px;border-radius:8px;border-left:4px solid #b794f6;align-items:center;">
                <span style="font-weight:700;color:#c084fc;">4. Code Generator</span>
                <span style="font-size:13px;color:#cbd5e1;">แปลงแผนคำนวณที่เหมาะสมแล้วให้กลายเป็น Executable Code / Execution Plan</span>
              </div>
              <div style="display:grid;grid-template-columns:130px 1fr;background:#131722;padding:12px 16px;border-radius:8px;border-left:4px solid #10b981;align-items:center;">
                <span style="font-weight:700;color:#34d399;">5. DBMS Execution</span>
                <span style="font-size:13px;color:#cbd5e1;">รันคำสั่งจริงบนพื้นที่ดิสก์และส่งผลลัพธ์กลับสู่หน้าจอผู้ใช้</span>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #20: CH4 BANKING ER MODEL (Lecture 4 - Diagram 1)
    // =========================================================================
    if ((dId.includes('Lecture 4') && inDocIdx === 1) || (lower.includes('bank_branch') && lower.includes('acctno pk') && lower.includes('ssn pk'))) {
      return {
        title: '🏦 แผนภาพสถาปัตยกรรม ER เชิงองค์กร: ระบบธนาคาร บัญชี สาขา และสินเชื่อ (Banking Enterprise ER Architecture)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;">
              <div class="db-entity-card">
                <div class="db-entity-header">🏛️ BANK <span class="db-entity-tag">Parent</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>Code</b> <span class="db-data-type">CHAR</span></div>
                  <div class="db-attr-row">Name <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">Addr <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <div class="db-entity-card" style="border-color:#ef4444;">
                <div class="db-entity-header" style="background:rgba(239,68,68,0.15);color:#f87171;">🏢 BANK_BRANCH <span class="db-entity-tag" style="background:#ef4444;color:#fff;">Weak Entity</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">Partial PK</span> <b>BranchNo</b></div>
                  <div class="db-attr-row">Addr <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row" style="color:#fca5a5;font-size:11px;">(อาศัย Code ของ Bank เป็นส่วนหนึ่งของ PK)</div>
                </div>
              </div>

              <div class="db-entity-card">
                <div class="db-entity-header">💳 ACCOUNT <span class="db-entity-tag">Entity</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>AcctNo</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">Balance <span class="db-data-type">FLOAT</span></div>
                  <div class="db-attr-row">Type <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <div class="db-entity-card">
                <div class="db-entity-header">💰 LOAN <span class="db-entity-tag">Entity</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>LoanNo</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">Amount <span class="db-data-type">FLOAT</span></div>
                  <div class="db-attr-row">Type <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <div class="db-entity-card" style="border-color:#10b981;">
                <div class="db-entity-header" style="background:rgba(16,185,129,0.15);color:#34d399;">👤 CUSTOMER <span class="db-entity-tag" style="background:#10b981;color:#0f172a;">Entity</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>SSN</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">Name <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">Addr <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">Phone <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>
            </div>
            <div class="db-tree-footer">
              <span class="db-tree-chip">🔗 ความสัมพันธ์: BANK (1) ➔ (N) BRANCH | BRANCH (1) ➔ (N) ACCT &amp; LOAN | CUSTOMER (M) ➔ (N) ACCT &amp; LOAN</span>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #21: CH5 S-SP-P FDS (Lecture 5 - Diagram 1)
    // =========================================================================
    if ((dId.includes('Lecture 5') && inDocIdx === 1) || (lower.includes('relation s') && lower.includes('relation sp') && lower.includes('relation p'))) {
      return {
        title: '🔗 แบบจำลองความสัมพันธ์ของ Functional Dependencies ตระกูล Suppliers-Parts (S-SP-P)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:1fr 1.2fr 1fr;gap:14px;align-items:center;">
              <div class="db-entity-card" style="border-color:#4fd1e8;">
                <div class="db-entity-header" style="color:#4fd1e8;">Relation S (ผู้ผลิต)</div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>S#</b> (รหัสผู้ผลิต)</div>
                  <div style="padding:6px 8px;font-size:12px;color:#c7cad6;">
                    ➔ SNAME<br/>➔ STATUS<br/>➔ CITY
                  </div>
                </div>
              </div>

              <div class="db-entity-card" style="border-color:#f59e0b;background:#181c2b;">
                <div class="db-entity-header" style="background:rgba(245,158,11,0.15);color:#fbbf24;">Relation SP (การจัดส่งชิ้นส่วน)</div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">Composite PK</span> <b>(S#, P#)</b></div>
                  <div style="padding:10px 8px;font-size:12.5px;color:#fde68a;">
                    <b>Composite Determinant:</b><br/>
                    <code>(S#, P#) ➔ QTY</code><br/>
                    <span style="font-size:11px;color:#cbd5e1;">(จำนวนชิ้นส่วนที่ส่ง ต้องรู้ทั้งรหัสผู้ส่งและรหัสของ)</span>
                  </div>
                </div>
              </div>

              <div class="db-entity-card" style="border-color:#10b981;">
                <div class="db-entity-header" style="color:#34d399;">Relation P (ชิ้นส่วนสินค้า)</div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>P#</b> (รหัสชิ้นส่วน)</div>
                  <div style="padding:6px 8px;font-size:12px;color:#c7cad6;">
                    ➔ PNAME<br/>➔ COLOR<br/>➔ WEIGHT<br/>➔ CITY
                  </div>
                </div>
              </div>
            </div>
            <div class="db-tree-footer">
              <span class="db-tree-chip">💡 หัวใจข้อสอบ: Relation SP อยู่ใน 2NF แล้วเพราะไม่มี Partial Dependency เนื่องจาก QTY ขึ้นต่อทั้งคีย์คู่ (S#, P#)</span>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #22: CH8 ROADMAP MINDMAP (Lecture 8 - Diagram 1)
    // =========================================================================
    if ((dId.includes('Lecture 8') && inDocIdx === 1) || (lower.includes('lecture 8: database system architecture') && lower.includes('concurrency control'))) {
      return {
        title: '🗺️ แผนผังสถาปัตยกรรมระบบฐานข้อมูลและการจัดการทรานแซกชัน (Ch8 Master Architecture Roadmap)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:16px;">
              <div style="background:#131722;border:1.5px solid #4fd1e8;border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#4fd1e8;font-size:15px;margin-bottom:8px;">1. Transaction Processing</div>
                <div style="font-size:13px;color:#c7cad6;line-height:1.6;">
                  • <b>ACID Properties</b>: Atomicity, Consistency, Isolation, Durability<br/>
                  • <b>สถานะธุรกรรม</b>: Active, Committed, Failed, Terminated<br/>
                  • <b>ผลลัพธ์</b>: Successful vs Unsuccessful Rollback
                </div>
              </div>

              <div style="background:#131722;border:1.5px solid #f59e0b;border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#f59e0b;font-size:15px;margin-bottom:8px;">2. Database Recovery</div>
                <div style="font-size:13px;color:#c7cad6;line-height:1.6;">
                  • <b>Crash Failures</b>: Soft Crash (ไฟดับ) vs Hard Crash (ดิสก์พัง)<br/>
                  • <b>Log File &amp; Checkpoint</b>: Write-Ahead Logging (WAL)<br/>
                  • <b>ขั้นตอน UNDO / REDO</b>: วิเคราะห์จากจุด Checkpoint ล่าสุด<br/>
                  • <b>Two-Phase Commit (2PC)</b>: ระบบฐานข้อมูลแบบกระจายศูนย์
                </div>
              </div>

              <div style="background:#131722;border:1.5px solid #10b981;border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#10b981;font-size:15px;margin-bottom:8px;">3. Concurrency Control</div>
                <div style="font-size:13px;color:#c7cad6;line-height:1.6;">
                  • <b>3 ปัญหาการทำงานพร้อมกัน</b>: Lost Update, Dirty Read, Inconsistent Analysis<br/>
                  • <b>Locking Protocols</b>: Shared Lock (S) vs Exclusive Lock (X)<br/>
                  • <b>Strict 2PL</b>: Growing Phase &amp; Shrinking Phase
                </div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #23: CH8 SUCCESSFUL TX (Lecture 8 - Diagram 2)
    // =========================================================================
    if ((dId.includes('Lecture 8') && inDocIdx === 2) || (lower.includes('saving := saving - 50,000') && lower.includes('checking := checking + 50,000'))) {
      return {
        title: '💸 วงจรธุรกรรมการโอนเงินที่สมบูรณ์ 100% (Successful Banking Transaction Lifecycle)',
        html: `
          <div class="db-native-wrap">
            <div style="display:flex;flex-direction:column;gap:8px;">
              <div style="display:grid;grid-template-columns:80px 1fr 140px;align-items:center;background:#131722;padding:10px 16px;border-radius:8px;border-left:4px solid #4fd1e8;">
                <span style="font-family:'JetBrains Mono',monospace;color:#4fd1e8;font-weight:700;">READ(S)</span>
                <span style="font-size:13px;color:#e2e8f0;">โหลดเงินบัญชีออมทรัพย์ 400,000 บาท จาก Disk เข้าตัวแปรใน RAM</span>
                <span style="font-size:11.5px;color:#94a3b8;text-align:right;">RAM = 400,000</span>
              </div>
              <div style="display:grid;grid-template-columns:80px 1fr 140px;align-items:center;background:#131722;padding:10px 16px;border-radius:8px;border-left:4px solid #f59e0b;">
                <span style="font-family:'JetBrains Mono',monospace;color:#f59e0b;font-weight:700;">CALC</span>
                <span style="font-size:13px;color:#e2e8f0;">หักเงิน 50,000 บาท: <code>Saving = 400,000 - 50,000</code></span>
                <span style="font-size:11.5px;color:#fbbf24;text-align:right;">RAM = 350,000</span>
              </div>
              <div style="display:grid;grid-template-columns:80px 1fr 140px;align-items:center;background:#131722;padding:10px 16px;border-radius:8px;border-left:4px solid #4fd1e8;">
                <span style="font-family:'JetBrains Mono',monospace;color:#4fd1e8;font-weight:700;">WRITE(S)</span>
                <span style="font-size:13px;color:#e2e8f0;">บันทึกยอดเงิน 350,000 บาท กลับลงตาราง Savings บนดิสก์</span>
                <span style="font-size:11.5px;color:#38bdf8;text-align:right;">Disk = 350,000</span>
              </div>
              <div style="display:grid;grid-template-columns:80px 1fr 140px;align-items:center;background:#131722;padding:10px 16px;border-radius:8px;border-left:4px solid #10b981;">
                <span style="font-family:'JetBrains Mono',monospace;color:#10b981;font-weight:700;">READ(C)</span>
                <span style="font-size:13px;color:#e2e8f0;">โหลดเงินบัญชีกระแสรายวัน 10,000 บาท เข้า RAM</span>
                <span style="font-size:11.5px;color:#94a3b8;text-align:right;">RAM = 10,000</span>
              </div>
              <div style="display:grid;grid-template-columns:80px 1fr 140px;align-items:center;background:#131722;padding:10px 16px;border-radius:8px;border-left:4px solid #f59e0b;">
                <span style="font-family:'JetBrains Mono',monospace;color:#f59e0b;font-weight:700;">CALC</span>
                <span style="font-size:13px;color:#e2e8f0;">บวกเงินเข้า 50,000 บาท: <code>Checking = 10,000 + 50,000</code></span>
                <span style="font-size:11.5px;color:#fbbf24;text-align:right;">RAM = 60,000</span>
              </div>
              <div style="display:grid;grid-template-columns:80px 1fr 140px;align-items:center;background:#131722;padding:10px 16px;border-radius:8px;border-left:4px solid #10b981;">
                <span style="font-family:'JetBrains Mono',monospace;color:#10b981;font-weight:700;">WRITE(C)</span>
                <span style="font-size:13px;color:#e2e8f0;">บันทึกยอดเงิน 60,000 บาท ลงตาราง Checking บนดิสก์</span>
                <span style="font-size:11.5px;color:#34d399;text-align:right;">Disk = 60,000</span>
              </div>
              <div style="display:grid;grid-template-columns:80px 1fr 140px;align-items:center;background:#131722;padding:10px 16px;border-radius:8px;border-left:4px solid #34d399;">
                <span style="font-family:'JetBrains Mono',monospace;color:#34d399;font-weight:700;">COMMIT</span>
                <span style="font-size:13px;color:#34d399;font-weight:600;">บันทึกลง Log File ถาวร (Durability) ธุรกรรมเสร็จสมบูรณ์ 100%</span>
                <span style="font-size:11.5px;color:#34d399;font-weight:700;text-align:right;">✓ SUCCESSFUL</span>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #24: CH8 CRASH & ROLLBACK (Lecture 8 - Diagram 3)
    // =========================================================================
    if ((dId.includes('Lecture 8') && inDocIdx === 3) || (lower.includes('เกิดไฟฟ้าดับกะทันหัน') && lower.includes('saving ถูกย้อนกลับเป็น 400,000'))) {
      return {
        title: '⚡ ภาวะไฟฟ้าดับกะทันหันกลางคัน: การกู้คืนด้วย WAL Log และ ROLLBACK (Atomicity Guarantee)',
        html: `
          <div class="db-native-wrap">
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div style="background:#131722;border:1.5px solid #f59e0b;padding:14px;border-radius:10px;">
                <div style="font-weight:700;color:#fbbf24;font-size:14px;">1. ดำเนินการไปแล้วบางส่วน</div>
                <div style="font-size:12.5px;color:#cbd5e1;margin-top:4px;">
                  • หักเงิน Savings สำเร็จแล้วเหลือ 350,000 บาท<br/>
                  • แต่ <b>ยังไม่ได้บวกเงินเข้าบัญชีปลายทาง Checking</b> และยังไม่เจอคำสั่ง COMMIT!
                </div>
              </div>

              <div style="background:rgba(239,68,68,0.15);border:2px dashed #ef4444;padding:14px;border-radius:10px;text-align:center;">
                <div style="font-size:22px;color:#f87171;">⚡ เกิดไฟฟ้าดับกะทันหัน! (System Soft Crash)</div>
                <div style="font-size:12.5px;color:#fca5a5;margin-top:4px;">ข้อมูลใน RAM หายวับทันที! หากปล่อยไว้ยอดเงิน 50,000 จะหายสาบสูญไปในอากาศ</div>
              </div>

              <div style="background:#131722;border:1.5px solid #10b981;padding:14px;border-radius:10px;">
                <div style="font-weight:700;color:#34d399;font-size:14px;">2. ระบบบูทใหม่ (DBMS Restart &amp; Recovery)</div>
                <div style="font-size:12.5px;color:#cbd5e1;margin-top:4px;">
                  • DBMS ตรวจสอบ Log File พบว่ามี BEGIN แต่ไม่มี COMMIT<br/>
                  • สั่งการ <b>ABORT</b> และเริ่มปฏิบัติการ <b>ROLLBACK</b> ทันที<br/>
                  • คืนค่ายอดเงิน Savings กลับเป็น 400,000 บาทเหมือนเดิม รับประกันคุณสมบัติ <b>Atomicity (All or Nothing)</b>
                </div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #25: CH8 ACID PROPERTIES (Lecture 8 - Diagram 4)
    // =========================================================================
    if ((dId.includes('Lecture 8') && inDocIdx === 4) || (lower.includes('acid_properties') && lower.includes('atomicity') && lower.includes('durability'))) {
      return {
        title: '🛡️ คุณสมบัติ 4 ประการแห่งความน่าเชื่อถือของฐานข้อมูล (ACID Properties Architecture)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;">
              <div style="background:#131722;border:1.5px solid #4fd1e8;border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#4fd1e8;font-size:16px;">A — Atomicity</div>
                <div style="font-size:12px;color:#38bdf8;font-weight:600;margin:3px 0 6px;">ความเป็นอะตอม (All or Nothing)</div>
                <p style="font-size:12.5px;color:#c7cad6;margin:0;">ต้องทำสำเร็จครบทุกขั้นตอน หรือหากเกิดความผิดพลาดเพียงข้อเดียว ต้องถูกยกเลิก (Rollback) ย้อนกลับเหมือนไม่เคยเกิดขึ้น</p>
              </div>

              <div style="background:#131722;border:1.5px solid #10b981;border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#10b981;font-size:16px;">C — Consistency</div>
                <div style="font-size:12px;color:#34d399;font-weight:600;margin:3px 0 6px;">ความสอดคล้องถูกต้อง</div>
                <p style="font-size:12.5px;color:#c7cad6;margin:0;">ข้อมูลต้องถูกต้องตามกฎเกณฑ์ทางธุรกิจและข้อกำหนดความสมบูรณ์ เช่น ผลรวมเงินต้นทางและปลายทางก่อนโอนกับหลังโอนต้องเท่าเดิม</p>
              </div>

              <div style="background:#131722;border:1.5px solid #f59e0b;border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#f59e0b;font-size:16px;">I — Isolation</div>
                <div style="font-size:12px;color:#fbbf24;font-weight:600;margin:3px 0 6px;">ความโดดเดี่ยวไม่กวนกัน</div>
                <p style="font-size:12.5px;color:#c7cad6;margin:0;">เมื่อมีหลายธุรกรรมทำงานคู่ขนานกัน ผลลัพธ์ต้องเหมือนรันทีละธุรกรรมเรียงลำดับ ป้องกันการอ่านข้อมูลที่ยังไม่ยืนยัน</p>
              </div>

              <div style="background:#131722;border:1.5px solid #b794f6;border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#b794f6;font-size:16px;">D — Durability</div>
                <div style="font-size:12px;color:#c084fc;font-weight:600;margin:3px 0 6px;">ความคงทนถาวร</div>
                <p style="font-size:12.5px;color:#c7cad6;margin:0;">เมื่อมีคำสั่ง COMMIT สมบูรณ์แล้ว ข้อมูลจะถูกบันทึกลงสู่ฮาร์ดดิสก์อย่างถาวร แม้ไฟดับหรือเซิร์ฟเวอร์ระเบิดหลังจากนั้นข้อมูลก็ไม่สูญหาย</p>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #26: CH8 STATE MACHINE (Lecture 8 - Diagram 5)
    // =========================================================================
    if ((dId.includes('Lecture 8') && inDocIdx === 5) || (lower.includes('partially_committed') && lower.includes('active --> failed'))) {
      return {
        title: '🔄 แผนภาพสถานะการทำงานของทรานแซกชัน (Transaction Lifecycle State Machine)',
        html: `
          <div class="db-native-wrap">
            <div style="display:flex;flex-direction:column;gap:14px;align-items:center;">
              <div style="display:flex;align-items:center;gap:12px;width:100%;justify-content:center;">
                <div class="db-state-node" style="border-color:#4fd1e8;color:#4fd1e8;">ACTIVE<br/><span style="font-size:10px;color:#94a3b8;">(กำลังรัน Read/Write)</span></div>
                <span style="color:#4fd1e8;font-size:20px;">➔</span>
                <div class="db-state-node" style="border-color:#f59e0b;color:#fbbf24;">PARTIALLY COMMITTED<br/><span style="font-size:10px;color:#94a3b8;">(คำสั่งครบ รอเขียน Log)</span></div>
                <span style="color:#10b981;font-size:20px;">➔</span>
                <div class="db-state-node" style="border-color:#10b981;color:#34d399;">COMMITTED<br/><span style="font-size:10px;color:#94a3b8;">(เขียนดิสก์ถาวร)</span></div>
                <span style="color:#10b981;font-size:20px;">➔</span>
                <div class="db-state-node" style="border-color:#6ee7b7;background:rgba(16,185,129,0.15);color:#fff;">TERMINATED (SUCCESS)</div>
              </div>

              <div style="display:flex;align-items:center;gap:12px;width:100%;justify-content:center;">
                <div style="font-size:12px;color:#f87171;text-align:center;">หากเกิดข้อผิดพลาด / ไฟดับ 🠗 (ABORT)</div>
              </div>

              <div style="display:flex;align-items:center;gap:12px;width:100%;justify-content:center;">
                <div class="db-state-node" style="border-color:#ef4444;color:#f87171;background:rgba(239,68,68,0.1);">FAILED<br/><span style="font-size:10px;color:#fca5a5;">(ล้มเหลว)</span></div>
                <span style="color:#ef4444;font-size:20px;">➔</span>
                <div style="font-size:12px;color:#fca5a5;padding:6px 12px;background:#181a26;border-radius:6px;border:1px dashed #ef4444;">สั่งการ ROLLBACK ย้อนข้อมูลคืนสภาพเดิม</div>
                <span style="color:#ef4444;font-size:20px;">➔</span>
                <div class="db-state-node" style="border-color:#94a3b8;color:#cbd5e1;">TERMINATED (ABORTED)</div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #27: CH8 GANTT CONCURRENCY (Lecture 8 - Diagram 6)
    // =========================================================================
    if ((dId.includes('Lecture 8') && inDocIdx === 6) || (lower.includes('การทำงานของชุดทรานแซกชันในระบบ') || (lower.includes('begin to commit (successful)') && lower.includes('rollback & abort')))) {
      return {
        title: '⏱️ เส้นเวลาการทำงานคู่ขนานของชุดทรานแซกชันในระบบ (Concurrent Interleaving Timeline)',
        html: `
          <div class="db-native-wrap">
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div style="background:#131722;padding:12px 16px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);">
                <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                  <span style="font-weight:700;color:#34d399;">Transaction 1 (สำเร็จ)</span>
                  <span style="font-size:11.5px;color:#94a3b8;font-family:'JetBrains Mono',monospace;">0s ➔ 5s (COMMIT)</span>
                </div>
                <div style="height:20px;background:#1e293b;border-radius:4px;overflow:hidden;position:relative;">
                  <div style="position:absolute;left:0%;width:55%;height:100%;background:linear-gradient(90deg, #10b981, #059669);border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10.5px;font-weight:700;">ACTIVE ➔ COMMIT</div>
                </div>
              </div>

              <div style="background:#131722;padding:12px 16px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);">
                <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                  <span style="font-weight:700;color:#f87171;">Transaction 2 (ล้มเหลว &amp; Rollback)</span>
                  <span style="font-size:11.5px;color:#94a3b8;font-family:'JetBrains Mono',monospace;">3s ➔ 7s (Crash) ➔ 9s (Rollback)</span>
                </div>
                <div style="height:20px;background:#1e293b;border-radius:4px;overflow:hidden;position:relative;">
                  <div style="position:absolute;left:33%;width:44%;height:100%;background:linear-gradient(90deg, #f59e0b, #ef4444);border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10.5px;font-weight:700;">FAIL ➔ ROLLBACK</div>
                </div>
              </div>

              <div style="background:#131722;padding:12px 16px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);">
                <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                  <span style="font-weight:700;color:#38bdf8;">Transaction 3 (ทำงานคู่ขนานสำเร็จ)</span>
                  <span style="font-size:11.5px;color:#94a3b8;font-family:'JetBrains Mono',monospace;">3s ➔ 6s (COMMIT)</span>
                </div>
                <div style="height:20px;background:#1e293b;border-radius:4px;overflow:hidden;position:relative;">
                  <div style="position:absolute;left:33%;width:33%;height:100%;background:linear-gradient(90deg, #3b82f6, #06b6d4);border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10.5px;font-weight:700;">CONCURRENT COMMIT</div>
                </div>
              </div>
            </div>
            <div class="db-tree-footer">
              <span class="db-tree-chip">📌 ในระบบที่มีหลายผู้ใช้ ทรานแซกชันจะแทรกสลับเวลากันทำงาน (Interleaved Execution) ซึ่งต้องควบคุมการล็อกเพื่อไม่ให้กวนข้อมูลกัน</span>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #28: CH8 CHECKPOINT RECOVERY (Lecture 8 - Diagram 7)
    // =========================================================================
    if ((dId.includes('Lecture 8') && inDocIdx === 7) || (lower.includes('readcheckpoint') && lower.includes('undo list') && lower.includes('redo list'))) {
      return {
        title: '🔄 อัลกอริทึมการฟื้นฟูระบบฐานข้อมูลด้วย Checkpoint (UNDO / REDO Recovery Engine)',
        html: `
          <div class="db-native-wrap">
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div style="display:grid;grid-template-columns:140px 1fr;background:#131722;padding:12px 16px;border-radius:8px;border-left:4px solid #4fd1e8;align-items:center;">
                <span style="font-weight:700;color:#4fd1e8;">1. ค้นหา Checkpoint</span>
                <span style="font-size:13px;color:#cbd5e1;">เปิด Log File สแกนย้อนหลังเพื่อหาจุด Checkpoint ล่าสุด (tc)</span>
              </div>
              <div style="display:grid;grid-template-columns:140px 1fr;background:#131722;padding:12px 16px;border-radius:8px;border-left:4px solid #f59e0b;align-items:center;">
                <span style="font-weight:700;color:#fbbf24;">2. ตั้งต้น UNDO List</span>
                <span style="font-size:13px;color:#cbd5e1;">นำทรานแซกชันที่ยังค้างคา ณ จุด Checkpoint ใส่เข้า <b>UNDO List</b> ไว้ก่อน</span>
              </div>
              <div style="display:grid;grid-template-columns:140px 1fr;background:#131722;padding:12px 16px;border-radius:8px;border-left:4px solid #b794f6;align-items:center;">
                <span style="font-weight:700;color:#c084fc;">3. สแกนเดินหน้า (tf)</span>
                <span style="font-size:13px;color:#cbd5e1;">สแกนจาก Checkpoint ไปจนถึงจุดไฟดับ: เจอ <code>BEGIN</code> ให้ยัดใส่ UNDO | เจอ <code>COMMIT</code> ให้ย้ายข้ามไปอยู่ <b>REDO List</b></span>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:4px;">
                <div style="background:#131722;border:1.5px solid #10b981;border-radius:8px;padding:14px;">
                  <div style="font-weight:700;color:#34d399;font-size:14px;margin-bottom:4px;">⚡ REDO Action</div>
                  <div style="font-size:12px;color:#cbd5e1;">เขียนข้อมูลทับลงดิสก์ซ้ำอีกครั้งตามค่าใน Log File เพื่อรับประกัน <b>Durability</b></div>
                </div>
                <div style="background:#131722;border:1.5px solid #ef4444;border-radius:8px;padding:14px;">
                  <div style="font-weight:700;color:#f87171;font-size:14px;margin-bottom:4px;">🔄 UNDO Action</div>
                  <div style="font-size:12px;color:#cbd5e1;">สั่งการ Rollback คืนค่าเดิมทั้งหมดก่อนเริ่มทรานแซกชัน เพื่อรับประกัน <b>Atomicity</b></div>
                </div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #29: CH8 TWO-PHASE COMMIT 2PC (Lecture 8 - Diagram 8)
    // =========================================================================
    if ((dId.includes('Lecture 8') && inDocIdx === 8) || (lower.includes('prepare phase (ระยะเตรียมตัว)') && lower.includes('commit phase (ระยะตัดสินใจ)'))) {
      return {
        title: '🌐 โพรโทคอลฉันทามติแบบ 2 เฟสสำหรับฐานข้อมูลกระจายศูนย์ (Two-Phase Commit: 2PC Protocol)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div style="background:#131722;border:1.5px solid #4fd1e8;border-radius:12px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#4fd1e8;font-size:15px;margin-bottom:8px;">เฟสที่ 1: Prepare Phase (ระยะโหวตเตรียมพร้อม)</div>
                <div style="font-size:12.5px;color:#cbd5e1;line-height:1.6;">
                  1. <b>Coordinator</b> ส่งสัญญาณถามทุก Node: <i>"คุณพร้อมบันทึกคำสั่งซื้อและตัดเงินไหม?"</i><br/>
                  2. <b>Node 1 (Order Node)</b>: ล็อกข้อมูลและตอบกลับ <code>"YES (พร้อม)"</code><br/>
                  3. <b>Node 2 (Wallet Node)</b>: ล็อกยอดเงินและตอบกลับ <code>"YES (พร้อม)"</code><br/>
                  <span style="color:#38bdf8;font-size:11.5px;">(หากมีแม้แต่โหนดเดียวตอบ NO หรือ Timeout ทั้งระบบจะ ABORT ทันที)</span>
                </div>
              </div>

              <div style="background:#131722;border:1.5px solid #10b981;border-radius:12px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#34d399;font-size:15px;margin-bottom:8px;">เฟสที่ 2: Commit Phase (ระยะสั่งการเด็ดขาด)</div>
                <div style="font-size:12.5px;color:#cbd5e1;line-height:1.6;">
                  1. <b>Coordinator</b> ตรวจสอบพบว่าทุกโหนดตอบ YES ครบถ้วน<br/>
                  2. ส่งคำสั่งเด็ดขาด: <i>"จงบันทึก COMMIT ลงดิสก์เดี๋ยวนี้!"</i><br/>
                  3. ทั้งสองโหนดบันทึกลงดิสก์ถาวร ปลดล็อกทรัพยากร และตอบ <b>ACK</b> กลับ<br/>
                  <span style="color:#34d399;font-size:11.5px;">✓ การสั่งซื้อและตัดเงินเสร็จสมบูรณ์ 100% สอดคล้องตรงกันข้ามระบบ</span>
                </div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #30: CH8 CONCURRENCY LOCKING (Lecture 8 - Diagram 9)
    // =========================================================================
    if ((dId.includes('Lecture 8') && inDocIdx === 9) || (lower.includes('สาขา chicago') && lower.includes('สาขา boston') && lower.includes('request lock (db)'))) {
      return {
        title: '🔒 การประสานงานการล็อกเพื่อป้องกัน Lost Update: กรณีศึกษาคลังสินค้า Chicago vs Boston',
        html: `
          <div class="db-native-wrap">
            <div style="display:flex;flex-direction:column;gap:8px;">
              <div style="background:#131722;padding:10px 14px;border-radius:8px;border-left:4px solid #4fd1e8;font-size:13px;color:#e2e8f0;">
                <b>1. Chicago ขอครองกุญแจ:</b> Chicago ขอ <code>LOCK(DB)</code> ➔ Lock Manager อนุมัติ Chicago ได้กุญแจคลังสินค้า
              </div>
              <div style="background:#131722;padding:10px 14px;border-radius:8px;border-left:4px solid #4fd1e8;font-size:13px;color:#e2e8f0;">
                <b>2. Chicago อ่านและคำนวณ:</b> อ่านค่า 200 เล่ม ➔ ซื้อ 70 เล่ม เหลือ 130 เล่มใน Memory
              </div>
              <div style="background:rgba(245,158,11,0.1);padding:10px 14px;border-radius:8px;border-left:4px solid #f59e0b;font-size:13px;color:#fde68a;">
                <b>3. Boston มาแทรก:</b> Boston ขอ <code>LOCK(DB)</code> ➔ <b>ถูกปฏิเสธ (BLOCKED)!</b> Lock Manager บังคับให้ Boston รอในคิว
              </div>
              <div style="background:#131722;padding:10px 14px;border-radius:8px;border-left:4px solid #4fd1e8;font-size:13px;color:#e2e8f0;">
                <b>4. Chicago บันทึกและปล่อยกุญแจ:</b> เขียน 130 เล่มลงดิสก์ ➔ ส่งคำสั่ง <code>UNLOCK(DB)</code>
              </div>
              <div style="background:#131722;padding:10px 14px;border-radius:8px;border-left:4px solid #10b981;font-size:13px;color:#e2e8f0;">
                <b>5. Boston ได้รับกุญแจ:</b> Lock Manager ปลุก Boston ➔ Boston อ่านค่าได้ 130 เล่ม (ยอดถูกต้อง ไม่ถูกทับ!)
              </div>
              <div style="background:#131722;padding:10px 14px;border-radius:8px;border-left:4px solid #10b981;font-size:13px;color:#34d399;font-weight:600;">
                <b>6. Boston บันทึกยอดสุดท้าย:</b> ซื้อ 60 เล่ม ➔ เขียน 70 เล่มลงดิสก์ ➔ ปลดล็อก ➔ ยอดสุดท้ายในคลังเหลือ 70 เล่มถูกต้องสมบูรณ์
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #31: CH8 EARLY UNLOCK BUG (Lecture 8 - Diagram 10)
    // =========================================================================
    if ((dId.includes('Lecture 8') && inDocIdx === 10) || (lower.includes('t1_operations') && lower.includes('รีบปล่อยเร็ว') && lower.includes('t2_operations'))) {
      return {
        title: '⚠️ กับดักของการรีบปลดล็อกเร็วเกินไป (Inconsistent Analysis Hazard without 2PL)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div style="background:#131722;border:1.5px solid #ef4444;border-radius:10px;padding:16px;">
                <div style="font-weight:700;color:#f87171;font-size:14px;margin-bottom:6px;">Transaction 1 (รีบปลดล็อกก่อนเสร็จ)</div>
                <div style="font-size:12.5px;color:#cbd5e1;line-height:1.6;">
                  1. LOCK-S(D2) และอ่านค่า D2 (=150)<br/>
                  2. <b>รีบ UNLOCK(D2) ปล่อยกุญแจเร็วเกินไป!</b><br/>
                  3. ขอ LOCK-X(D1) เพื่อบวกค่า D1 := 100 + 150 = 250<br/>
                  4. บันทึก WRITE(D1)<br/>
                  <span style="color:#fca5a5;">(ช่องว่างระหว่างขั้นตอนที่ 2 และ 3 เปิดโอกาสให้ T2 เข้ามาแทรก!)</span>
                </div>
              </div>

              <div style="background:#131722;border:1.5px solid #f59e0b;border-radius:10px;padding:16px;">
                <div style="font-weight:700;color:#fbbf24;font-size:14px;margin-bottom:6px;">Transaction 2 (เข้ามาแทรกกลางคัน)</div>
                <div style="font-size:12.5px;color:#cbd5e1;line-height:1.6;">
                  1. อ่าน D1 (=100) ก่อนที่ T1 จะอัปเดตเสร็จ<br/>
                  2. รีบนำค่าไปคำนวณและเขียนทับ D2<br/>
                  3. ผลรวมยอดเงินในระบบกลายเป็นตัวเลขที่ไม่ตรงกับโลกจริง<br/>
                  <span style="color:#fbbf24;font-weight:700;">เกิดปัญหา Inconsistent Analysis ทันที</span>
                </div>
              </div>
            </div>
            <div class="db-tree-footer">
              <span class="db-tree-chip">🚨 ข้อสรุปวิชาการ: การปลดล็อกเร็วเกินไปทำให้เสียความเป็น Serializability จึงเป็นที่มาของกฎเหล็ก Two-Phase Locking (2PL)</span>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #32: CH8 STRICT 2PL (Lecture 8 - Diagram 11)
    // =========================================================================
    if ((dId.includes('Lecture 8') && inDocIdx === 11) || (lower.includes('t1 (chicago - 70 copies)') && lower.includes('t2 (boston - 60 copies)') && lower.includes('strict 2pl'))) {
      return {
        title: '🛡️ โพรโทคอลการล็อกแบบ 2 เฟสอย่างเข้มงวด (Strict Two-Phase Locking: Strict 2PL Protocol)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
              <div style="background:#131722;border:1.5px solid #4fd1e8;border-radius:12px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#4fd1e8;font-size:15px;margin-bottom:8px;">1. Phase 1: Growing Phase (ช่วงขอถือครองกุญแจ)</div>
                <div style="font-size:13px;color:#c7cad6;line-height:1.6;">
                  • ทรานแซกชันสามารถ <b>ขอรับสิทธิ์ล็อกเพิ่มได้เรื่อยๆ</b> (Acquire Locks)<br/>
                  • แต่ <b>ห้ามสั่งปลดล็อกเด็ดขาด</b> จนกว่าจะประมวลผลงานเสร็จสมบูรณ์<br/>
                  • หากมีโหนดอื่นมาขอทรัพยากรเดียวกัน โหนดนั้นต้อง WAIT ในคิว
                </div>
              </div>

              <div style="background:#131722;border:1.5px solid #10b981;border-radius:12px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#34d399;font-size:15px;margin-bottom:8px;">2. Phase 2: Shrinking Phase (ช่วงปลดล็อกเมื่อ Commit)</div>
                <div style="font-size:13px;color:#c7cad6;line-height:1.6;">
                  • <b>Strict 2PL Rule</b>: จะปลดล็อก Exclusive Lock ทั้งหมด <b>พร้อมกันในจังหวะ COMMIT เท่านั้น!</b><br/>
                  • ห้ามขอล็อกอะไรเพิ่มอีกแล้วหลังจากเริ่มปลดล็อก<br/>
                  • รับประกัน Serializability และป้องกัน Cascading Abort ได้ 100%
                </div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #33: SQL LAB ROADMAP (SQL Lab Practice Guide - Diagram 1)
    // =========================================================================
    if ((dId.includes('SQL Lab Practice Guide') && inDocIdx === 1) || (lower.includes('step 0: พื้นฐานเครื่องมือ') && lower.includes('enterprise store lab'))) {
      return {
        title: '🗺️ แผนผังเส้นทางสู่ยอดฝีมือ SQL 8 ขั้นตอน (SQL Mastery Roadmap: Steps 0 to 7)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:12px;">
              <div style="background:#131722;border-left:4px solid #64748b;padding:12px 14px;border-radius:8px;">
                <b style="color:#94a3b8;">Step 0: Setup &amp; Tools</b>
                <div style="font-size:12px;color:#c7cad6;margin-top:2px;">วิธีรันสคริปต์ <code>.sql</code> ผ่าน SQLite / Web Browser / IDE</div>
              </div>
              <div style="background:#131722;border-left:4px solid #4fd1e8;padding:12px 14px;border-radius:8px;">
                <b style="color:#4fd1e8;">Step 1: DDL สร้างตาราง</b>
                <div style="font-size:12px;color:#c7cad6;margin-top:2px;">คำสั่งสร้าง/แก้/ลบโครงสร้าง <code>CREATE, ALTER, DROP TABLE</code></div>
              </div>
              <div style="background:#131722;border-left:4px solid #38bdf8;padding:12px 14px;border-radius:8px;">
                <b style="color:#38bdf8;">Step 2: DML จัดการข้อมูล</b>
                <div style="font-size:12px;color:#c7cad6;margin-top:2px;">คำสั่งเพิ่ม/แก้/ลบแถว <code>INSERT INTO, UPDATE, DELETE FROM</code></div>
              </div>
              <div style="background:#131722;border-left:4px solid #10b981;padding:12px 14px;border-radius:8px;">
                <b style="color:#10b981;">Step 3: DQL สืบค้นพื้นฐาน</b>
                <div style="font-size:12px;color:#c7cad6;margin-top:2px;">การดึงข้อมูล <code>SELECT, WHERE, LIKE, IN, BETWEEN, ORDER BY</code></div>
              </div>
              <div style="background:#131722;border-left:4px solid #f59e0b;padding:12px 14px;border-radius:8px;">
                <b style="color:#f59e0b;">Step 4: Grouping &amp; Stats</b>
                <div style="font-size:12px;color:#c7cad6;margin-top:2px;">การสรุปผลเชิงสถิติ <code>COUNT, SUM, AVG, GROUP BY, HAVING</code></div>
              </div>
              <div style="background:#131722;border-left:4px solid #b794f6;padding:12px 14px;border-radius:8px;">
                <b style="color:#b794f6;">Step 5: Relational JOINs</b>
                <div style="font-size:12px;color:#c7cad6;margin-top:2px;">การเชื่อมโยงข้ามตาราง <code>INNER JOIN, LEFT JOIN, RIGHT JOIN</code></div>
              </div>
              <div style="background:#131722;border-left:4px solid #ec4899;padding:12px 14px;border-radius:8px;">
                <b style="color:#f472b6;">Step 6: UNION &amp; VIEWs</b>
                <div style="font-size:12px;color:#c7cad6;margin-top:2px;">การรวมข้อมูลทางเซตและสร้างมุมมองเสมือน <code>CREATE VIEW</code></div>
              </div>
              <div style="background:#131722;border-left:4px solid #34d399;padding:12px 14px;border-radius:8px;">
                <b style="color:#34d399;">Step 7: Enterprise 7-Table Lab</b>
                <div style="font-size:12px;color:#c7cad6;margin-top:2px;">ฝึกวิเคราะห์ระบบร้านค้าสมบูรณ์ 7 ตารางเสมือนทำงานจริงในบริษัท</div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #34: SQL LAB ARCHITECTURE (SQL Lab Practice Guide - Diagram 2)
    // =========================================================================
    if ((dId.includes('SQL Lab Practice Guide') && inDocIdx === 2) || (lower.includes('rdbms engine') && lower.includes('execution engine') && lower.includes('client'))) {
      return {
        title: '🏗️ สถาปัตยกรรมการประมวลผลคำสั่ง SQL: Client ➔ RDBMS Engine ➔ Storage',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:1fr 50px 1.3fr 50px 1fr;gap:12px;align-items:center;">
              <div style="background:#131722;border:1.5px solid #4fd1e8;border-radius:10px;padding:16px;text-align:center;">
                <div style="font-size:24px;">💻</div>
                <div style="font-weight:700;color:#4fd1e8;font-size:14px;margin-top:4px;">1. Client Machine</div>
                <div style="font-size:12px;color:#94a3b8;margin-top:4px;">VS Code / Browser / DBeaver ส่งคำสั่ง SQL</div>
              </div>
              <div style="text-align:center;color:#4fd1e8;font-size:20px;">➔</div>
              <div style="background:#131722;border:2px solid #f59e0b;border-radius:12px;padding:16px;">
                <div style="text-align:center;font-weight:700;color:#fbbf24;font-size:14.5px;margin-bottom:8px;">2. RDBMS Engine</div>
                <div style="font-size:12px;color:#cbd5e1;line-height:1.6;">
                  • <b>Parser</b>: ตรวจสอบ Syntax<br/>
                  • <b>Query Optimizer</b>: เลือก Index ที่เร็วที่สุด<br/>
                  • <b>Execution Engine</b>: ประมวลผลคำนวณ
                </div>
              </div>
              <div style="text-align:center;color:#f59e0b;font-size:20px;">➔</div>
              <div style="background:#131722;border:1.5px solid #10b981;border-radius:10px;padding:16px;text-align:center;">
                <div style="font-size:24px;">🗄️</div>
                <div style="font-weight:700;color:#34d399;font-size:14px;margin-top:4px;">3. Storage Subsystem</div>
                <div style="font-size:12px;color:#94a3b8;margin-top:4px;">อ่าน/เขียนตารางและบล็อกข้อมูลลงดิสก์จริง</div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #35: SQL LAB EXCEL VS RDBMS (SQL Lab Practice Guide - Diagram 3)
    // =========================================================================
    if ((dId.includes('SQL Lab Practice Guide') && inDocIdx === 3) || (lower.includes('ตาราง excel: \'students\'') || (lower.includes('น้องสมชาย') && lower.includes('น้องสมหญิง')))) {
      return {
        title: '📊 แบบจำลองความคิด: ตาราง Excel Spreadsheet vs ตารางฐานข้อมูล Relational Table',
        html: `
          <div class="db-native-wrap">
            <div style="overflow-x:auto;">
              <table style="width:100%;border-collapse:collapse;background:#131722;border-radius:8px;overflow:hidden;">
                <thead>
                  <tr style="background:#1e293b;border-bottom:2px solid #4fd1e8;">
                    <th style="padding:10px;color:#4fd1e8;font-family:'JetBrains Mono',monospace;">ID (PK)</th>
                    <th style="padding:10px;color:#4fd1e8;font-family:'JetBrains Mono',monospace;">Name (ชื่อ นศ.)</th>
                    <th style="padding:10px;color:#4fd1e8;font-family:'JetBrains Mono',monospace;">Subject (วิชา)</th>
                    <th style="padding:10px;color:#4fd1e8;font-family:'JetBrains Mono',monospace;">Score (คะแนน)</th>
                  </tr>
                </thead>
                <tbody style="font-size:13px;color:#e2e8f0;">
                  <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                    <td style="padding:10px;font-family:'JetBrains Mono',monospace;color:#38bdf8;">1</td>
                    <td style="padding:10px;">น้องสมชาย</td>
                    <td style="padding:10px;">คณิตศาสตร์</td>
                    <td style="padding:10px;font-weight:700;color:#34d399;">85</td>
                  </tr>
                  <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                    <td style="padding:10px;font-family:'JetBrains Mono',monospace;color:#38bdf8;">2</td>
                    <td style="padding:10px;">น้องสมหญิง</td>
                    <td style="padding:10px;">คณิตศาสตร์</td>
                    <td style="padding:10px;font-weight:700;color:#34d399;">92</td>
                  </tr>
                  <tr>
                    <td style="padding:10px;font-family:'JetBrains Mono',monospace;color:#38bdf8;">3</td>
                    <td style="padding:10px;">น้องมานะ</td>
                    <td style="padding:10px;">คณิตศาสตร์</td>
                    <td style="padding:10px;font-weight:700;color:#f87171;">42</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="db-tree-footer">
              <span class="db-tree-chip">💡 คำศัพท์เทียบเคียง: คอลัมน์แนวตั้ง = Attributes/Fields | แถวแนวนอน = Tuples/Records/Rows</span>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #36: SQL LAB SELECT PROJECTION (SQL Lab Practice Guide - Diagram 4)
    // =========================================================================
    if ((dId.includes('SQL Lab Practice Guide') && inDocIdx === 4) || (lower.includes('select name, score') && lower.includes('ตัดคอลัมน์ id และ subject ทิ้งไป'))) {
      return {
        title: '✂️ การฉายข้อมูลเชิงสัมพันธ์ (Relational Projection: SELECT Name, Score)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:1fr 50px 1.2fr 50px 1fr;gap:10px;align-items:center;">
              <div style="background:#131722;border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:12px;text-align:center;">
                <div style="font-size:12px;color:#94a3b8;font-weight:700;">ตารางเดิม (4 ฟิลด์)</div>
                <div style="font-family:'JetBrains Mono',monospace;font-size:11.5px;color:#cbd5e1;margin-top:6px;">ID | Name | Subject | Score</div>
              </div>
              <div style="text-align:center;color:#4fd1e8;font-size:20px;">➔</div>
              <div style="background:#1e1a2b;border:1.5px solid #b794f6;border-radius:10px;padding:14px;text-align:center;">
                <div style="color:#c084fc;font-weight:700;font-size:13px;">คำสั่ง SELECT Name, Score</div>
                <div style="font-size:11.5px;color:#cbd5e1;margin-top:4px;">ตัดคอลัมน์ ID และ Subject ทิ้งจากการแสดงผล</div>
              </div>
              <div style="text-align:center;color:#b794f6;font-size:20px;">➔</div>
              <div style="background:#13221b;border:1.5px solid #10b981;border-radius:8px;padding:12px;text-align:center;">
                <div style="font-size:12px;color:#34d399;font-weight:700;">ผลลัพธ์ Result Set (2 ฟิลด์)</div>
                <div style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#6ee7b7;margin-top:6px;font-weight:700;">Name | Score</div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #37: SQL LAB CHAR VS VARCHAR (SQL Lab Practice Guide - Diagram 5)
    // =========================================================================
    if ((dId.includes('SQL Lab Practice Guide') && inDocIdx === 5) || (lower.includes('char(10)') && lower.includes('ตู้ล็อกเกอร์เหล็กแข็ง') && lower.includes('varchar(10)'))) {
      return {
        title: '💾 สถาปัตยกรรมพื้นที่จัดเก็บในหน่วยความจำ: CHAR(10) ฟิกซ์ตายตัว vs VARCHAR(10) ยางยืด',
        html: `
          <div class="db-native-wrap">
            <div style="display:flex;flex-direction:column;gap:14px;">
              <div style="background:#131722;border:1.5px solid #f59e0b;border-radius:10px;padding:14px;">
                <div style="font-weight:700;color:#fbbf24;font-size:14px;margin-bottom:8px;">1. CHAR(10) — เหมือนล็อกเกอร์เหล็กจองพื้นที่คงที่ 10 ช่อง</div>
                <div style="display:flex;gap:4px;overflow-x:auto;padding:6px 0;">
                  <div class="db-slot-cell occupied">ส</div>
                  <div class="db-slot-cell occupied">ม</div>
                  <div class="db-slot-cell occupied">ช</div>
                  <div class="db-slot-cell occupied">า</div>
                  <div class="db-slot-cell occupied">ย</div>
                  <div class="db-slot-cell wasted">[ว่าง]</div>
                  <div class="db-slot-cell wasted">[ว่าง]</div>
                  <div class="db-slot-cell wasted">[ว่าง]</div>
                  <div class="db-slot-cell wasted">[ว่าง]</div>
                  <div class="db-slot-cell wasted">[ว่าง]</div>
                </div>
                <div style="font-size:11.5px;color:#fde68a;margin-top:6px;">⚠️ กินเนื้อที่ 10 ตัวอักษรเต็มเสมอ ไม่ว่าจะใส่คำสั้นแค่ไหน (เปลืองที่เก็บ 5 ช่องว่าง)</div>
              </div>

              <div style="background:#131722;border:1.5px solid #10b981;border-radius:10px;padding:14px;">
                <div style="font-weight:700;color:#34d399;font-size:14px;margin-bottom:8px;">2. VARCHAR(10) — เหมือนกระเป๋าผ้ายางยืด หดขยายตามขนาดข้อมูลจริง</div>
                <div style="display:flex;gap:4px;overflow-x:auto;padding:6px 0;">
                  <div class="db-slot-cell occupied" style="border-color:#10b981;background:rgba(16,185,129,0.15);">ส</div>
                  <div class="db-slot-cell occupied" style="border-color:#10b981;background:rgba(16,185,129,0.15);">ม</div>
                  <div class="db-slot-cell occupied" style="border-color:#10b981;background:rgba(16,185,129,0.15);">ช</div>
                  <div class="db-slot-cell occupied" style="border-color:#10b981;background:rgba(16,185,129,0.15);">า</div>
                  <div class="db-slot-cell occupied" style="border-color:#10b981;background:rgba(16,185,129,0.15);">ย</div>
                  <div style="display:flex;align-items:center;padding:0 12px;color:#34d399;font-size:12px;font-style:italic;">➔ คืนพื้นที่ 5 ช่องที่เหลือให้ฮาร์ดดิสก์ทันที!</div>
                </div>
                <div style="font-size:11.5px;color:#6ee7b7;margin-top:6px;">✓ ประหยัดพื้นที่จัดเก็บข้อมูล เหมาะกับข้อความที่มีความยาวไม่แน่นอน เช่น ชื่อ-นามสกุล, ที่อยู่</div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #38: SQL LAB DROP VS DELETE (SQL Lab Practice Guide - Diagram 6)
    // =========================================================================
    if ((dId.includes('SQL Lab Practice Guide') && inDocIdx === 6) || (lower.includes('drop table tablename') && lower.includes('delete from tablename'))) {
      return {
        title: '🔥 เปรียบเทียบคำสั่งทำลายล้าง: DROP TABLE (เผาทิ้งทั้งเล่ม) vs DELETE FROM (ลบเฉพาะข้อความข้างใน)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
              <div style="background:#131722;border:1.5px solid #ef4444;border-radius:12px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#f87171;font-size:15px;margin-bottom:8px;">🔥 DROP TABLE TableName; (DDL)</div>
                <div style="font-size:13px;color:#94a3b8;margin-bottom:8px;"><b>"เผาสมุดทิ้งทั้งเล่ม ไม่เหลือแม้แต่ปก"</b></div>
                <div style="background:rgba(239,68,68,0.1);padding:10px;border-radius:8px;font-size:12px;color:#fca5a5;line-height:1.6;">
                  • โครงสร้างตาราง (Columns, Schema) หายสาบสูญ<br/>
                  • ข้อมูลทั้งหมดในตารางหายเกลี้ยง<br/>
                  • หากรัน <code>SELECT</code> ต่อจะเกิดข้อผิดพลาด Table not found
                </div>
              </div>

              <div style="background:#131722;border:1.5px solid #f59e0b;border-radius:12px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#fbbf24;font-size:15px;margin-bottom:8px;">🧹 DELETE FROM TableName; (DML)</div>
                <div style="font-size:13px;color:#94a3b8;margin-bottom:8px;"><b>"เอายางลบมาลบข้อมูลข้างใน แต่สมุดเปล่ายังอยู่"</b></div>
                <div style="background:rgba(245,158,11,0.1);padding:10px;border-radius:8px;font-size:12px;color:#fde68a;line-height:1.6;">
                  • ลบเฉพาะแถวข้อมูล (Rows) ออกจนตารางกลายเป็นตารางเปล่า<br/>
                  • หัวคอลัมน์ ชนิดข้อมูล และ Constraints ยังอยู่ครบ 100%<br/>
                  • สามารถรันคำสั่ง <code>INSERT</code> ข้อมูลใหม่ลงไปต่อได้ทันที
                </div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #39: SQL LAB ADD DECISION TREE (SQL Lab Practice Guide - Diagram 7)
    // =========================================================================
    if ((dId.includes('SQL Lab Practice Guide') && inDocIdx === 7) || (lower.includes('อยากเพิ่มตาราง') && lower.includes('alter table ... add'))) {
      return {
        title: '🧭 แผนผังช่วยตัดสินใจคำสั่ง SQL: "อยากเพิ่มตาราง เพิ่มคอลัมน์ หรือเพิ่มแถวข้อมูล?"',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(230px, 1fr));gap:14px;">
              <div style="background:#131722;border:1.5px solid #4fd1e8;border-radius:10px;padding:16px;">
                <div style="font-weight:700;color:#4fd1e8;font-size:14.5px;margin-bottom:6px;">1. สร้างตารางใหม่เอี่ยม</div>
                <div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">(เพิ่มแผ่นชีทสมุดเล่มใหม่)</div>
                <div style="background:rgba(79,209,232,0.1);padding:8px 10px;border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:12px;color:#38bdf8;">
                  CREATE TABLE ...<br/>ตามด้วย INSERT INTO
                </div>
              </div>

              <div style="background:#131722;border:1.5px solid #f59e0b;border-radius:10px;padding:16px;">
                <div style="font-weight:700;color:#fbbf24;font-size:14.5px;margin-bottom:6px;">2. เพิ่มช่องคอลัมน์ใหม่</div>
                <div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">(ตารางเดิมอยู่แล้ว แต่อยากเพิ่มฟิลด์)</div>
                <div style="background:rgba(245,158,11,0.1);padding:8px 10px;border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:12px;color:#fde68a;">
                  ALTER TABLE ...<br/>ADD ColumnName DataType
                </div>
              </div>

              <div style="background:#131722;border:1.5px solid #10b981;border-radius:10px;padding:16px;">
                <div style="font-weight:700;color:#34d399;font-size:14.5px;margin-bottom:6px;">3. หยอดแถวข้อมูลใหม่</div>
                <div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">(มีคอลัมน์ครบแล้ว แต่อยากเพิ่ม Record)</div>
                <div style="background:rgba(16,185,129,0.1);padding:8px 10px;border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:12px;color:#6ee7b7;">
                  INSERT INTO Table<br/>VALUES (...)
                </div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #40: SQL LAB VENN JOINS (SQL Lab Practice Guide - Diagram 8)
    // =========================================================================
    if ((dId.includes('SQL Lab Practice Guide') && inDocIdx === 8) || (lower.includes('หลักการของ join แต่ละประเภท') || (lower.includes('เอาเฉพาะจุดตัดที่ตรงกันทั้ง 2 ฝั่ง') && lower.includes('เอาฝั่งซ้ายทั้งหมด')))) {
      return {
        title: '⭕ สถาปัตยกรรมทฤษฎีเซตของการเชื่อมตาราง (Relational Set Joins: Venn Diagram Model)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;">
              <div class="db-venn-card">
                <div style="font-weight:700;color:#4fd1e8;font-size:14px;margin-bottom:6px;">INNER JOIN</div>
                <svg width="140" height="80" viewBox="0 0 140 80">
                  <circle cx="50" cy="40" r="30" fill="rgba(79,209,232,0.15)" stroke="#4fd1e8" stroke-width="1.5" />
                  <circle cx="90" cy="40" r="30" fill="rgba(79,209,232,0.15)" stroke="#4fd1e8" stroke-width="1.5" />
                  <path d="M 70 17 A 30 30 0 0 1 70 63 A 30 30 0 0 1 70 17" fill="#4fd1e8" />
                </svg>
                <div style="font-size:11.5px;color:#c7cad6;text-align:center;">เอาเฉพาะจุดตัดที่ตรงกันทั้ง 2 ฝั่ง</div>
              </div>

              <div class="db-venn-card">
                <div style="font-weight:700;color:#10b981;font-size:14px;margin-bottom:6px;">LEFT JOIN</div>
                <svg width="140" height="80" viewBox="0 0 140 80">
                  <circle cx="50" cy="40" r="30" fill="#10b981" stroke="#10b981" stroke-width="1.5" />
                  <circle cx="90" cy="40" r="30" fill="none" stroke="#64748b" stroke-width="1.5" />
                  <path d="M 70 17 A 30 30 0 0 1 70 63 A 30 30 0 0 1 70 17" fill="#10b981" />
                </svg>
                <div style="font-size:11.5px;color:#c7cad6;text-align:center;">เอาฝั่งซ้ายทั้งหมด + ฝั่งขวาที่ตรงกัน (ไม่ตรงเป็น NULL)</div>
              </div>

              <div class="db-venn-card">
                <div style="font-weight:700;color:#f59e0b;font-size:14px;margin-bottom:6px;">RIGHT JOIN</div>
                <svg width="140" height="80" viewBox="0 0 140 80">
                  <circle cx="50" cy="40" r="30" fill="none" stroke="#64748b" stroke-width="1.5" />
                  <circle cx="90" cy="40" r="30" fill="#f59e0b" stroke="#f59e0b" stroke-width="1.5" />
                  <path d="M 70 17 A 30 30 0 0 1 70 63 A 30 30 0 0 1 70 17" fill="#f59e0b" />
                </svg>
                <div style="font-size:11.5px;color:#c7cad6;text-align:center;">เอาฝั่งขวาทั้งหมด + ฝั่งซ้ายที่ตรงกัน</div>
              </div>

              <div class="db-venn-card">
                <div style="font-weight:700;color:#b794f6;font-size:14px;margin-bottom:6px;">FULL OUTER JOIN</div>
                <svg width="140" height="80" viewBox="0 0 140 80">
                  <circle cx="50" cy="40" r="30" fill="rgba(183,148,246,0.6)" stroke="#b794f6" stroke-width="1.5" />
                  <circle cx="90" cy="40" r="30" fill="rgba(183,148,246,0.6)" stroke="#b794f6" stroke-width="1.5" />
                </svg>
                <div style="font-size:11.5px;color:#c7cad6;text-align:center;">เอาข้อมูลทั้งหมดทั้งสองฝั่งจับคู่กัน</div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #41: SQL LAB RETAIL 7-TABLE COMPLETE ER SCHEMA (SQL Lab Practice Guide - Diagram 9)
    // =========================================================================
    if ((dId.includes('SQL Lab Practice Guide') && inDocIdx === 9) || (lower.includes('ordersdetail') && lower.includes('custsalary') && lower.includes('titlename'))) {
      return {
        title: '🛒 สถาปัตยกรรม Schema ระดับองค์กรสมบูรณ์ 7 ตาราง (Enterprise Retail Store 7-Table Schema Architecture)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:14px;">
              <!-- 1. Title -->
              <div class="db-entity-card">
                <div class="db-entity-header">🏷️ Title <span class="db-entity-tag">Lookup</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>TitleID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">TitleName <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <!-- 2. Customer -->
              <div class="db-entity-card">
                <div class="db-entity-header">👤 Customer <span class="db-entity-tag">Master</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>CustID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">CustName <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">CustAddress <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">CustSex <span class="db-data-type">CHAR(1)</span></div>
                  <div class="db-attr-row">CustSalary <span class="db-data-type">DECIMAL</span></div>
                  <div class="db-attr-row"><span class="db-fk-badge">FK</span> <i>TitleID</i> <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <!-- 3. Category -->
              <div class="db-entity-card">
                <div class="db-entity-header">📂 Category <span class="db-entity-tag">Lookup</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>CateID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">CateName <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <!-- 4. Unit -->
              <div class="db-entity-card">
                <div class="db-entity-header">📏 Unit <span class="db-entity-tag">Lookup</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>UnitID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">UnitName <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <!-- 5. Product -->
              <div class="db-entity-card" style="border-color:#4fd1e8;">
                <div class="db-entity-header" style="background:rgba(79,209,232,0.15);color:#4fd1e8;">📦 Product <span class="db-entity-tag" style="background:#4fd1e8;color:#0f172a;">Master</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>ProdID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">ProdName <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">ProdPrice <span class="db-data-type">DECIMAL</span></div>
                  <div class="db-attr-row">ProdCost <span class="db-data-type">DECIMAL</span></div>
                  <div class="db-attr-row">ProdQty <span class="db-data-type">INT</span></div>
                  <div class="db-attr-row"><span class="db-fk-badge">FK</span> <i>CateID</i> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row"><span class="db-fk-badge">FK</span> <i>UnitID</i> <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <!-- 6. Orders -->
              <div class="db-entity-card" style="border-color:#f59e0b;">
                <div class="db-entity-header" style="background:rgba(245,158,11,0.15);color:#fbbf24;">📑 Orders <span class="db-entity-tag" style="background:#f59e0b;color:#0f172a;">Header</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span> <b>OrderID</b> <span class="db-data-type">VARCHAR</span></div>
                  <div class="db-attr-row">OrderDate <span class="db-data-type">DATE</span></div>
                  <div class="db-attr-row"><span class="db-fk-badge">FK</span> <i>CustID</i> <span class="db-data-type">VARCHAR</span></div>
                </div>
              </div>

              <!-- 7. OrdersDetail -->
              <div class="db-entity-card" style="border-color:#10b981;">
                <div class="db-entity-header" style="background:rgba(16,185,129,0.15);color:#34d399;">🛒 OrdersDetail <span class="db-entity-tag" style="background:#10b981;color:#0f172a;">Detail (M:N)</span></div>
                <div class="db-attr-list">
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span><span class="db-fk-badge">FK</span> <b>OrderID</b></div>
                  <div class="db-attr-row"><span class="db-pk-badge">PK</span><span class="db-fk-badge">FK</span> <b>ProdID</b></div>
                  <div class="db-attr-row">UnitPrice <span class="db-data-type">DECIMAL</span></div>
                  <div class="db-attr-row">Quantity <span class="db-data-type">INT</span></div>
                  <div class="db-attr-row">Discount <span class="db-data-type">DECIMAL</span></div>
                </div>
              </div>
            </div>
            <div class="db-tree-footer">
              <span class="db-tree-chip">🔗 โครงข่ายความสัมพันธ์: Title (1) ➔ (N) Customer (1) ➔ (N) Orders (1) ➔ (N) OrdersDetail (N) 🠔 (1) Product (N) 🠔 (1) Category &amp; Unit</span>
            </div>
          </div>
        `
      };
    }


    // =========================================================================
    // #42: BANK TRANSFER SEQUENCE (In-Class Pop Quiz - Diagram 1)
    // =========================================================================
    if (lower.includes('saving_account') && lower.includes('checking_account') && lower.includes('โอนเงิน 50,000')) {
      return {
        title: '💸 วงจรธุรกรรมการโอนเงิน 50,000 บาท ระหว่าง Saving Account และ Checking Account ใน RAM/Disk',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;">
              <div class="db-card" style="background:#131722;border:1px solid rgba(59,130,246,0.3);border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#60a5fa;margin-bottom:8px;">🏦 1. Saving Account (บัญชีออมทรัพย์ - ผู้โอน)</div>
                <div style="font-size:12.5px;color:#cbd5e1;line-height:1.6;">
                  • <b>READ (Saving)</b>: โหลดค่าเดิม <b>400,000 บาท</b> ขึ้นหน่วยความจำ RAM<br/>
                  • <b>Compute in RAM</b>: 400,000 − 50,000 = <b>350,000 บาท</b><br/>
                  • <b>WRITE (Saving)</b>: บันทึกค่า <b>350,000 บาท</b> ลงตารางบน Hard Disk
                </div>
              </div>
              <div class="db-card" style="background:#131722;border:1px solid rgba(16,185,129,0.3);border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#34d399;margin-bottom:8px;">💳 2. Checking Account (บัญชีกระแสรายวัน - ผู้รับ)</div>
                <div style="font-size:12.5px;color:#cbd5e1;line-height:1.6;">
                  • <b>READ (Checking)</b>: โหลดค่าเดิม <b>10,000 บาท</b> ขึ้นหน่วยความจำ RAM<br/>
                  • <b>Compute in RAM</b>: 10,000 + 50,000 = <b>60,000 บาท</b><br/>
                  • <b>WRITE (Checking)</b>: บันทึกค่า <b>60,000 บาท</b> ลงตารางบน Hard Disk
                </div>
              </div>
            </div>
            <div style="margin-top:16px;background:rgba(16,185,129,0.08);border:1px dashed #10b981;border-radius:8px;padding:12px;font-size:12.5px;color:#6ee7b7;text-align:center;">
              ✅ <b>จุดสิ้นสุดธุรกรรม (COMMIT TRANSACTION)</b>: ทั้ง 2 บัญชีต้องทำงานสำเร็จครบทั้งคู่ หากไฟดับระหว่างทาง DBMS จะสั่ง <b>ROLLBACK</b> ทันทีตามหลัก <b>Atomicity</b>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #43: ACID PROPERTIES 4-PILLAR MATRIX (In-Class Pop Quiz - Diagram 2)
    // =========================================================================
    if (lower.includes('คุณสมบัติ acid properties') || (lower.includes('atomicity') && lower.includes('durability') && lower.includes('consistency') && lower.includes('isolation'))) {
      return {
        title: '🛡️ สถาปัตยกรรม 4 เสาหลักของคุณสมบัติธุรกรรมฐานข้อมูล (ACID Properties Matrix)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:14px;">
              <div class="db-card" style="background:#131722;border-top:4px solid #f59e0b;border-radius:10px;padding:14px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#fbbf24;font-size:14px;margin-bottom:6px;">⚡ A - Atomicity</div>
                <div style="font-size:12px;color:#94a3b8;margin-bottom:6px;font-weight:600;">ความเป็นหนึ่งเดียว / แบ่งแยกไม่ได้</div>
                <div style="font-size:12.5px;color:#cbd5e1;line-height:1.5;">
                  ทำทั้งหมด (All) หรือไม่ทำเลย (Nothing) หากคำสั่งใดพังกลางทาง ระบบต้อง <b>ROLLBACK</b> คืนค่าเดิมทันที
                </div>
              </div>
              <div class="db-card" style="background:#131722;border-top:4px solid #10b981;border-radius:10px;padding:14px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#34d399;font-size:14px;margin-bottom:6px;">🎯 C - Consistency</div>
                <div style="font-size:12px;color:#94a3b8;margin-bottom:6px;font-weight:600;">ความถูกต้องสอดคล้องตามกฎเกณฑ์</div>
                <div style="font-size:12.5px;color:#cbd5e1;line-height:1.5;">
                  ฐานข้อมูลต้องเปลี่ยนจากสถานะที่ถูกต้องหนึ่งไปสู่อีกสถานะที่ถูกต้องหนึ่งเสมอ เช่น ผลรวมเงินในระบบก่อนและหลังโอนต้องเท่าเดิม
                </div>
              </div>
              <div class="db-card" style="background:#131722;border-top:4px solid #a855f7;border-radius:10px;padding:14px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#c084fc;font-size:14px;margin-bottom:6px;">🛡️ I - Isolation</div>
                <div style="font-size:12px;color:#94a3b8;margin-bottom:6px;font-weight:600;">ความโดดเดี่ยวในการประมวลผล</div>
                <div style="font-size:12.5px;color:#cbd5e1;line-height:1.5;">
                  แต่ละธุรกรรมที่ทำงานพร้อมกันต้องไม่รบกวนกัน ข้อมูลที่ยังไม่ Commit ห้ามให้ผู้ใช้อื่นมองเห็น (ป้องกัน Dirty Read)
                </div>
              </div>
              <div class="db-card" style="background:#131722;border-top:4px solid #ef4444;border-radius:10px;padding:14px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#f87171;font-size:14px;margin-bottom:6px;">💾 D - Durability</div>
                <div style="font-size:12px;color:#94a3b8;margin-bottom:6px;font-weight:600;">ความคงทนถาวรหลัง COMMIT</div>
                <div style="font-size:12.5px;color:#cbd5e1;line-height:1.5;">
                  เมื่อสั่ง <b>COMMIT</b> แล้ว ข้อมูลจะถูกบันทึกอย่างถาวรลงในสื่อบันทึกข้อมูล แม้ไฟดับในเสี้ยววินาทีถัดไป ข้อมูลต้องไม่สูญหาย
                </div>
              </div>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #44: CRASH RECOVERY REDO VS UNDO (In-Class Pop Quiz - Diagram 3)
    // =========================================================================
    if (lower.includes('dbms ตรวจสอบ log file หลัง server crash') || (lower.includes('redot') && lower.includes('undoaction'))) {
      return {
        title: '🔄 กลไกการตัดสินใจกู้คืนระบบจาก Log File หลัง Server Crash (REDO vs UNDO Algorithm)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div class="db-card" style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.4);border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#34d399;font-size:14px;margin-bottom:8px;">
                  🔄 สั่ง REDO (ทำซ้ำ / ยืนยันข้อมูล)
                </div>
                <div style="font-size:12.5px;color:#cbd5e1;line-height:1.6;">
                  • <b>เงื่อนไข:</b> พบประวัติคำสั่ง <code>[COMMIT, Ti]</code> ใน Log File ก่อนระบบล่ม<br/>
                  • <b>การกระทำ:</b> DBMS จะนำค่าใหม่ (New Value) ไปเขียนซ้ำลงตารางจริงบน Hard Disk<br/>
                  • <b>เป้าหมาย:</b> รักษาคุณสมบัติ <b>Durability</b> ให้ข้อมูลที่ยืนยันแล้วไม่สูญหาย
                </div>
              </div>
              <div class="db-card" style="background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.4);border-radius:10px;padding:16px;">
                <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;color:#f87171;font-size:14px;margin-bottom:8px;">
                  ⏪ สั่ง UNDO / ROLLBACK (ยกเลิก / คืนค่าเดิม)
                </div>
                <div style="font-size:12.5px;color:#cbd5e1;line-height:1.6;">
                  • <b>เงื่อนไข:</b> พบคำสั่ง <code>[START, Ti]</code> แต่ <b>ไม่มีคำสั่ง COMMIT</b> ปรากฏใน Log<br/>
                  • <b>การกระทำ:</b> ย้อนรอยคำสั่งจากท้ายขึ้นหน้า แล้วนำค่าเดิม (Old Value) คืนสู่ตาราง<br/>
                  • <b>เป้าหมาย:</b> รักษาคุณสมบัติ <b>Atomicity</b> ป้องกันไม่ให้มีข้อมูลครึ่งๆ กลางๆ
                </div>
              </div>
            </div>
            <div class="db-tree-footer" style="margin-top:14px;">
              <span class="db-tree-chip">📌 กฎเหล็ก Crash Recovery: มี COMMIT ➔ REDO | ไร้ COMMIT ➔ UNDO</span>
            </div>
          </div>
        `
      };
    }

    // =========================================================================
    // #45: ER-TO-RELATIONAL MAPPING 7 STEPS (Lecture 4 - ER Model - Diagram 2)
    // =========================================================================
    if (lower.includes('แปลง regular entity types') && lower.includes('แปลง n-ary relationship types')) {
      return {
        title: '📐 ไพป์ไลน์อัลกอริทึมการแปลงแบบจำลอง ER สู่ตารางเชิงสัมพันธ์ 7 ขั้นตอน (ER-to-Relational Mapping)',
        html: `
          <div class="db-native-wrap">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:12px;">
              <div class="db-card" style="background:#131722;border-left:4px solid #3b82f6;border-radius:8px;padding:12px;">
                <div style="font-weight:700;color:#60a5fa;font-size:13px;">1. Regular Entities</div>
                <div style="font-size:12px;color:#94a3b8;line-height:1.5;">สร้างตารางตาม Entity, แตก Composite เป็น Atomic, เลือก PK</div>
              </div>
              <div class="db-card" style="background:#131722;border-left:4px solid #f59e0b;border-radius:8px;padding:12px;">
                <div style="font-weight:700;color:#fbbf24;font-size:13px;">2. Weak Entities</div>
                <div style="font-size:12px;color:#94a3b8;line-height:1.5;">ดึง PK ของ Owner เป็น FK, PK ร่วม = (Owner PK + Partial Key)</div>
              </div>
              <div class="db-card" style="background:#131722;border-left:4px solid #10b981;border-radius:8px;padding:12px;">
                <div style="font-weight:700;color:#34d399;font-size:13px;">3. Binary 1:1</div>
                <div style="font-size:12px;color:#94a3b8;line-height:1.5;">วาง Foreign Key ฝั่งที่มี Total Participation (ใส่ UNIQUE NOT NULL)</div>
              </div>
              <div class="db-card" style="background:#131722;border-left:4px solid #8b5cf6;border-radius:8px;padding:12px;">
                <div style="font-weight:700;color:#a78bfa;font-size:13px;">4. Binary 1:N</div>
                <div style="font-size:12px;color:#94a3b8;line-height:1.5;">นำ PK ฝั่ง 1 ไปวางเป็น Foreign Key ในฝั่ง N เสมอ</div>
              </div>
              <div class="db-card" style="background:#131722;border-left:4px solid #ec4899;border-radius:8px;padding:12px;">
                <div style="font-weight:700;color:#f472b6;font-size:13px;">5. Binary M:N</div>
                <div style="font-size:12px;color:#94a3b8;line-height:1.5;">สร้างตารางเชื่อม (Junction Table) ดึง PK ทั้งสองฝั่งเป็น FK ร่วมกัน</div>
              </div>
              <div class="db-card" style="background:#131722;border-left:4px solid #06b6d4;border-radius:8px;padding:12px;">
                <div style="font-weight:700;color:#22d3ee;font-size:13px;">6. Multivalued Attributes</div>
                <div style="font-size:12px;color:#94a3b8;line-height:1.5;">แยกออกไปสร้างเป็นตารางใหม่ ประกอบด้วยค่าข้อมูล + FK ชี้กลับไปแม่</div>
              </div>
              <div class="db-card" style="background:#131722;border-left:4px solid #14b8a6;border-radius:8px;padding:12px;">
                <div style="font-weight:700;color:#2dd4bf;font-size:13px;">7. N-ary Relationships</div>
                <div style="font-size:12px;color:#94a3b8;line-height:1.5;">สร้างตารางความสัมพันธ์แยกต่างหาก ดึง PK ของทั้ง N ฝั่งเป็น FK ร่วม</div>
              </div>
            </div>
          </div>
        `
      };
    }

    // Fallback if not matched
    return {
      title: '🔬 แบบจำลองโครงสร้างสถาปัตยกรรม (Database Architecture Model)',
      html: `
        <div class="db-native-wrap">
          <div style="background:#131722;border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px;">
            <pre style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#cbd5e1;overflow-x:auto;">${escapeHtml(clean)}</pre>
          </div>
        </div>
      `
    };
  }

  return {
    render: render
  };
})();
