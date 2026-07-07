---
tags:
  - database
  - sql
  - query-language
  - lecture-7
created: 2026-07-07
updated: 2026-07-07
lecture: 7
type: lecture
---

# Lecture 7: SQL Fundamentals (พื้นฐานภาษา SQL) - Part 1 (Slide 1-40)

> [!SUMMARY] ภาพรวมบทเรียน (Slides 1-40)
> บทเรียนนี้เริ่มต้นเข้าสู่ภาคปฏิบัติของการเขียนโปรแกรมฐานข้อมูลด้วยภาษา SQL (Structured Query Language) โดยจะครอบคลุมตั้งแต่การสร้างตาราง (DDL), การจัดการข้อมูล (DML) เช่น Insert, Update, Delete ไปจนถึงการคัดเลือกข้อมูลพื้นฐาน (Select) 

---

## 🗣️ Slide 1: Structured Query Language: SQL
**ภาษาสำหรับการสืบค้นข้อมูลที่มีโครงสร้าง**

สไลด์หน้าแรกเปิดตัวภาษา SQL ซึ่งเป็นภาษามาตรฐานระดับโลกที่ใช้สำหรับการคุยกับระบบจัดการฐานข้อมูล (RDBMS) ทุกยี่ห้อบนโลก

---

## 🔤 Slide 2: Introduction to SQL (What is SQL?)
**SQL คืออะไร?**

- SQL เป็นภาษาคอมพิวเตอร์มาตรฐานสำหรับการเข้าถึงและจัดการฐานข้อมูล
- ย่อมาจาก **Structured Query Language**
- ได้รับการรับรองให้เป็นมาตรฐานสากลโดย ANSI (American National Standards Institute) และ ISO
- **ความสามารถของ SQL:**
  - Execute queries (ประมวลผลคำสั่งสืบค้น)
  - Retrieve data (ดึงข้อมูลออกมา)
  - Insert, Delete, Update (เพิ่ม, ลบ, แก้ไขข้อมูล)
- มาตรฐานของ SQL มีการพัฒนามาหลายยุค เช่น SQL 86, 89, 92 (SQL-2) และ SQL 99 (SQL-3)

---

## 🧩 Slide 3: Introduction to SQL (SQL parts)
**องค์ประกอบหลักของภาษา SQL**

คำสั่งใน SQL ถูกแบ่งออกเป็นหมวดหมู่ตามหน้าที่การทำงานดังนี้:
1. **DDL (Data Definition Language):** ภาษานิยามข้อมูล ใช้สร้างโครงสร้าง (เช่น สร้างตาราง)
2. **Interactive DML (Data Manipulation Language):** ภาษาจัดการข้อมูลแบบโต้ตอบ (ดึง, เพิ่ม, ลบ, แก้)
3. **Embedded DML:** การฝังคำสั่ง SQL เข้าไปในภาษาโปรแกรมอื่น (เช่น Java, Python)
4. **Views:** การสร้างตารางเสมือน
5. **Integrity:** การจัดการกฎความถูกต้องของข้อมูล
6. **Transaction control:** การควบคุมทรานแซกชัน (เช่น Commit, Rollback)
7. **Authorization:** การจัดการสิทธิ์ผู้ใช้งาน
8. **Catalog and dictionary facilities:** การจัดการพจนานุกรมข้อมูล

---

## 📊 Slide 4: SQL Database Relations
**ตารางในฐานข้อมูล SQL (Relations)**

- ฐานข้อมูลมักจะประกอบด้วยตาราง (Relations) ตั้งแต่ 1 ตารางขึ้นไป แต่ละตารางจะมีชื่อเรียกเฉพาะตัว (เช่น "Customers" หรือ "Orders")
- ภายในตารางจะประกอบด้วยแถวข้อมูล (Tuples/Rows)

> [!EXAMPLE] Trace Table: ตาราง Persons
> 
> **ตาราง Persons**
> 
> | LastName | FirstName | Address | City |
> |---|---|---|---|
> | Hansen | Ola | Timoteivn 10 | Sandnes |
> | Svendson | Tove | Borgvn 23 | Sandnes |
> | Pettersen | Kari | Storgt 20 | Stavanger |
> 
> *(การวิเคราะห์: ตารางนี้มีทั้งหมด 3 แถว (Tuples) และมี 4 คอลัมน์ (Attributes))*

---

## 🔍 Slide 5: SQL Queries
**การสืบค้นข้อมูล (SQL Queries)**

- เราใช้ SQL ในการตั้งคำถามกับฐานข้อมูล และระบบจะตีกลับมาเป็น "Result set (ตารางผลลัพธ์)" เสมอ
- **คำสั่งตัวอย่าง:** `SELECT LastName FROM Persons` (ดึงมาแค่คอลัมน์นามสกุล)
- *(หมายเหตุ: บางระบบฐานข้อมูลบังคับให้ต้องใส่เครื่องหมายเซมิโคลอน `;` ปิดท้ายคำสั่งเสมอ)*

> [!EXAMPLE] Trace Table: ผลลัพธ์จากการ Select
> 
> **Result Set**
> 
> | LastName |
> |---|
> | Hansen |
> | Svendson |
> | Pettersen |

---

## 🛠️ Slide 6: SQL Data Manipulation Language (DML)
**ภาษาจัดการข้อมูล (DML)**

DML คือหมวดหมู่คำสั่งที่เอาไว้ "เล่นกับข้อมูลที่อยู่ข้างในตาราง" ประกอบด้วย 4 คำสั่งหลัก:
1. **SELECT** - ดึง/สกัดข้อมูลออกมาดู (Extracts data)
2. **UPDATE** - แก้ไขข้อมูลที่มีอยู่แล้ว (Updates data)
3. **DELETE** - ลบข้อมูลทิ้ง (Deletes data)
4. **INSERT INTO** - เพิ่มแถวข้อมูลใหม่เข้าไป (Inserts new data)

---

## 🏗️ Slide 7: SQL Data Definition Language (DDL)
**ภาษานิยามข้อมูล (DDL)**

DDL คือหมวดหมู่คำสั่งที่เอาไว้ "จัดการโครงสร้าง" ของฐานข้อมูล (สร้าง, ลบ, แก้ไขตารางหรือคีย์) คำสั่งที่สำคัญได้แก่:
- **CREATE TABLE** - สร้างตารางใหม่
- **ALTER TABLE** - แก้ไขโครงสร้างตารางเดิม (เช่น เพิ่มคอลัมน์)
- **DROP TABLE** - ลบตารางทิ้ง (หายทั้งโครงสร้างและข้อมูล)
- **CREATE INDEX** - สร้างดัชนีเพื่อช่วยค้นหาให้เร็วขึ้น
- **DROP INDEX** - ลบดัชนีทิ้ง

---

## 🆕 Slide 8: Create Database, Table, and Index
**โครงสร้างไวยากรณ์การสร้างฐานข้อมูลและตาราง**

- **การสร้างฐานข้อมูล (Database):**
  `CREATE DATABASE database_name`
- **การสร้างตาราง (Table):**
  ```sql
  CREATE TABLE table_name
  (
    column_name1 data_type,
    column_name2 data_type,
    .......
  )
  ```

---

## 📝 Slide 9: Create Table (Example)
**ตัวอย่างการสร้างตาราง Person**

> [!EXAMPLE] โค้ดสร้างตาราง
> เราต้องการสร้างตารางชื่อ `Person` ที่มี 4 คอลัมน์ ได้แก่ `LastName`, `FirstName`, `Address`, และ `Age`
> 
> ```sql
> CREATE TABLE Person
> (
>   LastName varchar, 
>   FirstName varchar,
>   Address varchar, 
>   Age int
> )
> ```

---

## 📏 Slide 10: Create Table (Specifying Length)
**การระบุความยาวสูงสุดของข้อมูล**

เพื่อให้ฐานข้อมูลประหยัดพื้นที่ เราสามารถระบุขนาดสูงสุด (Maximum length) ของแต่ละคอลัมน์ได้โดยใส่วงเล็บต่อท้าย Data type

> [!EXAMPLE] โค้ดสร้างตารางแบบระบุขนาด
> ```sql
> CREATE TABLE Person
> ( 
>   LastName varchar(30), 
>   FirstName varchar, 
>   Address varchar, 
>   Age int(3)
> )
> ```
> *(หมายเหตุ: `varchar(30)` หมายถึงเก็บตัวอักษรได้สูงสุด 30 ตัว, `int(3)` เก็บตัวเลขได้ 3 หลัก)*

---

## 🗂️ Slide 11: Data Types
**ชนิดของข้อมูลที่พบบ่อยใน SQL**

| Data Type | Description (คำอธิบาย) |
|---|---|
| **integer(size)** หรือ **int(size)** | เก็บตัวเลขจำนวนเต็ม ระบุจำนวนหลักในวงเล็บ (รวมถึง smallint, tinyint) |
| **decimal(size,d)** หรือ **numeric** | เก็บเลขทศนิยม `size` คือจำนวนหลักทั้งหมด `d` คือจำนวนหลักหลังจุดทศนิยม |
| **char(size)** | เก็บข้อความแบบ "ความยาวคงที่ (Fixed length)" จองพื้นที่เต็มจำนวนเสมอ |
| **varchar(size)** | เก็บข้อความแบบ "ความยาวแปรผัน (Variable length)" คืนพื้นที่ว่างให้ระบบได้ |
| **date(yyyymmdd)** | เก็บข้อมูลวันที่ |

---

## ⚡ Slide 12: Create Index
**การสร้างดัชนีค้นหา (Index)**

- **ประโยชน์:** ดัชนี (Index) ถูกสร้างขึ้นมาเพื่อช่วยให้ DBMS ตามหาข้อมูลที่ต้องการได้อย่างรวดเร็ว (ไม่ต้องสแกนหาทีละบรรทัด)
- **การมองเห็น:** ผู้ใช้ทั่วไป (Users) จะมองไม่เห็น Index มันทำงานอยู่เบื้องหลังเพื่อเร่งความเร็ว Query เท่านั้น
- **ข้อควรระวัง (Note):** การสร้าง Index เยอะเกินไปจะทำให้การ `INSERT`, `UPDATE`, `DELETE` ทำงานช้าลง! เพราะระบบต้องไปอัปเดตสมุดดัชนีทุกครั้งที่มีการเปลี่ยนข้อมูล ดังนั้นควรสร้าง Index เฉพาะคอลัมน์ที่ถูกใช้ค้นหา (Search) บ่อยๆ เท่านั้น

---

## 🔑 Slide 13: A Unique Index
**การสร้างดัชนีแบบไม่ซ้ำ (Unique Index)**

การสร้าง Unique Index เป็นการบังคับกฎว่า "ข้อมูลในคอลัมน์นี้ห้ามมีค่าซ้ำกันเด็ดขาดในตาราง"
- **ไวยากรณ์:**
  `CREATE UNIQUE INDEX index_name ON table_name (column_name)`

---

## 🔎 Slide 14: A Simple Index
**การสร้างดัชนีแบบธรรมดา (Simple Index)**

ถ้าเราไม่ใส่คำว่า UNIQUE ระบบจะสร้าง Index ธรรมดา ซึ่งอนุญาตให้ข้อมูลในคอลัมน์นั้นมีค่าซ้ำกันได้
- **ไวยากรณ์:**
  `CREATE INDEX index_name ON table_name (column_name)`
- **ตัวอย่าง:** ต้องการสร้างดัชนีชื่อ `PersonIndex` ให้คอลัมน์ `LastName`
  `CREATE INDEX PersonIndex ON Person (LastName)`

---

## 🔀 Slide 15: Index Descending & Multiple Columns
**การสร้างดัชนีแบบย้อนกลับและดัชนีควบ**

- **เรียงจากมากไปน้อย (Descending):** เติมคำว่า `DESC` ต่อท้าย
  `CREATE INDEX PersonIndex ON Person (LastName DESC)`
- **ดัชนีควบหลายคอลัมน์ (Multiple columns):** คั่นด้วยลูกน้ำ
  `CREATE INDEX PersonIndex ON Person (LastName, FirstName)`

---

## 🗑️ Slide 16: Drop Index, Table and Database
**การทำลายโครงสร้าง (DROP & TRUNCATE)**

- **ลบดัชนี:** `DROP INDEX table_name.index_name`
- **ลบตาราง (หายวับไปกับตา ทั้งโครงสร้างและข้อมูล):** `DROP TABLE table_name`
- **ลบฐานข้อมูล:** `DROP DATABASE database_name`
- **ล้างข้อมูลในตาราง (Truncate):** `TRUNCATE TABLE table_name` 
  *(ต่างจาก DROP ตรงที่ Truncate จะลบแค่ "ข้อมูลข้างใน" แต่เก็บโครงสร้างกระดูกตารางเอาไว้ให้ใช้ต่อได้)*

---

## 🛠️ Slide 17: ALTER TABLE
**การปรับปรุงโครงสร้างตารางเดิม**

ใช้เมื่อตารางถูกสร้างไปแล้ว แต่เราเปลี่ยนใจอยากเพิ่มหรือลบคอลัมน์ทิ้ง
- **เพิ่มคอลัมน์ใหม่ (ADD):**
  `ALTER TABLE table_name ADD column_name datatype`
- **ลบคอลัมน์ทิ้ง (DROP):**
  `ALTER TABLE table_name DROP COLUMN column_name`
  *(หมายเหตุ: ฐานข้อมูลบางยี่ห้อไม่อนุญาตให้ใช้คำสั่ง DROP COLUMN เพื่อป้องกันข้อมูลหาย)*

---

## ➕ Slide 18: ALTER TABLE (ADD Example)
**ตัวอย่างการเพิ่มคอลัมน์**

> [!EXAMPLE] Trace Table: ALTER TABLE ADD
> 
> **ตารางดั้งเดิม (Person)**
> 
> | LastName | FirstName | Address |
> |---|---|---|
> | Pettersen | Kari | Storgt 20 |
> 
> **คำสั่ง:** `ALTER TABLE Person ADD City varchar(30)`
> 
> **ตารางผลลัพธ์ (Result):** (มีคอลัมน์ City โผล่มาเป็นช่องว่างเปล่า)
> 
> | LastName | FirstName | Address | City |
> |---|---|---|---|
> | Pettersen | Kari | Storgt 20 | *(null)* |

---

## ➖ Slide 19: ALTER TABLE (DROP Example)
**ตัวอย่างการลบคอลัมน์**

> [!EXAMPLE] Trace Table: ALTER TABLE DROP
> 
> **คำสั่ง:** `ALTER TABLE Person DROP COLUMN Address`
> 
> **ตารางผลลัพธ์ (Result):** (คอลัมน์ Address หายไปถาวร)
> 
> | LastName | FirstName | City |
> |---|---|---|
> | Pettersen | Kari | *(null)* |

---

## 📥 Slide 20: The INSERT INTO Statement
**การนำเข้าข้อมูล (Insert)**

ใช้สำหรับเพิ่ม "แถวข้อมูลใหม่ (Rows)" เข้าไปในตาราง
- **แบบใส่ครบทุกคอลัมน์ (เรียงตามลำดับโครงสร้าง):**
  `INSERT INTO table_name VALUES (value1, value2,....)`
- **แบบระบุเจาะจงคอลัมน์ (คอลัมน์ที่ไม่ได้ระบุจะเป็น Null):**
  `INSERT INTO table_name (column1, column2,...) VALUES (value1, value2,....)`

---

## 👤 Slide 21: INSERT INTO (New Row Example)
**ตัวอย่างการเพิ่มข้อมูลแบบเต็มแถว**

> [!EXAMPLE] Trace Table: การ Insert ข้อมูล
> 
> **ตารางดั้งเดิม (Persons)**
> 
> | LastName | FirstName | Address | City |
> |---|---|---|---|
> | Pettersen | Kari | Storgt 20 | Stavanger |
> 
> **คำสั่ง:** 
> `INSERT INTO Persons VALUES ('Hetland', 'Camilla', 'Hagabakka 24', 'Sandnes')`
> 
> **ตารางผลลัพธ์ (Result):** (ข้อมูลใหม่ไปต่อท้าย)
> 
> | LastName | FirstName | Address | City |
> |---|---|---|---|
> | Pettersen | Kari | Storgt 20 | Stavanger |
> | **Hetland** | **Camilla** | **Hagabakka 24** | **Sandnes** |

---

## 🎯 Slide 22: INSERT INTO (Specified Columns Example)
**ตัวอย่างการเพิ่มข้อมูลแบบระบุคอลัมน์**

> [!EXAMPLE] Trace Table: การ Insert ระบุคอลัมน์
> 
> **คำสั่ง:** 
> `INSERT INTO Persons (LastName, Address) VALUES ('Rasmussen', 'Storgt 67')`
> 
> **ตารางผลลัพธ์ (Result):**
> 
> | LastName | FirstName | Address | City |
> |---|---|---|---|
> | Pettersen | Kari | Storgt 20 | Stavanger |
> | Hetland | Camilla | Hagabakka 24 | Sandnes |
> | **Rasmussen** | *(null)* | **Storgt 67** | *(null)* |
> *(สังเกตว่า FirstName และ City ที่ไม่ได้ถูกระบุ จะกลายเป็นช่องว่าง)*

---

## ✏️ Slide 23: The UPDATE Statement
**การแก้ไขข้อมูล (Update)**

ใช้สำหรับเปลี่ยนแปลงค่าของข้อมูลที่มีอยู่แล้วในตาราง
**ไวยากรณ์:**
```sql
UPDATE table_name 
SET column_name = new_value
WHERE column_name = some_value
```

> [!WARNING] อันตรายของคำสั่ง Update!
> หากเราลืมเขียนเงื่อนไข `WHERE` ต่อท้าย ระบบจะทำการอัปเดตข้อมูล "ทุกแถวในตาราง" ให้กลายเป็นค่าเดียวกันทั้งหมดทันที!

---

## 👤 Slide 24: UPDATE (One Column Example)
**ตัวอย่างการแก้ไขข้อมูลคอลัมน์เดียว**

> [!EXAMPLE] Trace Table: การ Update คอลัมน์เดียว
> 
> **ตารางดั้งเดิม (Person)**
> 
> | LastName | FirstName | Address | City |
> |---|---|---|---|
> | Nilsen | Fred | Kirkegt 56 | Stavanger |
> | Rasmussen | *(null)* | Storgt 67 | *(null)* |
> 
> **โจทย์:** เติมชื่อจริง (FirstName) ให้กับคนที่มีนามสกุล Rasmussen ว่า 'Nina'
> **คำสั่ง:** 
> `UPDATE Person SET FirstName = 'Nina' WHERE LastName = 'Rasmussen'`
> 
> **ตารางผลลัพธ์ (Result):**
> 
> | LastName | FirstName | Address | City |
> |---|---|---|---|
> | Nilsen | Fred | Kirkegt 56 | Stavanger |
> | Rasmussen | **Nina** | Storgt 67 | *(null)* |

---

## 🏘️ Slide 25: UPDATE (Several Columns Example)
**ตัวอย่างการแก้ไขข้อมูลหลายคอลัมน์พร้อมกัน**

> [!EXAMPLE] Trace Table: การ Update หลายคอลัมน์
> 
> **โจทย์:** เปลี่ยนที่อยู่และเมืองของ Rasmussen ใหม่
> **คำสั่ง:** (ใช้ลูกน้ำ `,` คั่นระหว่างคอลัมน์ที่ต้องการแก้)
> `UPDATE Person SET Address = 'Stien 12', City = 'Stavanger' WHERE LastName = 'Rasmussen'`
> 
> **ตารางผลลัพธ์ (Result):**
> 
> | LastName | FirstName | Address | City |
> |---|---|---|---|
> | Nilsen | Fred | Kirkegt 56 | Stavanger |
> | Rasmussen | Nina | **Stien 12** | **Stavanger** |

---

## ❌ Slide 26: The DELETE Statement
**การลบข้อมูล (Delete)**

ใช้สำหรับลบ "บรรทัดข้อมูล (Rows)" ออกจากตาราง
**ไวยากรณ์:**
```sql
DELETE FROM table_name 
WHERE column_name = some_value
```

---

## ✂️ Slide 27: DELETE (Row Example)
**ตัวอย่างการลบข้อมูลเจาะจงบรรทัด**

> [!EXAMPLE] Trace Table: การลบข้อมูล
> 
> **ตารางดั้งเดิม (Person)**
> 
> | LastName | FirstName | Address | City |
> |---|---|---|---|
> | Nilsen | Fred | Kirkegt 56 | Stavanger |
> | Rasmussen | Nina | Stien 12 | Stavanger |
> 
> **โจทย์:** ไล่ Nina Rasmussen ออกจากตาราง
> **คำสั่ง:** 
> `DELETE FROM Person WHERE LastName = 'Rasmussen'`
> 
> **ตารางผลลัพธ์ (Result):** (เหลือแค่ Nilsen)
> 
> | LastName | FirstName | Address | City |
> |---|---|---|---|
> | Nilsen | Fred | Kirkegt 56 | Stavanger |

---

## 💥 Slide 28: DELETE (All Rows)
**การลบข้อมูลทั้งหมดในตาราง**

หากเราต้องการล้างไพ่ ลบข้อมูลทุกบรรทัดทิ้ง แต่ยังอยากเก็บตารางเปล่าๆ เอาไว้ใช้งานต่อ (ลบโดยไม่ใช้ DROP TABLE) สามารถเขียนได้ 2 แบบ:
1. `DELETE FROM table_name` (ละเว้น WHERE)
2. `DELETE * FROM table_name`
ผลลัพธ์คือตารางจะว่างเปล่า แต่โครงสร้างคอลัมน์และ Index ยังอยู่ครบถ้วน

---

## 👁️ Slide 29: The SELECT Statement
**คำสั่งดึงข้อมูล (Select)**

คำสั่งที่ถูกใช้บ่อยที่สุดใน SQL ใช้สำหรับดูข้อมูล โดยผลลัพธ์ที่ได้จะกลับมาในรูปแบบตารางเสมอ (เรียกว่า Result-set)
**ไวยากรณ์:** `SELECT column_name(s) FROM table_name`

**การระบุคอลัมน์ (Select Some Columns):**
- ถ้าอยากดูแค่นามสกุลและชื่อ: 
  `SELECT LastName, FirstName FROM Persons`

---

## 🎯 Slide 30: SELECT (Example)
**ตัวอย่างผลลัพธ์จากการใช้ SELECT ระบุคอลัมน์**

> [!EXAMPLE] Trace Table: การดึงเฉพาะบางคอลัมน์
> 
> **ตารางดั้งเดิม (Persons)**
> 
> | LastName | FirstName | Address | City |
> |---|---|---|---|
> | Hansen | Ola | Timoteivn 10 | Sandnes |
> | Svendson | Tove | Borgvn 23 | Sandnes |
> | Pettersen | Kari | Storgt 20 | Stavanger |
> 
> **คำสั่ง:** `SELECT LastName, FirstName FROM Persons`
> 
> **ตารางผลลัพธ์ (Result Set):**
> 
> | LastName | FirstName |
> |---|---|
> | Hansen | Ola |
> | Svendson | Tove |
> | Pettersen | Kari |

---

## 🌟 Slide 31: SELECT * (All Columns)
**การดึงข้อมูลทั้งหมดทุกคอลัมน์**

หากเราขี้เกียจพิมพ์ชื่อคอลัมน์ทั้งหมด เราสามารถใช้สัญลักษณ์ดอกจัน `*` (Wildcard) ซึ่งมีความหมายว่า "ดึงมาทุกคอลัมน์ที่มีในตาราง"
- **คำสั่ง:** `SELECT * FROM Persons`
- ผลลัพธ์ที่ได้จะมีหน้าตาเหมือนตารางต้นฉบับเป๊ะทุกประการ (มาครบ 4 คอลัมน์)

---

## 🧹 Slide 32: The SELECT DISTINCT Statement
**การดึงข้อมูลแบบยุบตัวซ้ำ (Distinct)**

เวลาที่เราดึงข้อมูลคอลัมน์ใดคอลัมน์หนึ่ง บางครั้งมันมีข้อมูลซ้ำซ้อนโผล่มาเต็มไปหมด (เช่น มีคนมาจากเมืองเดียวกันหลายบรรทัด) ถ้าเราอยากดูรายชื่อแบบ "ไม่ซ้ำ (Unique)" เราสามารถเติมคีย์เวิร์ด `DISTINCT` เข้าไปได้
- **ไวยากรณ์:** `SELECT DISTINCT column_name(s) FROM table_name`

---

## 📋 Slide 33: SELECT vs SELECT DISTINCT
**เปรียบเทียบการคัดกรองข้อมูลตัวซ้ำ**

> [!EXAMPLE] Trace Table: ปัญหาตัวซ้ำ
> 
> **ตารางดั้งเดิม (Orders)**
> 
> | Company | OrderNumber |
> |---|---|
> | Sega | 3412 |
> | **W3Schools** | 2312 |
> | Trio | 4678 |
> | **W3Schools** | 6798 |
> 
> **คำสั่งแบบธรรมดา:** `SELECT Company FROM Orders`
> 
> **ตารางผลลัพธ์ (Result):**
> 
> | Company |
> |---|
> | Sega |
> | **W3Schools** |
> | Trio |
> | **W3Schools** |
> *(ข้อสังเกต: รายชื่อ W3Schools โผล่มา 2 รอบ น่ารำคาญ)*

---

## ✨ Slide 34: SELECT DISTINCT (Example)
**ผลลัพธ์จากการใช้ DISTINCT**

> [!EXAMPLE] Trace Table: การแก้ปัญหาด้วย DISTINCT
> 
> **คำสั่ง:** `SELECT DISTINCT Company FROM Orders`
> 
> **ตารางผลลัพธ์ (Result):**
> 
> | Company |
> |---|
> | Sega |
> | **W3Schools** |
> | Trio |
> *(ผลลัพธ์: W3Schools ที่เคยมี 2 บรรทัด ถูกยุบรวมเหลือเพียงบรรทัดเดียว!)*

---

## 🔎 Slide 35: The WHERE Clause
**การกรองข้อมูลด้วยเงื่อนไข (WHERE)**

คำสั่ง `SELECT` ปกติจะดึงข้อมูลมาทุกบรรทัด ถ้าเราต้องการ "ตั้งเงื่อนไข (Selection criterion)" เพื่อกรองเอาเฉพาะบรรทัดที่ตรงใจ เราต้องใช้คำสั่ง `WHERE` เข้ามาช่วย
- **ไวยากรณ์:**
  `SELECT column FROM table WHERE column operator value`

---

## ⚖️ Slide 36: WHERE Operators
**เครื่องหมายเปรียบเทียบใน WHERE**

| Operator | Description (คำอธิบาย) |
|---|---|
| `=` | เท่ากับ (Equal) |
| `<>` | ไม่เท่ากับ (Not equal) *(ในบางระบบใช้ `!=` แทน)* |
| `>` | มากกว่า (Greater than) |
| `<` | น้อยกว่า (Less than) |
| `>=` | มากกว่าหรือเท่ากับ (Greater than or equal) |
| `<=` | น้อยกว่าหรือเท่ากับ (Less than or equal) |
| `BETWEEN` | อยู่ระหว่างช่วงข้อมูลที่กำหนด |
| `LIKE` | ค้นหาแบบเข้าแพทเทิร์น (เช่น ขึ้นต้นด้วยตัว A) |

---

## 📍 Slide 37: WHERE Example
**ตัวอย่างการคัดกรองด้วย WHERE**

> [!EXAMPLE] Trace Table: การใช้ WHERE กรองเมือง
> 
> **ตารางดั้งเดิม (Persons)**
> 
> | LastName | FirstName | Address | City | Year |
> |---|---|---|---|---|
> | Hansen | Ola | Timoteivn 10 | **Sandnes** | 1951 |
> | Svendson | Tove | Borgvn 23 | **Sandnes** | 1978 |
> | Svendson | Stale | Kaivn 18 | **Sandnes** | 1980 |
> | Pettersen | Kari | Storgt 20 | Stavanger | 1960 |
> 
> **โจทย์:** ขอดูเฉพาะรายชื่อคนที่อาศัยอยู่ในเมือง "Sandnes" เท่านั้น
> **คำสั่ง:** `SELECT * FROM Persons WHERE City='Sandnes'`

---

## 🏁 Slide 38: WHERE Result & Quotes
**ผลลัพธ์และกฎของการใช้เครื่องหมายคำพูด (Quotes)**

> [!EXAMPLE] ตารางผลลัพธ์จากสไลด์ 37
> 
> | LastName | FirstName | Address | City | Year |
> |---|---|---|---|---|
> | Hansen | Ola | Timoteivn 10 | **Sandnes** | 1951 |
> | Svendson | Tove | Borgvn 23 | **Sandnes** | 1978 |
> | Svendson | Stale | Kaivn 18 | **Sandnes** | 1980 |

> [!IMPORTANT] กฎการครอบเครื่องหมายคำพูด
> - **ข้อมูลแบบข้อความ (Text):** ต้องถูกครอบด้วย Single quotes `'ข้อความ'` เสมอ (บางระบบอนุญาต Double quotes `"ข้อความ"` ได้)
> - **ข้อมูลแบบตัวเลข (Numeric):** ห้ามใส่เครื่องหมายคำพูดเด็ดขาด! ให้เขียนตัวเลขโต้งๆ ได้เลย

---

## 🔢 Slide 39: WHERE Text vs Numeric
**เปรียบเทียบการกรองข้อความและตัวเลข**

**กรณี Text values (ข้อความ):**
- ✅ ถูกต้อง: `SELECT * FROM Persons WHERE FirstName='Tove'`
- ❌ ผิดพัง: `SELECT * FROM Persons WHERE FirstName=Tove` (ลืมใส่โควท)

**กรณี Numeric values (ตัวเลข):**
- ✅ ถูกต้อง: `SELECT * FROM Persons WHERE Year>1965`
- ❌ ผิดพัง: `SELECT * FROM Persons WHERE Year>'1965'` (ดันไปใส่โควทให้ตัวเลข)

---

## 🗂️ Slide 40: GROUP BY
**การจัดกลุ่มข้อมูล**

คำสั่ง `GROUP BY` ถูกคิดค้นขึ้นมาเพื่อแก้ปัญหากรณีที่เราใช้ "ฟังก์ชันสรุปผล (Aggregate functions)" เช่น `SUM()`, `AVG()` ถ้าเราใช้ฟังก์ชันเหล่านี้เพียวๆ มันจะรวบยอดข้อมูลทั้งตารางออกมาเป็นตัวเลขก้อนเดียว
แต่ถ้าเราอยากได้ผลรวม **"แยกตามรายกลุ่ม"** (เช่น ยอดขายแยกตามบริษัท) เราบังคับต้องใช้ `GROUP BY`
- **ไวยากรณ์:**
  ```sql
  SELECT column, SUM(column) 
  FROM table 
  GROUP BY column
  ```

---

> (*Lecture 7 - Part 1 สิ้นสุดที่สไลด์ 40 / จะมีการนำเสนอ Part ถัดไปในไฟล์ถัดไปเนื่องจากความยาวของเนื้อหาสไลด์ที่มหาศาลถึง 94 หน้า*)

---
*Last updated: 2026-07-07*
