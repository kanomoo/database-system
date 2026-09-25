# 🗄️ Database Systems — Course Repository & Interactive Study Lab

[![SQL](https://img.shields.io/badge/SQL-MySQL%20%7C%20MariaDB%20%7C%20SQLite-blue?logo=mysql&logoColor=white)](https://github.com/kanomoo/database-system)
[![Obsidian](https://img.shields.io/badge/Notes-Obsidian%20Wiki-purple?logo=obsidian&logoColor=white)](Wiki/)
[![Web Lab](https://img.shields.io/badge/Interactive-SQL%20Lab-success)](SqlLab/index.html)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

ยินดีต้อนรับสู่คลังความรู้ สื่อการเรียนการสอน บันทึกการบรรยาย และระบบห้องทดลองเขียนคิวรีเชิงโต้ตอบสำหรับรายวิชา **Database Systems (ระบบฐานข้อมูล)**

---

## 🌟 จุดเด่นของโปรเจกต์ (Key Features)

* **💻 In-Browser Interactive SQL Lab:** เว็บแอปพลิเคชันฝึกทำแบบฝึกหัด SQL บนเบราว์เซอร์ ทำงานด้วย SQLite WebAssembly (`sql.js`) ไม่ต้องติดตั้งโปรแกรมหรือเซิร์ฟเวอร์ฐานข้อมูลภายนอก
* **📚 Obsidian Knowledge Base & Interactive Wiki:** คลังสรุปเนื้อหาเชิงลึกระดับตำรา รองรับ Mermaid diagrams, Trace Tables, Mathematical relational algebra, และ Prism.js code syntax highlighting
* **🔥 Intensive Normalization Guides:** คู่มือเจาะลึกการแปลงรูปฐานข้อมูล (Normalization) ตั้งแต่ 1NF, 2NF, 3NF, BCNF จนถึง 5NF พร้อมตัวอย่างจริงและโจทย์ข้อสอบจำลอง
* **🛠️ Practical DDL/DML Troubleshooting:** คู่มือการตั้งค่า XAMPP MariaDB CLI, การแก้ปัญหา Constraints, Primary Key / Foreign Key, และการแก้บั๊กยอดนิยม เช่น `ERROR 1074: Column length too big`
* **🎙️ Lecture Audio Transcripts & Insights:** บันทึกเสียงและบทถอดความการบรรยายในห้องเรียนแบบคำต่อคำ เพื่อการทบทวนประเด็นสำคัญและจุดเน้นข้อสอบ

---

## 📁 โครงสร้างโปรเจกต์ (Repository Structure)

```text
database-system/
├── SqlLab/                     # 🌐 Interactive SQL Lab (ทำงานบนเบราว์เซอร์ผ่าน WASM)
│   ├── index.html              # หน้าหลักห้องทดลอง SQL
│   ├── app.js                  # ลอจิกการรันคิวรีและตรวจผลลัพธ์
│   ├── exercises.js            # ชุดโจทย์แบบฝึกหัด SQL จากง่ายไปยาก
│   └── vendor/                 # sql-wasm binaries สำหรับรัน SQLite บน Web Worker
│
├── Wiki/                       # 📖 คลังความรู้เชิงลึก (Knowledge Base & Notes)
│   ├── Lecture 1 - Overview of Databases and Transaction Processing.md
│   ├── Lecture 7 - SQL Fundamentals (DDL, DML, Constraints).md
│   ├── Lecture 8 - Database System Architecture.md
│   ├── Beginner Guide - Normalization Easy Steps.md
│   ├── Master Exam - 5-Level Normalization Intensive Practice.md
│   ├── Lab 3 - DDL, Constraints, and MariaDB CLI Troubleshooting.md
│   └── vendor/                 # Marked.js, Prism.js, Mermaid.js สำหรับเปิดอ่านบนเว็บ
│
├── Lectures/                   # 📑 สไลด์ประกอบการสอนต้นฉบับ (Ch1 - Ch9 PDF)
│   ├── Ch1 - Database Introduction & DBMS Architecture.pdf
│   ├── Ch2 - Relational Data Model & Relational Algebra.pdf
│   ├── Ch3 - Entity-Relationship (ER) Modeling.pdf
│   ├── Ch4 - Enhanced ER & Object-Relational Mapping.pdf
│   ├── Ch7 - SQL Data Definition & Data Manipulation.pdf
│   ├── Ch8 - Database Normalization (1NF to 5NF).pdf
│   └── Ch9 - Transaction Management, Concurrency & Recovery.pdf
│
├── Transcripts/                # 🎙️ บันทึกบทถอดเสียงจากการบรรยายในชั้นเรียน
├── Lab/                        # 🧪 สคริปต์ SQL สำหรับการทดสอบในห้องปฏิบัติการ
├── build-wiki.js               # ⚙️ สคริปต์สำหรับบิลด์และสร้างดัชนี Wiki เว็บแอป
├── fix_tables.py               # 🐍 เครื่องมือ Python สำหรับจัดฟอร์แมต Markdown Tables
└── index.html                  # 🧭 หน้าเว็บสำหรับเปิดอ่าน Obsidian Wiki ผ่าน Browser
```

---

## 🚀 การเริ่มต้นใช้งาน (Getting Started)

### 1. ใช้งาน Interactive SQL Lab บนเบราว์เซอร์
เปิดไฟล์ `SqlLab/index.html` บนเบราว์เซอร์ใดก็ได้ หรือรันผ่าน Local HTTP Server:

```bash
# รันผ่าน Python built-in server
python -m http.server 8000
```
เปิดเบราว์เซอร์ไปที่: `http://localhost:8000/SqlLab/`

### 2. เปิดอ่าน Knowledge Base / Wiki ผ่านเว็บ
เปิดไฟล์ `index.html` ที่โฟลเดอร์หลักผ่านเว็บเซิร์ฟเวอร์:
```bash
http://localhost:8000/
```

### 3. เปิดด้วย Obsidian
เปิดโฟลเดอร์ `database-system` เป็น Obsidian Vault เพื่อใช้งานความสามารถ:
* กราฟความสัมพันธ์ของเนื้อหา (Graph View)
* การลิงก์ระหว่างบทความด้วย `[[Internal Links]]`
* Callouts สรุปประเด็น (`[!DEFINITION]`, `[!WARNING]`, `[!SUMMARY]`)

---

## 📖 หัวข้อการเรียนรู้หลัก (Course Syllabus & Topics)

1. **Database Concepts & DBMS Architecture:** File Systems vs. Database Systems, Data Independence, Three-Schema Architecture
2. **Relational Data Model & Relational Algebra:** Relations, Tuples, Attributes, Keys (Super, Candidate, Primary, Foreign), Relational Operators ($\sigma$, $\pi$, $\bowtie$, $\cup$, $\cap$, $-$)
3. **Conceptual Data Modeling (ER/EER):** Entities, Relationships, Cardinality Ratios, Specialization/Generalization
4. **SQL Fundamentals (DDL, DML, DQL):** `CREATE`, `ALTER`, `DROP`, `INSERT`, `UPDATE`, `DELETE`, `SELECT`, `JOIN`, Subqueries, Views, Aggregations
5. **Database Normalization:** Functional Dependencies, Anomalies (Insertion, Deletion, Update), 1NF, 2NF, 3NF, BCNF, Multi-valued Dependencies (4NF), Join Dependencies (5NF)
6. **Transaction Processing & Concurrency Control:** ACID Properties, Schedules, Serializability, Two-Phase Locking (2PL), Deadlocks, Database Recovery

---

## 👨‍💻 ผู้จัดทำ (Author)

* **kanomoo** ([GitHub Profile](https://github.com/kanomoo))
* จัดทำขึ้นเพื่อใช้ในการศึกษาและการค้นคว้าประกอบรายวิชา Database Systems
