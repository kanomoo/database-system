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

# Lecture 7: SQL Fundamentals (พื้นฐานภาษา SQL) - Part 3 (Slide 81-94)

> [!SUMMARY] ภาพรวมบทเรียน (Slides 81-94)
> บทเรียนนี้เป็นส่วนสุดท้ายของ Part 1 โดยจะเจาะลึกตัวอย่างการทำ UNION ที่ค้างไว้จากสไลด์ 80 ต่อด้วยการใช้งานฟังก์ชันสำเร็จรูป (SQL Functions) ทั้งสายคำนวณและสายอักขระ และปิดท้ายด้วยการสร้าง View เพื่อทำหน้าต่างเสมือนสำหรับฐานข้อมูล

---

## 🌍 Slide 81: UNION and UNION ALL (Example Data)
**วัตถุดิบสำหรับทดสอบ UNION**

เราจะมาจำลองการเอาตารางสองสาขามาต่อกัน

> [!EXAMPLE] Trace Table: ตารางสองสาขา
> 
> **ตารางพนักงานสาขานอร์เวย์ (Employees_Norway):**
> 
> | Employee_ID | E_Name |
> |---|---|
> | 01 | Hansen, Ola |
> | 02 | Svendson, Tove |
> | 03 | **Svendson, Stephen** |
> | 04 | Pettersen, Kari |
> 
> **ตารางพนักงานสาขาสหรัฐฯ (Employees_USA):**
> 
> | Employee_ID | E_Name |
> |---|---|
> | 01 | Turner, Sally |
> | 02 | Kent, Clark |
> | 03 | **Svendson, Stephen** |
> | 04 | Scott, Stephen |
> 
> *(ข้อสังเกต: นาย `Svendson, Stephen` มีรายชื่อโผล่อยู่ในตารางทั้งสองสาขาพร้อมกัน)*

---

## 🤜🤛 Slide 82: Using the UNION Command
**การทำงานของ UNION ปกติ**

> [!EXAMPLE] Trace Table: UNION (กรองตัวซ้ำ)
> 
> **โจทย์:** ขอดูรายชื่อพนักงานจากทั้งสองสาขา
> **คำสั่ง:**
> ```sql
> SELECT E_Name FROM Employees_Norway 
> UNION 
> SELECT E_Name FROM Employees_USA
> ```
> 
> **ตารางผลลัพธ์ (Result):**
> 
> | Name |
> |---|
> | Hansen, Ola |
> | Svendson, Tove |
> | **Svendson, Stephen** |
> | Pettersen, Kari |
> | Turner, Sally |
> | Kent, Clark |
> | Scott, Stephen |
> 
> *(การวิเคราะห์: ถ้านับบรรทัดดูจะได้แค่ 7 บรรทัด! เพราะรายชื่อ `Svendson, Stephen` ที่เคยมี 2 บรรทัด ถูก UNION ยุบรวมให้เหลือบรรทัดเดียวตามกฎของ Set คล้ายกับคำสั่ง DISTINCT)*

---

## 👯‍♂️ Slide 83: UNION ALL
**การรวมตารางแบบไม่สนใจตัวซ้ำ (UNION ALL)**

หากเราไม่ต้องการให้ระบบเปลืองแรงไปประมวลผลหั่นตัวซ้ำทิ้ง (อยากได้มาเท่าไร ต่อมันเข้าไปให้หมด!) เราต้องใช้คำสั่ง `UNION ALL`
**ไวยากรณ์:**
```sql
SELECT E_Name FROM Employees_Norway 
UNION ALL 
SELECT E_Name FROM Employees_USA
```

---

## 📊 Slide 84: UNION ALL Result
**ผลลัพธ์จากการใช้ UNION ALL**

> [!EXAMPLE] Trace Table: UNION ALL
> 
> **ผลลัพธ์จากสไลด์ 83 (Result):**
> 
> | Name |
> |---|
> | Hansen, Ola |
> | Svendson, Tove |
> | **Svendson, Stephen** |
> | Pettersen, Kari |
> | Turner, Sally |
> | Kent, Clark |
> | **Svendson, Stephen** |
> | Scott, Stephen |
> *(การวิเคราะห์: คราวนี้ตารางมี 8 บรรทัดเต็มๆ โดย `Svendson, Stephen` โผล่มาสองบรรทัดรวดตามต้นฉบับเลย)*

---

## 🛠️ Slide 85: SQL Functions
**ฟังก์ชันสำเร็จรูปใน SQL**

SQL มีฟังก์ชันแถมมาให้พร้อมใช้งานเพียบ เพื่อประหยัดเวลาไม่ต้องไปเขียนโปรแกรมคำนวณข้างนอก
- **ไวยากรณ์:** `SELECT function(column) FROM table`
- **หมวดหมู่หลัก:**
  1. **Aggregate Functions (ฟังก์ชันสรุปผลรวม):** ยุบรวมข้อมูลหลายบรรทัดเป็นเลขก้อนเดียว
  2. **Scalar Functions (ฟังก์ชันจัดการรายบรรทัด):** ทำงานกับข้อมูลรายตัว คายผลลัพธ์กลับมาแบบ 1:1 บรรทัด

---

## 📉 Slide 86: Aggregate functions
**ฟังก์ชันสรุปผลรวมและตารางทดสอบ**

ฟังก์ชันกลุ่มนี้จะสูบข้อมูลเข้าไปเป็นคอลเลกชัน (Collection) แล้วปั่นรวมกันคายออกมาเป็น "ค่าเดียว (Single value)"

> [!WARNING] กฎเหล็กของ Aggregate
> ถ้านำฟังก์ชัน Aggregate ไป Select คู่กับคอลัมน์ธรรมดา คอลัมน์ธรรมดานั้นบังคับต้องถูกจับไปใส่ใน **GROUP BY** เสมอ! (อ้างอิงกลับไปสไลด์ 42)

**ตาราง Person table สำหรับทดสอบในสไลด์หน้า:**

| Name | Age |
|---|---|
| Hansen, Ola | 34 |
| Svendson, Tove | 45 |
| Pettersen, Kari | 19 |

---

## 🧮 Slide 87: Some Aggregate Functions
**ฟังก์ชันสรุปผลรวมยอดฮิต**

| Function | Description (คำอธิบาย) | ผลลัพธ์จากตารางหน้า 86 |
|---|---|---|
| **AVG**(column) | หาค่าเฉลี่ย | (34+45+19)/3 = 32.66 |
| **COUNT**(column)| นับจำนวนแถว | 3 (คน) |
| **MAX**(column) | หาค่าสูงสุดในคอลัมน์ | 45 |
| **MIN**(column) | หาค่าน้อยสุดในคอลัมน์ | 19 |
| **SUM**(column) | หาผลรวมทั้งหมด | 34+45+19 = 98 |

---

## 🔧 Slide 88: Scalar Functions
**ฟังก์ชันระดับรายบรรทัด (Scalar Functions)**

ฟังก์ชันเหล่านี้ทำงานกับข้อมูลตรงๆ ในแต่ละบรรทัด:

| Function | Description (คำอธิบาย) |
|---|---|
| **UCASE**(c) / **UPPER** | แปลงตัวอักษรเป็นพิมพ์ใหญ่ทั้งหมด (เช่น ola -> OLA) |
| **LCASE**(c) / **LOWER** | แปลงตัวอักษรเป็นพิมพ์เล็กทั้งหมด |
| **MID**(c, start, end) | หั่นดึงเฉพาะข้อความตรงกลางออกมา (Substring) |
| **LEN**(c) / **LENGTH** | นับความยาวของข้อความ (ได้เป็นตัวเลข) |
| **INSTR**(c) | หาตำแหน่ง Index ว่าข้อความย่อยนี้อยู่ตำแหน่งที่เท่าไร |
| **LEFT**(c, num) | ตัดข้อความดึงมาเฉพาะฝั่งซ้ายกี่ตัวอักษร |
| **RIGHT**(c, num) | ตัดข้อความดึงมาเฉพาะฝั่งขวากี่ตัวอักษร |
| **ROUND**(c, dec) | ปัดเศษทศนิยม (ระบุตำแหน่งได้) |
| **MOD**(x,y) | หารเอาเศษ (Modulo) |
| **NOW()** | ดึงวันและเวลาปัจจุบันของเซิร์ฟเวอร์ |
| **FORMAT**(c, fmt) | จัดรูปแบบการแสดงผล (เช่น ใส่ลูกน้ำให้ตัวเลข) |
| **DATEDIFF**(d1, d2)| คำนวณหาระยะห่างระหว่างวันสองวัน (ว่ากี่วัน/เดือน) |

---

## 🪟 Slide 89: CREATE VIEW Statement
**การสร้างมุมมองตารางเสมือน (View)**

- **View คืออะไร?** มันคือ "ตารางผี" (Virtual table) ที่ไม่ได้เก็บข้อมูลจริงๆ บนฮาร์ดดิสก์ แต่เกิดจากการจำโค้ดคำสั่ง `SELECT` ของเราเอาไว้เป็นหน้าต่าง
- หน้าตาของ View เหมือนตารางทุกประการ ดึง Select ไปใช้ต่อได้เลย
- เราสามารถเอาตาราง A ไป Join กับตาราง B แล้วตั้งชื่อใหม่เป็น View เอาไว้ให้คนอื่นดูโดยที่เขาไม่ต้องรู้เลยว่ามันมาจาก 2 ตาราง
- **ข้อสำคัญ (Note):** โครงสร้างของฐานข้อมูลจะไม่ถูกกระทบกระเทือนเลยไม่ว่าเราจะสร้าง View พิสดารแค่ไหนก็ตาม

---

## 📜 Slide 90: CREATE VIEW Syntax
**ไวยากรณ์การสร้างและกลไกของ View**

- **ไวยากรณ์:**
  ```sql
  CREATE VIEW view_name 
  AS SELECT column_name(s) 
  FROM table_name 
  WHERE condition
  ```
- **กลไกเบื้องหลัง:** DBMS ไม่ได้เซฟข้อมูลลงใน View! ทุกครั้งที่เราสั่งรันคำสั่ง `SELECT * FROM view_name` ระบบเบื้องหลังจะสับสวิตช์ แอบเอาคำสั่ง Select ดั้งเดิมที่เราผูกไว้ไปกวาดข้อมูลสดๆ มาให้ดูใหม่แบบเรียลไทม์เสมอ (ทำให้ข้อมูลใน View ไม่มีทางเก่า)

---

## 🏢 Slide 91: Using Views
**ตัวอย่างการประยุกต์ใช้ View แบบง่าย**

> [!EXAMPLE] ซ่อนตารางดั้งเดิมให้เหลือแค่สองคอลัมน์
> สมมติเราไม่อยากให้บางคนเห็นเงินเดือน เราจึงทำหน้าต่างจำกัดสิทธิ์ไว้:
> 
> **ตารางต้นฉบับ:**
> `Persons (LastName, FirstName, Address, City)`
> 
> **คำสั่งสร้าง View:**
> ```sql
> CREATE VIEW [Family Name] AS
> SELECT LastName AS Family, FirstName AS Name
> FROM Persons
> ```
> *(วิเคราะห์: สร้างมุมมองใหม่ที่เหลือแค่ชื่อกับนามสกุล แถมเปลี่ยนชื่อหัวตารางให้เสร็จสับ ใครเรียกดู `[Family Name]` ก็จะเห็นตารางสวยงามทันที)*

---

## 💰 Slide 92: Using Views (Above average price)
**การใช้ View เพื่อสร้างการคำนวณสำเร็จรูป**

> [!EXAMPLE] ค้นหาสินค้าแพงเกินหน้าเกินตา
> 
> **คำสั่งสร้าง View:**
> ```sql
> CREATE VIEW [Products Above Average Price] AS 
> SELECT ProductName, UnitPrice 
> FROM Products 
> WHERE UnitPrice > (SELECT AVG(UnitPrice) FROM Products)
> ```
> *(วิเคราะห์: เราสร้าง View ที่ฝัง Subquery หาค่าเฉลี่ยไว้ข้างในเลย ผู้จัดการแค่พิมพ์สั่ง `SELECT * FROM [Products Above Average Price]` ก็จะได้ข้อมูลโผล่มาทันทีโดยไม่ต้องเขียนโค้ด Subquery ยาวๆ เอง)*

---

## 🛍️ Slide 93: Using Views (Category sales)
**การใช้ View ซ่อนความซับซ้อนของการ Join**

> [!EXAMPLE] ยุบรวมการ Join ข้าม 4 ตาราง
> 
> **คำสั่งสร้าง View:**
> ```sql
> CREATE VIEW [Category Sales For 1997] AS 
> SELECT CategoryName, SUM(ProductSales) AS CategorySales 
> FROM [Product Sales for 1997] 
> GROUP BY CategoryName
> ```
> *(วิเคราะห์: `[Product Sales for 1997]` ตัวมันเองก็อาจจะเป็น View อีกอันที่ไป Join ตารางมาแล้ว เราสามารถสร้าง View ซ้อน View เพื่อย่อยข้อมูลจาก 4 ตารางให้กลายเป็นรายงานหน้าเดียวสรุปยอดขายได้แบบสวยงามสุดๆ)*

---

## 📝 Slide 94: CREATE VIEW (With condition)
**ปิดท้ายการใช้เงื่อนไขคัดกรองใน View**

เราสามารถสั่ง Filter ข้อมูลได้อิสระ:

> [!EXAMPLE] กรองเฉพาะลูกค้าที่ Active
> **คำสั่งสร้าง View:**
> ```sql
> CREATE VIEW [Active Customers] AS 
> SELECT CustomerID, CompanyName 
> FROM Customers 
> WHERE Status = 'Active'
> ```
> เวลานำไปใช้ เราก็แค่ `SELECT * FROM [Active Customers]` เพื่อดึงข้อมูลลูกค้าปัจจุบันไปทำการตลอดต่อได้ทันที!

---

# References
- **Course:** Database System
- **Chapter:** Lecture 7 - SQL Fundamentals (Part 3)
- **Slides:** 14 slides (Ungrouped Complete Revision)
- **Related Notes:** [[Lecture 7 (Part 1) - SQL Fundamentals (Slide 1-40)]], [[Lecture 7 (Part 2) - SQL Fundamentals (Slide 41-80)]]

---
*Last updated: 2026-07-07*
