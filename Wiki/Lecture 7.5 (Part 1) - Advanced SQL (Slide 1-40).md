---
tags:
  - database
  - sql
  - advanced-sql
  - lecture-7-5
created: 2026-07-07
updated: 2026-07-07
lecture: 7.5
type: lecture
---

# Lecture 7.5: Advanced SQL (เจาะลึกคำสั่ง SQL) - Part 1 (Slide 1-40)

> [!SUMMARY] ภาพรวมบทเรียน (Slides 1-40)
> บทเรียนนี้เป็นการนำทฤษฎี SQL มาประยุกต์ใช้กับกรณีศึกษาจริง (Case Study) ผ่านโครงสร้างตารางระบบร้านค้า (Customer, Product, Orders ฯลฯ) โดยจะเริ่มตั้งแต่การสร้างตาราง การใส่ข้อมูล (Data) ไปจนถึงโจทย์คำถามสืบค้น (Questions) แบบเจาะลึกทีละสไลด์ (1-40) ไม่มีรวบรัด

---

## 🗣️ Slide 1: Structured query language (SQL)
**ภาษาสำหรับการสืบค้นข้อมูลที่มีโครงสร้าง**

บทเรียนนี้เปิดตัวด้วยหัวข้อ Structured Query Language (SQL) ซึ่งจะเน้นไปที่การลงมือปฏิบัติจริง (Hands-on) กับโครงสร้างตารางข้อมูลภาษาไทย

---

## 🔤 Slide 2: SQL
**หมวดหมู่คำสั่งหลักของ SQL**

เนื้อหาของ SQL ในบทเรียนนี้จะถูกแบ่งออกเป็น 2 หมวดหมู่ยักษ์ใหญ่:
1. **Data Definition Language (DDL):** กลุ่มคำสั่งนิยามและสร้างโครงสร้าง (สร้างบ้าน)
2. **Data Manipulation Language (DML):** กลุ่มคำสั่งจัดการข้อมูล (เอาเฟอร์นิเจอร์เข้าบ้าน)

---

## 🏗️ Slide 3: DDL
**คำสั่งกลุ่ม Data Definition Language**

สรุปคำสั่ง DDL ที่จะใช้งานจริง:
- **CREATE TABLE:** ใช้สำหรับสร้างตารางใหม่เอี่ยม
- **ALTER TABLE:** ใช้แก้ไขโครงสร้างตารางเดิม (เช่น เพิ่ม/ลดคอลัมน์)
- **DROP TABLE:** ใช้ลบตารางทิ้งไปจากสารบบ
- **CREATE INDEX:** ใช้สร้างดัชนี (Search key) เพื่อเร่งความเร็วการสืบค้น
- **DROP INDEX:** ใช้ลบดัชนีทิ้ง

---

## 📦 Slide 4: DML
**คำสั่งกลุ่ม Data Manipulation Language**

สรุปคำสั่ง DML ที่ใช้เล่นกับข้อมูล:
- **INSERT INTO:** ใช้โยนข้อมูลใหม่เข้าไปในตาราง
- **UPDATE:** ใช้แก้ไขข้อมูลเก่าที่อยู่ในตาราง
- **DELETE:** ใช้ลบข้อมูลเป็นบรรทัดๆ ออกจากตาราง
- **SELECT:** ใช้สกัดและดึงข้อมูลออกมาดู (คำสั่งที่ใช้บ่อยที่สุด)

---

## 🗄️ Slide 5: DDL – CREATE DATABASE
**การสร้างและลบฐานข้อมูล**

- **ไวยากรณ์สร้าง:** `CREATE DATABASE database_name`
- **ตัวอย่าง:** `CREATE DATABASE myDB;`
- **ตัวอย่างขั้นสูง (ตั้งค่าภาษาไทย):** 
  `CREATE DATABASE MyDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;` 
  *(สำคัญมาก: การใส่ utf8 จะทำให้ฐานข้อมูลอ่านภาษาไทยได้ไม่เป็นภาษาต่างดาว)*
- **ไวยากรณ์ลบ:** `DROP DATABASE database_name`
- **ตัวอย่างลบ:** `DROP DATABASE myDB;`

---

## 📋 Slide 6: TABLE (Title)
**โครงสร้างตารางคำนำหน้าชื่อ (Title)**

> [!INFO] โครงสร้างตาราง (Schema)
> 
> | # | Name | Type | Collation |
> |---|---|---|---|
> | 1 | TitleID | varchar(4) | utf8_unicode_ci |
> | 2 | TitleName | varchar(255) | utf8_unicode_ci |
> 
> **คำอธิบาย:**
> - `TitleID` (รหัสคำนำหน้าชื่อ) เป็นข้อความสั้น 4 ตัวอักษร (Primary Key)
> - `TitleName` (คำนำหน้าชื่อ) เช่น นาย, นาง, นางสาว

---

## 🧑‍🤝‍🧑 Slide 7: TABLE (Customer)
**โครงสร้างตารางลูกค้า (Customer)**

> [!INFO] โครงสร้างตาราง (Schema)
> 
> | # | Name | Type |
> |---|---|---|
> | 1 | CustomerID | int(11) |
> | 2 | TitleID | varchar(4) |
> | 3 | NameSurname | varchar(255) |
> | 4 | Gender | char(10) |
> | 5 | Email | varchar(255) |
> | 6 | Address | varchar(255) |
> | 7 | Telephone | varchar(10) |
> 
> **คำอธิบาย:**
> เก็บรหัสลูกค้า, รหัสคำนำหน้าชื่อ (FK ไปหาตาราง Title), ชื่อ-นามสกุล, เพศ, อีเมล, ที่อยู่, โทรศัพท์

---

## 🏷️ Slide 8: TABLE (Category)
**โครงสร้างตารางหมวดหมู่สินค้า (Category)**

> [!INFO] โครงสร้างตาราง (Schema)
> 
> | # | Name | Type |
> |---|---|---|
> | 1 | CategoryID | varchar(4) |
> | 2 | CategoryName | varchar(255) |
> | 3 | CategoryDescription | varchar(255) |
> 
> **คำอธิบาย:**
> เก็บรหัสหมวดหมู่ (เช่น c001), ชื่อหมวดหมู่ (เช่น Food), คำอธิบาย (เช่น อาหาร)

---

## 📏 Slide 9: TABLE (Unit)
**โครงสร้างตารางหน่วยนับ (Unit)**

> [!INFO] โครงสร้างตาราง (Schema)
> 
> | # | Name | Type |
> |---|---|---|
> | 1 | UnitID | varchar(4) |
> | 2 | UnitName | varchar(255) |
> 
> **คำอธิบาย:**
> เก็บรหัสหน่วยนับ (เช่น u001), ชื่อหน่วยนับ (เช่น กล่อง, ขวด, ชิ้น)

---

## 🛍️ Slide 10: TABLE (Product)
**โครงสร้างตารางสินค้า (Product)**

> [!INFO] โครงสร้างตาราง (Schema)
> 
> | # | Name | Type |
> |---|---|---|
> | 1 | ProductID | varchar(4) |
> | 2 | CategoryID | varchar(4) |
> | 3 | ProductName | varchar(255) |
> | 4 | Price | double |
> | 5 | Quantity | int(11) |
> | 6 | UnitID | varchar(4) |
> 
> **คำอธิบาย:**
> เก็บรหัสสินค้า, หมวดหมู่ (FK), ชื่อสินค้า, ราคา (ทศนิยม), จำนวนคงเหลือ, รหัสหน่วยนับ (FK)

---

## 🛒 Slide 11: TABLE (Orders)
**โครงสร้างตารางใบสั่งซื้อหลัก (Orders)**

> [!INFO] โครงสร้างตาราง (Schema)
> 
> | # | Name | Type |
> |---|---|---|
> | 1 | OrdersID | varchar(4) |
> | 2 | CustomerID | int(11) |
> | 3 | OrdersDate | date |
> 
> **คำอธิบาย:**
> เก็บรหัสใบสั่งซื้อ (บิล), รหัสลูกค้าที่มาซื้อ (FK), และวันที่ทำการสั่งซื้อ

---

## 🧾 Slide 12: TABLE (OrdersDetail)
**โครงสร้างตารางรายละเอียดใบสั่งซื้อ (OrdersDetail)**

> [!INFO] โครงสร้างตาราง (Schema)
> 
> | # | Name | Type |
> |---|---|---|
> | 1 | OrdersDetailID | varchar(4) |
> | 2 | OrdersID | varchar(4) |
> | 3 | ProductID | varchar(4) |
> | 4 | Amount | int(11) |
> 
> **คำอธิบาย:**
> บิลหนึ่งใบ (OrdersID) สามารถมีสินค้าได้หลายชิ้น ตารางนี้จะแจกแจงว่าบิลไหน ซื้อสินค้าอะไร (ProductID) จำนวนกี่ชิ้น (Amount)

---

## 🛠️ Slide 13: DDL - CREATE TABLE
**การสร้างตารางเบื้องต้น**

- **ไวยากรณ์:** `CREATE TABLE table_name ( column1 type, column2 type... )`
- **ตัวอย่างสร้างตาราง Title:**
  ```sql
  CREATE TABLE Title
  (
    TitleID VARCHAR(4),
    TitleName VARCHAR(255) 
  );
  ```

---

## 🔑 Slide 14: DDL - CREATE TABLE (con't)
**การสร้างตารางพร้อมกำหนด Primary Key และภาษาไทย**

> [!EXAMPLE] โค้ดที่สมบูรณ์ขึ้น
> 
> ```sql
> CREATE TABLE Title
> (
>   TitleID VARCHAR(4) PRIMARY KEY,
>   TitleName VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci
> ); 
> ```
> *(วิเคราะห์: การใส่ `PRIMARY KEY` หลังตัวแปรเป็นการประกาศให้มันเป็นกุญแจหลักทันที และการใส่ `CHARACTER SET utf8` กำกับคอลัมน์ จะรับประกันว่าคอลัมน์นี้พิมพ์ภาษาไทยได้แน่นอน)*

---

## 🔧 Slide 15: DDL – ALTER TABLE
**การแก้ไขโครงสร้างตาราง**

- **เพิ่มคอลัมน์ (ADD):**
  `ALTER TABLE Title ADD TitleDescription INT;`
- **แก้ไขชนิดข้อมูล (MODIFY COLUMN):**
  `ALTER TABLE Title MODIFY COLUMN TitleDescription CHAR(500);` (เปลี่ยนจาก INT เป็นอักขระ 500 ตัว)
- **ลบคอลัมน์ทิ้ง (DROP COLUMN):**
  `ALTER TABLE Title DROP COLUMN TitleDescription;`

---

## 🗝️ Slide 16: DDL – ALTER TABLE (con't)
**การปรับปรุงกุญแจหลักทีหลัง**

ในกรณีที่สร้างตารางไปแล้วลืมตั้ง Primary Key หรืออยากเปลี่ยนใจ:
- **เพิ่ม Primary Key ทีหลัง:**
  `ALTER TABLE table_name ADD PRIMARY KEY (NewPrimaryKeyColumn1);`
- **ลบ Primary Key ทิ้ง:**
  `ALTER TABLE table_name DROP PRIMARY KEY;`

---

## 🗑️ Slide 17: DDL – DROP TABLE
**การลบตาราง**

- **ไวยากรณ์:** `DROP TABLE table_name`
- **ตัวอย่าง:** `DROP TABLE Category;` (ตารางหมวดหมู่และข้อมูลข้างในจะมลายหายไปทันที)

---

## ⚡ Slide 18: DDL – CREATE INDEX
**การสร้างดัชนีเร่งความเร็ว**

- **ดัชนีธรรมดา (ซ้ำได้):**
  `CREATE INDEX idxNameSurname ON Customer (NameSurname);` (สร้างดัชนีให้ชื่อ-นามสกุลลูกค้าเพื่อให้เสิร์ชชื่อเร็วขึ้น)
- **ดัชนีแบบไม่ซ้ำ (Unique Index):**
  `CREATE UNIQUE INDEX idxTelephone ON Customer (Telephone);` (นอกจากเร่งความเร็วแล้ว ยังบังคับว่าเบอร์โทรศัพท์ลูกค้าทุกคนห้ามซ้ำกันด้วย!)

---

## 🧹 Slide 19: DDL – DROP INDEX
**การลบดัชนี**

- **ไวยากรณ์:** `ALTER TABLE table_name DROP INDEX index_name;`
- **ตัวอย่าง:** 
  `ALTER TABLE Customer DROP INDEX idxNameSurname;` (เมื่อรู้สึกว่า Index ตัวนี้ทำให้ระบบช้าลงตอน Insert ก็สามารถสั่งลบทิ้งได้)

---

## 🗃️ Slide 20: DATA (Title)
**ข้อมูลในตารางคำนำหน้าชื่อ**

> [!EXAMPLE] Trace Table: Title
> 
> | TitleID | TitleName |
> |---|---|
> | t001 | นาย |
> | t002 | นางสาว |
> | t003 | นาง |
> | t004 | เด็กชาย |
> | t005 | เด็กหญิง |

---

## 👥 Slide 21: DATA (Customer)
**ข้อมูลในตารางลูกค้า**

> [!EXAMPLE] Trace Table: Customer
> 
> | CustomerID | TitleID | NameSurname | Gender | Email | Address | Telephone |
> |---|---|---|---|---|---|---|
> | 1 | t002 | ฟ้า | หญิง | s@gmail.com | กรุงเทพฯ | 0911111111 |
> | 2 | t001 | เหลือง | ชาย | y@gmail.com | เชียงใหม่ | 0622222222 |
> | 3 | t001 | เขียว | ชาย | g@gmail.com | ภูเก็ต | 0833333333 |
> | 4 | t005 | ชมพู | หญิง | p@gmail.com | นครสวรรค์ | 0844444444 |
> | 5 | t004 | ขาว | ชาย | w@gmail.com | จันทบุรี | 0955555555 |
> | 6 | t001 | ขาว | ชาย | w6@gmail.com | เพชรบูรณ์ | 0966666666 |
> | 7 | t001 | ขาว | ชาย | w7@gmail.com | กำแพงเพชร | 0977777777 |
> | 8 | t002 | ขาว | หญิง | w8@gmail.com | ชุมพร | 0988888888 |

---

## 🏷️ Slide 22: DATA (Category)
**ข้อมูลในตารางหมวดหมู่สินค้า**

> [!EXAMPLE] Trace Table: Category
> 
> | CategoryID | CategoryName | CategoryDescription |
> |---|---|---|
> | c001 | Food | อาหาร |
> | c002 | Beverage | เครื่องดื่ม |
> | c003 | Stationery | เครื่องเขียน |
> | c004 | Medicine | ยารักษาโรค |

---

## 📏 Slide 23: DATA (Unit)
**ข้อมูลในตารางหน่วยนับ**

> [!EXAMPLE] Trace Table: Unit
> 
> | UnitID | UnitName |
> |---|---|
> | u001 | กล่อง |
> | u002 | ขวด |
> | u003 | ด้าม |
> | u004 | แผง |
> | u005 | ซอง |

---

## 🛍️ Slide 24: DATA (Product)
**ข้อมูลในตารางสินค้า**

> [!EXAMPLE] Trace Table: Product
> 
> | ProductID | CategoryID | ProductName | Price | Quantity | UnitID |
> |---|---|---|---|---|---|
> | p001 | c001 | เลย์ | 20 | 100 | u005 |
> | p002 | c002 | น้ำชาเขียว | 40 | 200 | u002 |
> | p003 | c001 | โคลอน | 30 | 300 | u001 |
> | p004 | c004 | พาราเซตามอล | 15 | 400 | u004 |
> | p005 | c003 | ปากกา | 50 | 500 | u003 |

---

## 🛒 Slide 25: DATA (Orders)
**ข้อมูลในตารางบิลสั่งซื้อ**

> [!EXAMPLE] Trace Table: Orders
> 
> | OrdersID | CustomerID | OrdersDate |
> |---|---|---|
> | o001 | 3 | 2024-09-22 |
> | o002 | 4 | 2024-09-22 |

---

## 🧾 Slide 26: DATA (OrdersDetail)
**ข้อมูลในตารางรายละเอียดการสั่งซื้อ**

> [!EXAMPLE] Trace Table: OrdersDetail
> 
> | OrdersDetailID | OrdersID | ProductID | Amount |
> |---|---|---|---|
> | d001 | o001 | p001 | 10 |
> | d002 | o001 | p003 | 20 |
> | d003 | o002 | p002 | 30 |
> | d004 | o002 | p003 | 40 |
> | d005 | o002 | p004 | 50 |
> | d006 | o002 | p005 | 60 |

---

## 📥 Slide 27: DML – INSERT INTO
**การเพิ่มข้อมูลใหม่**

> [!EXAMPLE] โค้ดเพิ่มหมวดหมู่สินค้า
> 
> **แบบที่ 1: ระบุคอลัมน์**
> ```sql
> INSERT INTO Category (CategoryID, CategoryName, CategoryDescription) 
> VALUES ('c001', 'Convenience Goods', 'สินค้าสะดวกซื้อ');
> ```
> 
> **แบบที่ 2: ไม่ระบุคอลัมน์ (บังคับใส่ครบทุกช่อง)**
> ```sql
> INSERT INTO category VALUES ('c004', 'Unsought Goods', 'สินค้าไม่แสวงซื้อ');
> ```

---

## ➕ Slide 28: DML – INSERT INTO (con't)
**ตัวอย่างการ Insert ข้อมูลรัวๆ**

> [!EXAMPLE]
> ```sql
> INSERT INTO Category VALUES ('c003', 'Specialty Goods', 'สินค้าเจาะจงซื้อ');
> ```

---

## ✏️ Slide 29: DML – UPDATE
**การแก้ไขข้อมูลที่มีอยู่แล้ว**

- **อัปเดต 1 คอลัมน์:**
  `UPDATE Category SET CategoryName = 'Shopping Goods' WHERE CategoryID = 'c002';`
- **อัปเดต 2 คอลัมน์พร้อมกัน (ใช้ลูกน้ำคั่น):**
  `UPDATE Category SET CategoryName = 'Food', CategoryDescription = 'อาหาร' WHERE CategoryID = 'c001';`

---

## ❌ Slide 30: DML – DELETE
**การลบข้อมูลและการล้างไพ่**

- **ล้างข้อมูลทั้งตาราง (ทิ้งซากโครงสร้างไว้):**
  `TRUNCATE TABLE table_name`
- **ลบทุกบรรทัด (แต่ล็อคไฟล์ช้ากว่า):**
  `DELETE FROM table_name`
- **ลบเฉพาะบรรทัดที่เข้าเงื่อนไข:**
  `DELETE FROM Category WHERE CategoryID = 'c002';`

---

## 👁️ Slide 31: DML – SELECT
**การดึงข้อมูลพื้นฐานและโจทย์ทดสอบ**

- ดึงมาทุกคอลัมน์: `SELECT * FROM Title;`
- **Question (โจทย์):** ให้ดึง รหัสลูกค้า, รหัสคำนำหน้า, ชื่อสกุล, อีเมล จากตารางลูกค้า
- **คำตอบ (Solution):** 
  `SELECT CustomerID, TitleID, NameSurname, Email FROM Customer;`

---

## 🔍 Slide 32: DML – SELECT (Question)
**โจทย์: ค้นหารายละเอียดสินค้า**

> [!EXAMPLE] Trace Table: การดึงคอลัมน์เจาะจง
> 
> **โจทย์:** สืบค้นสินค้าโดยมีรายละเอียด ProductID, ProductName, Price, Quantity
> **คำตอบสมมติ:** `SELECT ProductID, ProductName, Price, Quantity FROM Product;`
> 
> **ผลลัพธ์ที่ได้ (Result):**
> 
> | ProductID | ProductName | Price | Quantity |
> |---|---|---|---|
> | p001 | เลย์ | 20 | 100 |
> | p002 | น้ำชาเขียว | 40 | 200 |
> | p003 | โคลอน | 30 | 300 |
> | p004 | พาราเซตามอล | 15 | 400 |
> | p005 | ปากกา | 50 | 500 |

---

## 🧹 Slide 33: DML – SELECT (DISTINCT)
**การคัดกรองข้อมูลตัวซ้ำ**

- ยุบชื่อซ้ำ: `SELECT DISTINCT NameSurname FROM Customer;`
- ยุบชื่อและเพศซ้ำ: `SELECT DISTINCT NameSurname, Gender FROM Customer;`
- **Question (โจทย์):** `SELECT DISTINCT NameSurname, Gender, Email FROM Customer;`
  *(วิเคราะห์: การทำ Distinct 3 คอลัมน์แปลว่า ต้องซ้ำกันเป๊ะๆ ทั้งชื่อ เพศ และอีเมล ถึงจะถูกยุบรวมเป็นบรรทัดเดียว)*

---

## 🎯 Slide 34: DML – SELECT (WHERE)
**การกรองข้อมูลด้วยเงื่อนไข**

- **ตัวอย่าง:** `SELECT CustomerID, NameSurname, Address FROM Customer WHERE NameSurname='ขาว';` 
  *(คัดมาเฉพาะลูกค้าที่ชื่อ 'ขาว' เท่านั้น)*

---

## 📉 Slide 35: DML – SELECT (WHERE Question 1)
**โจทย์: ค้นหาสินค้าราคาถูก**

> [!EXAMPLE] Trace Table: กรองราคาน้อยกว่า 40
> 
> **โจทย์:** สืบค้นสินค้าที่มีราคาน้อยกว่า 40 บาท โดยแสดงชื่อสินค้า ราคา จำนวน
> **คำตอบ (Code):** `SELECT ProductName, Price, Quantity FROM Product WHERE Price < 40;`
> 
> **ผลลัพธ์ที่ได้ (Result):**
> 
> | ProductName | Price | Quantity |
> |---|---|---|
> | เลย์ | 20 | 100 |
> | โคลอน | 30 | 300 |
> | พาราเซตามอล | 15 | 400 |

---

## 📊 Slide 36: DML – SELECT (WHERE Question 2)
**โจทย์: ค้นหาสินค้าราคาแพงกว่าค่าเฉลี่ย**

> [!EXAMPLE] Trace Table: กรองราคาผ่าน Subquery
> 
> **โจทย์:** สืบค้นสินค้าที่ราคาสินค้ามากกว่าราคาเฉลี่ยสินค้า โดยแสดง ชื่อสินค้า และราคา
> **คำตอบ (Code):** 
> `SELECT ProductName, Price FROM Product WHERE Price > (SELECT AVG(Price) FROM Product);`
> *(หมายเหตุ: ค่าเฉลี่ยราคาคือ (20+40+30+15+50)/5 = 31 บาท)*
> 
> **ผลลัพธ์ที่ได้ (Result):**
> 
> | ProductName | Price |
> |---|---|
> | น้ำชาเขียว | 40 |
> | ปากกา | 50 |

---

## 🗂️ Slide 37: DML – SELECT (GROUP BY)
**การจัดกลุ่มข้อมูล**

- **ตัวอย่างการนับจำนวนคนแยกตามเพศ:**
  `SELECT Gender, COUNT(Gender) FROM Customer GROUP BY Gender;`
  *(ระบบจะแยกกลุ่มชายและหญิง แล้วนับหัวว่าแต่ละเพศมีกี่คน)*

---

## 👥 Slide 38: DML – SELECT (GROUP BY Question)
**โจทย์: นับจำนวนคนชื่อซ้ำ**

> [!EXAMPLE] Trace Table: จัดกลุ่มตามชื่อ
> 
> **โจทย์:** สืบค้นชื่อลูกค้าโดยต้องการทราบว่าแต่ละชื่อลูกค้ามีชื่อเหมือนกันกี่คน
> **คำตอบ (Code):** `SELECT NameSurname, COUNT(NameSurname) FROM Customer GROUP BY NameSurname;`
> 
> **ผลลัพธ์ที่ได้ (Result):**
> 
> | NameSurname | COUNT(NameSurname) |
> |---|---|
> | ขาว | 4 |
> | ชมพู | 1 |
> | ฟ้า | 1 |
> | เขียว | 1 |
> | เหลือง | 1 |
> *(วิเคราะห์: เพราะมีคนชื่อ 'ขาว' ซ้ำกัน 4 คนในตาราง Customer กลุ่มของขาวจึงถูกนับได้เลข 4)*

---

## 🛡️ Slide 39: DML – SELECT (HAVING)
**การกรองผลลัพธ์หลังจัดกลุ่ม**

- **ตัวอย่าง (คัดเฉพาะชื่อที่โหลๆ ซ้ำกันเกิน 1 คน):**
  ```sql
  SELECT NameSurname, COUNT(NameSurname) 
  FROM Customer 
  GROUP BY NameSurname 
  HAVING COUNT(NameSurname) > 1;
  ```
  *(จากสไลด์ 38 ผลลัพธ์บรรทัดนี้จะคายออกมาแค่ "ขาว 4" บรรทัดเดียว เพราะคนอื่นไม่ถึงเกณฑ์ >1)*

---

## 📦 Slide 40: DML – SELECT (HAVING Question)
**โจทย์: กรองหมวดหมู่สินค้าที่มีของเยอะ**

> [!EXAMPLE] Trace Table: กรองผลรวม
> 
> **โจทย์:** สืบค้นประเภทสินค้าที่มีจำนวนสินค้ามากกว่า 300
> **คำตอบ (Code):** 
> ```sql
> SELECT CategoryID, SUM(Quantity) 
> FROM Product 
> GROUP BY CategoryID 
> HAVING SUM(Quantity) > 300;
> ```
> 
> **ผลลัพธ์ที่ได้ (Result):**
> 
> | CategoryID | SUM(Quantity) |
> |---|---|
> | c001 | 400 |
> | c003 | 500 |
> | c004 | 400 |
> *(วิเคราะห์: c001 คือ Food มี เลย์(100) + โคลอน(300) = 400 ชิ้น ผ่านเกณฑ์โจทย์)*

---

> (*Lecture 7.5 - Part 1 สิ้นสุดที่สไลด์ 40 / จะมีการนำเสนอ Part 2 ในไฟล์ถัดไปเนื่องจากความยาวเนื้อหาและตารางที่มากถึง 79 หน้าสไลด์*)

---
*Last updated: 2026-07-07*
