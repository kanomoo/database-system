# Voice Data Integration & Architectural Ingestion Guide
## Project: database-system (Relational DB & SQL Web Hub)

เอกสารฉบับนี้จัดทำขึ้นเพื่อระบุโครงสร้างสถาปัตยกรรมของโครงการ `database-system` อย่างละเอียดที่สุด และกำหนดแนวทางการบูรณาการข้อมูลการถอดความเสียง (Voice Transcripts), ภาพกระดาน/สไลด์ (Board Photos), โค้ดคำสั่ง SQL DDL/DML, และการแก้ไขข้อผิดพลาดระบบฐานข้อมูล MariaDB เข้าสู่ระบบ Web Wiki อย่างเป็นระบบ

---

## 1. การวิเคราะห์โครงสร้างโครงการ (Project Architectural Inventory)

โครงสร้างโฟลเดอร์ของ `C:\Project\database-system\` ประกอบด้วย:

```text
C:\Project\database-system\
├── build-wiki.js                   <-- สคริปต์คอมไพล์เอกสาร Markdown ใน Wiki/ สู่ wiki-data.js
├── index.html                      <-- หน้าแรกของเว็บแอปพลิเคชันหลัก
├── Transcripts/                    <-- แหล่งจัดเก็บ Verbatim Transcripts (.txt) จากไฟล์เสียงทุกสัปดาห์
├── Wiki/                           <-- บทเรียนและเอกสารประกอบคำสอน
│   ├── images/                     <-- ภาพประกอบ (IMG_20260922_*)
│   ├── app.js / styles.css         <-- ฝั่ง Frontend Web UI
│   ├── wiki-data.js                <-- ฐานข้อมูล JSON บทความทั้งหมดที่ build แล้ว
│   └── Lab 3 - DDL, Constraints... <-- เอกสารปฏิบัติการ DDL/DML และ Error 1074
├── Lab/ & SqlLab/                  <-- แบบฝึกหัด SQL และโจทย์แล็บ
└── Lectures/                       <-- สไลด์และเอกสารการบรรยาย
```

---

## 2. แผนที่การนำข้อมูลเสียงและภาพเข้าสู่โปรเจกต์ (Voice & Image Ingestion Mapping)

| ข้อมูลนำเข้าจาก `C:\Project\Voice\` | ปลายทางใน `database-system\` | วัตถุประสงค์และการประมวลผล |
| :--- | :--- | :--- |
| **ไฟล์เสียงดิบ (.aac)** | ย้ายไป `C:\Project\Voice\Success\` | **ห้ามก๊อปปี้ไฟล์เสียงเข้าโปรเจกต์เด็ดขาด** เพื่อประหยัดพื้นที่จัดเก็บ |
| **Verbatim Transcript (.txt)** | `Transcripts/20260922_131058.txt` | จัดเก็บเป็นเอกสารอ้างอิงคำต่อคำ 100% |
| **ภาพถ่ายจอ MariaDB CLI (3 ภาพ)** | `Wiki/images/IMG_20260922_*` | แสดงหลักฐานข้อผิดพลาด `ERROR 1074` และโครงสร้าง phpMyAdmin |
| **บทเรียนปฏิบัติการแล็บ** | `Wiki/Lab 3 - DDL, Constraints, and MariaDB CLI Troubleshooting.md` | บันทึกคำสั่ง DDL, DML, `ALTER TABLE`, `ON DELETE CASCADE`, ดัชนี Index |
| **การคอมไพล์เว็บ** | `node build-wiki.js` | ซิงค์ข้อมูลเข้าสู่ `wiki-data.js` สำหรับแสดงผลในเว็บทันที |

---

## 3. สรุปสาระสำคัญและจุดลวงในข้อสอบปฏิบัติการ (Lab Exam Traps)

1. **ข้อจำกัดของ `CHAR` vs `VARCHAR` (ERROR 1074):**
   - ข้อผิดพลาด: `ALTER TABLE Title MODIFY COLUMN TitleDescription CHAR(500);`
   - เกิดข้อผิดพลาด `ERROR 1074 (42000): Column length too big (max = 255)`
   - เหตุผล: `CHAR` เก็บได้สูงสุด 255 ตัวอักษร หากต้องการ 500 ต้องใช้ `VARCHAR(500)` หรือ `TEXT`
2. **การตั้งค่า Character Set ป้องกันภาษาไทยเพี้ยน:**
   - ใช้ `utf8mb4` ร่วมกับ `COLLATE utf8mb4_unicode_ci` (4 ไบต์/ตัวอักษร รองรับ Emoji และภาษาไทยครบถ้วน)
3. **Referential Integrity Constraints:**
   - ใช้ `ON DELETE CASCADE` และ `ON UPDATE CASCADE` ป้องกันปัญหา Orphan Records

---

## 4. ขั้นตอนการคอมไพล์เว็บ (Web Build Instructions)

หลังจากเพิ่มหรือแก้ไขไฟล์ Markdown ใน `Wiki/` ให้รันคำสั่ง:
```bash
node build-wiki.js
```
เพื่ออัปเดตไฟล์ `wiki-data.js` สำหรับแสดงผลใน UI หน้าเว็บ
