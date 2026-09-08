---
tags:
  - database
  - index
  - mega-guide
created: 2026-07-07
updated: 2026-07-07
type: index
---

# Database System - Comprehensive Master Index

> [!IMPORTANT] 🎯 โซนเตรียมตัวสอบปฏิบัติการเดี่ยวในชั้นเรียน (In-Class Practical Test)
> ตั้งแต่คาบหน้าเป็นต้นไป จะมีการสอบเก็บคะแนนเดี่ยวในชั่วโมงเรียน (50-60 นาที) โดยมีเนื้อหาที่ออกสอบหลัก 2 ส่วน:
> 1. **การทำ Normalization & การออกแบบแผนภาพ:** (บทที่ 4 ER Model, บทที่ 5 FDs, และ บทที่ 6 Normalization)
> 2. **การเขียนคำสั่ง SQL ตามสถานการณ์:** (บทที่ 7 SQL พื้นฐาน และ บทที่ 7.2 SQL ขั้นสูง)
> 👉 **ศึกษาคู่มือและข้อสอบจำลองได้ที่:** **[[In-Class Exam Guide - Normalization and SQL]]**

---

## 🗺️ ตารางเทียบหมวดหมู่และบทเรียนทั้งหมด (Chapter Mapping)

| หมวดหมู่ (Part) | บทเรียนในสไลด์ | เอกสารสรุปใน Wiki | ออกสอบปฏิบัติการ? |
|---|---|---|---|
| **Part 1: Foundations** | **บทที่ 1 (Ch1)** | [[Lecture 1 - Overview of Databases and Transaction Processing]] | ทฤษฎีพื้นฐาน |
| | **บทที่ 2 (Ch2)** | [[Lecture 2 - Database Architecture and Relational Model]] | ทฤษฎีพื้นฐาน |
| **Part 2: Data Modeling**| **บทที่ 3 (Ch3)** | [[Lecture 3 - Relational Algebra]] | ทฤษฎีพีชคณิต |
| | **บทที่ 4 (Ch4)** | [[Lecture 4 - ER Model]] | **🎯 ข้อสอบ: ออกแบบแผนภาพ ER** |
| **Part 3: Database Design**| **บทที่ 5 (Ch5)** | [[Lecture 5 - Functional Dependencies]] | **🎯 ข้อสอบ: วิเคราะห์ FDs** |
| | **บทที่ 6 (Ch6)** | [[Lecture 6 - Database Design and Normalization]] | **🎯 ข้อสอบ: นอร์มัลไลเซชัน (1NF-5NF)** |
| **Part 4: SQL Mastery** | **บทที่ 7 (Ch7)** | [[Lecture 7 (Part 1) - SQL Fundamentals (Slide 1-40)]]<br>[[Lecture 7 (Part 2) - SQL Fundamentals (Slide 41-80)]]<br>[[Lecture 7 (Part 3) - SQL Fundamentals (Slide 81-94)]] | **🎯 ข้อสอบ: คำสั่ง SQL, JOIN, GROUP BY** |
| | **บทที่ 7.2 (Ch7_2)** | [[Lecture 7.5 (Part 1) - Advanced SQL (Slide 1-40)]]<br>[[Lecture 7.5 (Part 2) - Advanced SQL (Slide 41-79)]] | **🎯 ข้อสอบ: Subquery, HAVING, Views** |
| **Part 5: Advanced Topics**| **บทที่ 8 (Ch8)** | [[Lecture 8 - Database System Architecture]] | ทฤษฎีระดับสูง |
| | **บทที่ 9 (Ch9)** | [[Lecture 9 - NoSQL Databases]] | ทฤษฎีระดับสูง |
| **Workshop & Exam** | **Exam Guide** | [[In-Class Exam Guide - Normalization and SQL]] | **⭐ คู่มือเตรียมสอบ & Mock Exam** |
| | **Lab Guide** | [[SQL Lab Practice Guide - Zero to Hero]] | คู่มือห้องปฏิบัติการ SQL |

---

```mermaid
mindmap
  root((DATABASE SYSTEM<br/>KNOWLEDGE BASE))
    Exam["🎯 ข้อสอบปฏิบัติการเดี่ยว"]
      Ch4["บทที่ 4 Ch4: ER Model"]
      Ch5["บทที่ 5 Ch5: Functional Dependencies"]
      Ch6["บทที่ 6 Ch6: Normalization"]
      Ch7["บทที่ 7 Ch7: SQL Fundamentals"]
      Ch72["บทที่ 7.2 Ch7_2: Advanced SQL"]
    F["Part 1: Foundations"]
      Ch1["บทที่ 1 Ch1: Overview and TPS"]
      Ch2["บทที่ 2 Ch2: Architecture and Relational Model"]
    M["Part 2: Data Modeling"]
      Ch3["บทที่ 3 Ch3: Relational Algebra"]
    A["Part 5: Advanced Topics"]
      Ch8["บทที่ 8 Ch8: Transaction Processing"]
      Ch9["บทที่ 9 Ch9: NoSQL Databases"]
```

---

# 📚 Part 1: The Foundations (รากฐาน)

รากฐานที่สำคัญที่สุดก่อนจะก้าวเข้าสู่โลกของฐานข้อมูล คือการเข้าใจว่า Database คืออะไร, DBMS ทำหน้าที่อะไร, Transaction มีความสำคัญอย่างไร และสถาปัตยกรรมระบบฐานข้อมูลถูกออกแบบมาอย่างไร

- 🔹 **[[Lecture 1 - Overview of Databases and Transaction Processing]]**
  - Database Systems Components (Data, H/W, S/W, Users)
  - Database Definition & DBMS Definition
  - Data Model (Objects + Operators)
  - Benefits of Database (7 ข้อดี)
  - Data Independence
  - Transaction Definition & Transaction Processing System
  - DB Systems: Then and Now (7 มิติเปรียบเทียบ)
  - System Requirements (6 ข้อกำหนด)
  - Roles in TPS Design & Maintenance (5 บทบาท)
- 🔹 **[[Lecture 2 - Database Architecture and Relational Model]]**
  - ANSI/SPARC 3-Level Architecture (External, Conceptual, Internal)
  - Physical, Conceptual, External Data Levels
  - Data Independence (Physical & Logical)
  - Relational Model: Relations, Tuples, Attributes, Domains
  - Relation Schema & Database Schema
  - Integrity Constraints (Static vs Dynamic, Syntactic vs Semantic)
  - Keys: Candidate, Primary, Alternate, Superkey, Foreign Key
  - Foreign Key Constraints ทุกกรณี
  - Inclusion Dependencies & Semantic Constraints

---

# 🏗️ Part 2: Data Modeling (การจำลองข้อมูล)

เจาะลึกวิธีการ query ข้อมูลด้วย Relational Algebra และการออกแบบฐานข้อมูลด้วย ER Model

- 🔹 **[[Lecture 3 - Relational Algebra]]**
  - Relational Query Languages (SQL vs RA)
  - RA ใน DBMS Pipeline (Parser → Optimizer → Code Generator)
  - Set Operators: Union, Intersection, Difference, Cartesian Product
  - Union Compatible Relations
  - Select (σ) ทุกเงื่อนไข + ตัวอย่าง
  - Project (π) + Duplicate Elimination
  - Rename Operator (ρ)
  - Theta Join, Equijoin, Natural Join + ตัวอย่าง
  - Outer Join (Left, Right, Full) + ตัวอย่าง
  - Division + ตัวอย่าง
  - Assignment Operation (←)
  - Aggregate Functions (AVG, MIN, MAX, SUM, COUNT) + GROUP BY
- 🔹 **[[Lecture 4 - ER Model]]**
  - COMPANY Database Requirements
  - ER Diagram Notation Summary (ทุกสัญลักษณ์)
  - Entities, Entity Types, Key Attributes
  - Attribute Types: Simple, Composite, Multi-valued, Derived
  - Relationships & Relationship Types
  - Cardinality Ratios (1:1, 1:N, M:N)
  - (min, max) Notation + ตัวอย่าง
  - Ternary Relationships + Constraints
  - Recursive Relationships & Role Names
  - Weak Entity Types
  - Data Modeling Tools

---

# 🔧 Part 3: Database Design (การออกแบบฐานข้อมูล)

Functional Dependencies คือพื้นฐานของ Normalization ซึ่งเป็นกระบวนการกำจัด redundancy และ update anomalies

- 🔹 **[[Lecture 5 - Functional Dependencies]]**
  - FD Basic Definitions + ตัวอย่างจริง
  - Determinant & Dependent
  - Closure of a Set of Dependencies (FD⁺)
  - Armstrong's Axioms (3 axioms + 5 derived rules)
  - General Unification Theorem (Darwen)
  - Step-by-step Proof ตัวอย่าง (R(A,B,C,G,H,I))
  - FD Diagram สำหรับ Relations S, SP, P
- 🔹 **[[Lecture 6 - Normalization]]**
  - Non-Loss Decomposition (Lossless vs Lossy)
  - 1NF: Definition + FIRST Relation + Update Anomalies
  - 2NF: Definition + SECOND/SP Relations + Remaining Problems
  - 3NF: Definition + SC/CS Relations + Decomposition Choice
  - BCNF: Definition + SJT Example + EXAM Example
  - 4NF: Multi-Valued Dependencies + CTX Example + CT/CX Solution
  - 5NF: Join Dependencies + SPJ Example + BMS Example
- 🔹 **[[Example - Normalization Step by Step]]** *(Deep Dive)*
  - Trace: FIRST → 2NF → 3NF → BCNF step-by-step

---

# 💻 Part 4: SQL (ภาษา SQL)

SQL เป็น "lingua franca" ของโลกฐานข้อมูล — ทั้งทฤษฎีและภาคปฏิบัติ

- 🔹 **[[Lecture 7 - SQL Fundamentals]]**
  - SQL Components (DDL, DML, Views, Integrity, Authorization)
  - CREATE DATABASE/TABLE/INDEX + Data Types
  - DROP TABLE/DATABASE + TRUNCATE
  - ALTER TABLE (ADD/DROP COLUMN)
  - INSERT INTO (ทุกรูปแบบ)
  - UPDATE (Single/Multiple columns)
  - DELETE (Specific/All rows)
  - SELECT: Basic, DISTINCT, WHERE, Operators
  - ORDER BY, LIKE patterns, IN, BETWEEN
  - Aliases (Column/Table)
- 🔹 **[[SQL Lab Practice Guide - Zero to Hero]]** ⭐ *(คู่มือเตรียมสอบแล็บ & Hands-on Workshop จากศูนย์ถึงโปร)*
  - Part 0: ปฐมบทการใช้งาน (วิธีสร้างไฟล์ .sql, วิธีรันผ่าน VS Code / SQLite / Web)
  - Part 1: พื้นฐาน DDL & DML (CREATE TABLE, INSERT, UPDATE, DELETE, SELECT, WHERE)
  - Part 2: คำนวณ จัดกลุ่ม เชื่อมตาราง (SUM, AVG, COUNT, GROUP BY, HAVING, JOIN, UNION, VIEW)
  - Part 3: แล็บระบบร้านค้า 7 ตารางสมบูรณ์ (สคริปต์ Clean Slate + 12 ข้อสอบจริงพร้อม Trace Table)
  - Part 4: กับดักและข้อผิดพลาดที่พบบ่อยในการสอบแล็บ
- 🔹 **[[Lecture 7.2 - SQL Practical Workshop]]**
  - Database Schema ตัวอย่าง (7 ตาราง พร้อม ER Diagram)
  - DDL: CREATE TABLE, CREATE/DROP INDEX
  - DML: INSERT INTO, UPDATE, DELETE
  - SELECT ขั้นสูง: DISTINCT, WHERE, GROUP BY, HAVING
  - ORDER BY (ASC/DESC, Multiple columns)
  - AND & OR combinations
  - LIKE patterns, IN, BETWEEN...AND
  - Aliases (AS)
  - SELECT INTO (MySQL cross-database copy)
  - JOIN: INNER, LEFT, RIGHT
  - UNION & UNION ALL
  - Aggregate Functions: COUNT, MAX, MIN, SUM
  - Subqueries with MAX/MIN
  - CREATE VIEW
- 🔹 **[[Example - SQL JOIN Operations]]** *(Deep Dive)*
  - INNER/LEFT/RIGHT JOIN traces with real data

---

# ⚙️ Part 5: Advanced Topics (หัวข้อขั้นสูง)

Transaction Processing รับประกันความถูกต้องของข้อมูล ในขณะที่ NoSQL เสนอทางเลือกสำหรับข้อมูลขนาดใหญ่

- 🔹 **[[Lecture 8 - Transaction Processing]]**
  - ACID Properties (4 คุณสมบัติ)
  - Transaction States (Active → Committed/Failed → Terminated)
  - Recovery: System Failure vs Media Failure
  - System Recovery Algorithm (UNDO/REDO Lists)
  - Two-Phase Commit (2PC) Protocol
  - Concurrency Problems (Lost Update, Uncommitted Dependency, Inconsistent Analysis)
  - Lock-Based Resolution (X-lock, S-lock)
  - Lock Compatibility Matrix
  - Simple Locking Traces (Chicago/Boston Order Example)
- 🔹 **[[Lecture 9 - NoSQL Databases]]**
  - Brief History of Databases (Timeline)
  - RDBMS Benefits & Weaknesses
  - NoSQL Definition & Characteristics
  - When / When Not to Use NoSQL
  - Schema-less Data Model (Relational vs NoSQL comparison)
  - 4 Aggregate Data Models: Key-Value, Document, Column Family, Graph
  - Cassandra vs MySQL Statistics (Facebook Search)
  - SQL vs NoSQL Comparison Table
  - CAP Theorem (Consistency, Availability, Partition Tolerance)
  - CAP Trade-offs: CA, CP, AP

---

# 📝 Learning Methodology (วิธีการเรียนรู้)

เพื่อให้ได้ประโยชน์สูงสุดจากฐานความรู้นี้ ขอแนะนำให้ผู้เรียนปฏิบัติตามแนวทางต่อไปนี้:
1. **ทฤษฎีก่อนปฏิบัติ:** ศึกษา Lecture Notes เพื่อจับหลักการทำงาน
2. **วาดตาม Diagram:** ทุกบทเรียนมี ER Diagram, FD Diagram, Mermaid ให้ผู้เรียนวาดตาม
3. **เขียน SQL ซ้ำ:** นำ SQL ตัวอย่างไปทดลองรันจริงใน MySQL/PostgreSQL
4. **ทำ Normalization ด้วยมือ:** ฝึกแยกตาราง 1NF → 5NF ด้วยตัวเอง

> *"Data is the new oil. It's valuable, but if unrefined it cannot really be used."* — Clive Humby

---
*Generated and curated autonomously.*
*System Date: 2026-07-07*
