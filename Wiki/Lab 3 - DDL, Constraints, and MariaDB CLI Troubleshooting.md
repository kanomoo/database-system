# Lab 3: DDL, Constraints, Character Sets, and MariaDB CLI Troubleshooting

- **วันที่สอน:** วันอังคารที่ 22 กันยายน 2569
- **ผู้สอน:** ดร.สวาท (Dr. Sawat)
- **ไฟล์เสียงอ้างอิง:** [Transcripts/20260922_131058.txt](file:///C:/Project/database-system/Transcripts/20260922_131058.txt)
- **ภาพประกอบกระดาน:** `images/IMG_20260922_142452_298@-1416416793.jpg`, `images/IMG_20260922_142503_490@2024331400.jpg`, `images/IMG_20260922_124841_660@1996423590.jpg`

---

## 1. จุดประสงค์ของปฏิบัติการ

1. เข้าใจความแตกต่างระหว่าง **DDL (Data Definition Language)** และ **DML (Data Manipulation Language)**
2. สามารถเปิดและควบคุมการทำงานของฐานข้อมูล MariaDB/MySQL ผ่าน Command Prompt (CMD)
3. เข้าใจการกำหนด Character Set `utf8mb4` เพื่อป้องกันปัญหาการบันทึกภาษาไทยและ Emoji ผิดเพี้ยน
4. สามารถกำหนด Primary Key (PK), Foreign Key (FK) และ Referential Integrity Constraints (`ON DELETE CASCADE`, `ON UPDATE CASCADE`) ได้อย่างถูกต้อง
5. วิเคราะห์และแก้ไขข้อผิดพลาดในการปรับเปลี่ยนโครงสร้างคอลัมน์ โดยเฉพาะ **MariaDB ERROR 1074 (Column length too big)**

---

## 2. ขั้นตอนการเริ่มระบบ MariaDB CLI ผ่าน XAMPP

```bat
:: 1. สั่งรัน XAMPP Service ผ่าน Command Line
cd C:\xampp
xampp_start.exe

:: 2. เข้าสู่ MariaDB Client ด้วยผู้ใช้ root
cd C:\xampp\mysql\bin
mysql.exe -u root
```

เมื่อเข้าสู่ระบบสำเร็จ จะเห็น Prompt แสดงสถานะ:
```text
MariaDB [(none)]>
```

---

## 3. การสร้างฐานข้อมูลและตารางพร้อม Constraints (DDL)

### 3.1 การสร้างฐานข้อมูลพร้อม Character Set utf8mb4
```sql
CREATE DATABASE store_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE store_db;
```

### 3.2 การสร้างตารางที่มีความสัมพันธ์ (Primary Key & Foreign Key)
```sql
-- 1. ตารางคำนำหน้าชื่อ (Parent Table)
CREATE TABLE Title (
    TitleID VARCHAR(4) NOT NULL,
    TitleName VARCHAR(50) NOT NULL,
    PRIMARY KEY (TitleID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. ตารางลูกค้า (Child Table ของ Title)
CREATE TABLE Customer (
    CustomerID INT AUTO_INCREMENT,
    CustomerName VARCHAR(100) NOT NULL,
    Telephone VARCHAR(20),
    TitleID VARCHAR(4),
    PRIMARY KEY (CustomerID),
    CONSTRAINT fk_customer_title FOREIGN KEY (TitleID) 
        REFERENCES Title(TitleID) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. ตารางคำสั่งซื้อ (Child Table ของ Customer)
CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT,
    OrderDate DATE NOT NULL,
    CustomerID INT NOT NULL,
    TotalAmount DECIMAL(10, 2) DEFAULT 0.00,
    PRIMARY KEY (OrderID),
    CONSTRAINT fk_orders_customer FOREIGN KEY (CustomerID) 
        REFERENCES Customer(CustomerID) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 4. กรณีศึกษาจุดผิดพลาดสำคัญ: MariaDB ERROR 1074 (42000)

### 4.1 ข้อผิดพลาดที่เกิดขึ้นบนหน้าจอ CLI (ดูภาพ `IMG_20260922_142452`)
เมื่อพยายามขยายความยาวคอลัมน์ `TitleDescription` เป็น `CHAR(500)`:
```sql
ALTER TABLE Title MODIFY COLUMN TitleDescription CHAR(500);
```
ระบบจะรายงานข้อผิดพลาด:
```text
ERROR 1074 (42000): Column length too big for column 'TitleDescription' (max = 255); use BLOB or TEXT instead
```

### 4.2 การวิเคราะห์สาเหตุและวิธีแก้ไข
- **สาเหตุ:** ชนิดข้อมูล `CHAR` ใน MariaDB/MySQL เป็น Fixed-Length String กำหนดความยาวได้สูงสุดไม่เกิน **255 ตัวอักษร** หากกำหนดเกิน 255 ระบบจะไม่ยอมรับ
- **แนวทางแก้ไข:**
  1. หากต้องการเก็บข้อความยาว 500 ตัวอักษร ให้เปลี่ยนไปใช้ชนิดข้อมูล `VARCHAR(500)` (Variable-Length String):
     ```sql
     ALTER TABLE Title MODIFY COLUMN TitleDescription VARCHAR(500);
     ```
  2. หากต้องการคงชนิดข้อมูลเป็น `CHAR` จะต้องปรับขนาดไม่ให้เกิน 255:
     ```sql
     ALTER TABLE Title MODIFY COLUMN TitleDescription CHAR(255);
     ```

---

## 5. การสร้างและจัดการ Index (ดัชนีสืบค้น)

```sql
-- สร้าง Index สำหรับคอลัมน์ Telephone เพื่อเพิ่มความเร็วในการสืบค้นเบอร์โทรศัพท์
CREATE INDEX idx_customer_tel ON Customer(Telephone);

-- ตรวจสอบ Index ทั้งหมดในตาราง
SHOW INDEX FROM Customer;

-- ลบ Index เมื่อไม่จำเป็นต้องใช้งาน
ALTER TABLE Customer DROP INDEX idx_customer_tel;
```

---

## 6. คำสั่งจัดการข้อมูล (DML Fundamentals)

```sql
-- 1. การเพิ่มข้อมูล (INSERT)
INSERT INTO Title (TitleID, TitleName) VALUES 
('T001', 'Mr.'),
('T002', 'Ms.'),
('T003', 'Mrs.');

-- 2. การเรียกดูข้อมูล (SELECT)
SELECT * FROM Title;

-- 3. การแก้ไขข้อมูล (UPDATE)
UPDATE Customer 
SET Telephone = '081-999-8888' 
WHERE CustomerID = 1;

-- 4. การลบข้อมูล (DELETE vs TRUNCATE)
DELETE FROM Customer WHERE CustomerID = 1;  -- ลบทีละแถวตามเงื่อนไข (Rollback ได้)
TRUNCATE TABLE Orders;                     -- ล้างตารางและรีเซ็ต AUTO_INCREMENT (เร็วกว่า Rollback ไม่ได้)
```
