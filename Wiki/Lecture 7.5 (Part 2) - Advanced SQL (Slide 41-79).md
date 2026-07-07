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

# Lecture 7.5: Advanced SQL (เจาะลึกคำสั่ง SQL) - Part 2 (Slide 41-79)

> [!SUMMARY] ภาพรวมบทเรียน (Slides 41-79)
> บทเรียนนี้สานต่อการลุยโจทย์ภาคปฏิบัติของ SQL โดยเจาะลึกการจัดเรียง (ORDER BY), การใช้เงื่อนไข (AND, OR, LIKE, IN, BETWEEN), นามแฝง (Alias), การสร้างตารางก๊อปปี้ (SELECT INTO), การทำ JOIN, UNION, การใช้ฟังก์ชันคำนวณ (COUNT, MAX, SUM), และปิดท้ายด้วยการสร้าง View

---

## 🔀 Slide 41: DML – SELECT (ORDER BY)
**การจัดเรียงผลลัพธ์ข้อมูล**

- เรียงปกติ (ASC ถือเป็นค่า Default): 
  `SELECT * FROM Customer ORDER BY NameSurname;`
- เรียงคอลัมน์แรกขึ้น คอลัมน์สองลง:
  `SELECT NameSurname, Address, Email FROM Customer ORDER BY NameSurname ASC, Address DESC;`

---

## 📉 Slide 42: DML – SELECT (ORDER BY Question 1)
**โจทย์: จัดเรียงจำนวนคงเหลือจากมากไปน้อย**

> [!EXAMPLE] Trace Table: จัดเรียง DESC
> 
> **โจทย์:** สืบค้นสินค้าโดยเรียงลำดับตามจำนวนของสินค้าจากมากไปน้อย
> **คำตอบ (Code):** `SELECT ProductID, CategoryID, ProductName, Price, Quantity, UnitID FROM Product ORDER BY Quantity DESC;`
> 
> **ผลลัพธ์ที่ได้ (Result):**
> 
> | ProductID | CategoryID | ProductName | Price | Quantity | UnitID |
> |---|---|---|---|---|---|
> | p005 | c003 | ปากกา | 50 | **500** | u003 |
> | p004 | c004 | พาราเซตามอล | 15 | **400** | u004 |
> | p003 | c001 | โคลอน | 30 | **300** | u001 |
> | p002 | c002 | น้ำชาเขียว | 40 | **200** | u002 |
> | p001 | c001 | เลย์ | 20 | **100** | u005 |

---

## 🔢 Slide 43: DML – SELECT (ORDER BY Question 2)
**โจทย์: จัดเรียงควบ 2 ลำดับชั้น**

> [!EXAMPLE] Trace Table: จัดเรียงหมวดหมู่ตามด้วยชื่อ
> 
> **โจทย์:** สืบค้นสินค้าโดยเรียงลำดับที่ 1 คือตามประเภทสินค้าจากน้อยไปมาก และเรียงลำดับที่ 2 คือชื่อสินค้าจากน้อยไปมาก
> **คำตอบ (Code):** `SELECT CategoryID, ProductID, ProductName, Price FROM Product ORDER BY CategoryID ASC, ProductName ASC;`
> 
> **ผลลัพธ์ที่ได้ (Result):**
> 
> | CategoryID | ProductID | ProductName | Price |
> |---|---|---|---|
> | **c001** | p001 | **เ**ลย์ | 20 |
> | **c001** | p003 | **โ**คลอน | 30 |
> | c002 | p002 | น้ำชาเขียว | 40 |
> | c003 | p005 | ปากกา | 50 |
> | c004 | p004 | พาราเซตามอล | 15 |

---

## 🔗 Slide 44: DML – SELECT (AND & OR)
**การใช้ตรรกะเชื่อมเงื่อนไข**

- **ตัวอย่าง AND:** ดึงลูกค้าที่ชื่อว่า 'ขาว' "และ" ต้องเป็นเพศ 'ชาย' เท่านั้น
  `SELECT CustomerID, NameSurname, Gender, Email, Address, Telephone FROM Customer WHERE NameSurname='ขาว' AND Gender='ชาย';`

---

## ⚖️ Slide 45: DML – SELECT (AND & OR Question 1)
**โจทย์: ค้นหาสินค้าตรงสเปคเป๊ะๆ ด้วย AND**

> [!EXAMPLE] Trace Table: เงื่อนไข AND
> 
> **โจทย์:** สืบค้นสินค้าที่ราคาน้อยกว่า 40 "และ" จำนวนมากกว่า 100
> **คำตอบ (Code):** `SELECT ProductName, Price, Quantity FROM Product WHERE Price < 40 AND Quantity > 100;`
> 
> **ผลลัพธ์ที่ได้ (Result):**
> 
> | ProductName | Price | Quantity |
> |---|---|---|
> | โคลอน | 30 | 300 |
> | พาราเซตามอล | 15 | 400 |

---

## 🛤️ Slide 46: DML – SELECT (AND & OR Question 2)
**โจทย์: ค้นหาสินค้าด้วยเงื่อนไขทางเลือกด้วย OR**

> [!EXAMPLE] Trace Table: เงื่อนไข OR
> 
> **โจทย์:** สืบค้นสินค้าที่ราคาน้อยกว่า 20 "หรือ" จำนวนมากกว่า 400
> **คำตอบ (Code):** `SELECT ProductName, Price, Quantity FROM Product WHERE Price < 20 OR Quantity > 400;`
> 
> **ผลลัพธ์ที่ได้ (Result):**
> 
> | ProductName | Price | Quantity |
> |---|---|---|
> | พาราเซตามอล | 15 | 400 |
> | ปากกา | 50 | 500 |
> *(วิเคราะห์: พาราเซตามอลถูกดึงมาเพราะราคาเข้าเกณฑ์ <20 ส่วนปากกาถูกดึงมาเพราะจำนวนเข้าเกณฑ์ >400 เข้าทางใดทางหนึ่งถือว่ารอด)*

---

## 🔍 Slide 47: DML – SELECT (LIKE)
**การค้นหาแบบสุ่มเข้าแพทเทิร์น**

- ค้นหาคำที่มีคำว่า 'ล' ซ่อนอยู่:
  `SELECT ProductID, ProductName FROM Product WHERE ProductName LIKE '%ล%';`

---

## 🧩 Slide 48: DML – SELECT (LIKE Question)
**โจทย์: ค้นหาคำลงท้าย**

> [!EXAMPLE] Trace Table: การใช้ LIKE หางข้อความ
> 
> **โจทย์:** สืบค้นลูกค้าที่มีชื่อลงท้ายด้วยตัวอักษร 'ว'
> **คำตอบ (Code):** `SELECT CustomerID, NameSurname FROM Customer WHERE NameSurname LIKE '%ว';`
> 
> **ผลลัพธ์ที่ได้ (Result):**
> 
> | CustomerID | NameSurname |
> |---|---|
> | 3 | เขีย**ว** |
> | 5 | ขา**ว** |
> | 6 | ขา**ว** |
> | 7 | ขา**ว** |
> | 8 | ขา**ว** |

---

## 🎯 Slide 49: DML – SELECT (IN)
**การค้นหาแบบเจาะจงรายชื่อหลายอันพร้อมกัน**

- หากต้องการหาคนที่อยู่ทั้งจันทบุรีและนครสวรรค์ แทนที่จะใช้ OR สามารถใช้ IN ได้เลย
- **ตัวอย่าง:** `SELECT NameSurname, Address FROM Customer WHERE Address IN ('จันทบุรี', 'นครสวรรค์');`

---

## 💰 Slide 50: DML – SELECT (IN Question)
**โจทย์: ค้นหาราคาเป๊ะๆ สองเรท**

> [!EXAMPLE] Trace Table: การใช้ IN กับตัวเลข
> 
> **โจทย์:** สืบค้นสินค้าที่มีราคา 15 บาท "หรือ" 40 บาท
> **คำตอบ (Code):** `SELECT ProductName, Price FROM Product WHERE Price IN (15, 40);`
> 
> **ผลลัพธ์ที่ได้ (Result):**
> 
> | ProductName | Price |
> |---|---|
> | น้ำชาเขียว | 40 |
> | พาราเซตามอล | 15 |

---

## 📏 Slide 51: DML – SELECT (BETWEEN)
**การค้นหาเป็นช่วงข้อมูล**

- หาที่อยู่อาศัยที่ตกอยู่ในช่วงลำดับตัวอักษร:
  `SELECT NameSurname, Address FROM Customer WHERE Address BETWEEN 'กรุงเทพฯ' AND 'จันทบุรี';`

---

## 💸 Slide 52: DML – SELECT (BETWEEN Question)
**โจทย์: ค้นหาสินค้าเรทราคากลางๆ**

> [!EXAMPLE] Trace Table: การใช้ BETWEEN กับตัวเลข
> 
> **โจทย์:** สืบค้นสินค้าที่มีราคาระหว่าง 20 บาท ถึง 40 บาท
> **คำตอบ (Code):** `SELECT ProductName, Price FROM Product WHERE Price BETWEEN 20 AND 40;`
> 
> **ผลลัพธ์ที่ได้ (Result):**
> 
> | ProductName | Price |
> |---|---|
> | เลย์ | 20 |
> | น้ำชาเขียว | 40 |
> | โคลอน | 30 |

---

## 🎭 Slide 53: DML – SELECT (Aliases)
**การใช้นามแฝง (AS)**

- **เปลี่ยนชื่อหัวคอลัมน์ (Column Alias):**
  `SELECT ProductID, ProductName AS GoodsName, Price AS 'Price per Unit' FROM Product;`
- **เปลี่ยนชื่อตารางชั่วคราว (Table Alias):**
  `SELECT ProductID, ProductName, Quantity FROM Product AS Goods;`

---

## 🏷️ Slide 54: DML – SELECT (Aliases Question)
**โจทย์: เปลี่ยนหัวตารางลูกค้าให้น่าอ่านขึ้น**

> [!EXAMPLE] Trace Table: นามแฝงภาษาไทย
> 
> **โจทย์:** สืบค้นลูกค้าโดย NameSurname เปลี่ยนเป็น "ชื่อ-นามสกุล" และ Telephone เปลี่ยนเป็น "Mobile"
> **คำตอบ (Code):** 
> ```sql
> SELECT CustomerID, TitleID, NameSurname AS 'ชื่อ-นามสกุล', Gender, Email, Address, Telephone AS 'Mobile' 
> FROM Customer;
> ```

---

## 🗃️ Slide 55: The SELECT INTO Statement (MySQL)
**การก๊อปปี้ตารางสร้างใหม่ (ไวยากรณ์ของ MySQL)**

> [!NOTE] ข้อแตกต่างของยี่ห้อฐานข้อมูล
> ใน SQL Server เราใช้คำสั่ง `SELECT INTO new_table`
> แต่ใน MySQL ท่ามาตรฐานคือ **`INSERT INTO new_table SELECT ...`** (โดยตารางใหม่ต้องถูก Create โครงสร้างรอไว้ก่อนแล้ว) หรือท่าลัดคือ `CREATE TABLE new_table AS SELECT ...`
> ในสไลด์นี้อาจารย์สอนท่า MySQL:
> **ตัวอย่าง:** `INSERT INTO ProductBackup SELECT * FROM Product;`

---

## 💾 Slide 56: The SELECT INTO (Question 1)
**โจทย์: สำรองข้อมูลลูกค้าทั้งตาราง**

> [!EXAMPLE] 
> **โจทย์:** สำเนาข้อมูลลูกค้าจากตาราง `Customer` ไปที่ตาราง `CustomerBackup` ในฐานข้อมูล MyDB
> **คำตอบ (Code):**
> `INSERT INTO CustomerBackup SELECT * FROM Customer;`

---

## 🌐 Slide 57: The SELECT INTO (Cross Database)
**การสำเนาข้ามฐานข้อมูล**

เราสามารถก๊อปปี้ข้อมูลกระโดดข้าม Database หนึ่งไปอีก Database หนึ่งได้เลย โดยการระบุ "ชื่อฐานข้อมูลจุด" ไว้ข้างหน้าชื่อตาราง เช่น `MyDBBackup.CustomerBackup`
- **ตัวอย่าง:** 
  `INSERT INTO MyDBBackup.CustomerBackup SELECT * FROM MyDB.Customer;`

---

## 🚺 Slide 58: The SELECT INTO (Question 2)
**โจทย์: เตรียมสร้างตาราง CustomerFemale**

> [!EXAMPLE] 
> **โจทย์:** สร้างตาราง `CustomerFemale` ในฐานข้อมูล `MyDBBackup`
> **คำตอบ (Code):**
> (เราต้องพิมพ์โครงสร้างสร้างตารางรับไว้ก่อน)
> ```sql
> CREATE TABLE MyDBBackup.CustomerFemale (
>   CustomerID int(11),
>   NameSurname varchar(255),
>   Gender char(10),
>   Email varchar(255),
>   Address varchar(255),
>   Telephone varchar(10)
> );
> ```

---

## ♂️ Slide 59: The SELECT INTO (Question 3)
**โจทย์: สำเนาข้ามฐานข้อมูลพร้อมเงื่อนไขกรอง**

> [!EXAMPLE] 
> **โจทย์:** สำเนาเฉพาะลูกค้า "ชาย" ข้ามตารางและข้าม Database
> **คำตอบ (Code):**
> ```sql
> INSERT INTO MyDBBackup.CustomerMale (CustomerID, NameSurname, Gender) 
> SELECT CustomerID, NameSurname, Gender 
> FROM MyDB.Customer 
> WHERE Gender = 'ชาย';
> ```

---

## ♀️ Slide 60 & 61: The SELECT INTO (Question 4)
**โจทย์: สำเนาเฉพาะลูกค้าผู้หญิงไปเก็บแยกไว้**

> [!EXAMPLE] Trace Table: Backup เฉพาะเพศ
> 
> **โจทย์:** สำเนาข้อมูลเฉพาะลูกค้าเพศหญิงจากตาราง Customer ในฐานข้อมูล MyDB ไปที่ฐานข้อมูล MyDBBackup ตาราง CustomerFemale
> **คำตอบ (Code):**
> ```sql
> INSERT INTO MyDBBackup.CustomerFemale 
> SELECT * 
> FROM MyDB.Customer 
> WHERE Gender = 'หญิง';
> ```
> 
> **ตารางผลลัพธ์ปลายทาง (CustomerFemale):**
> 
> | CustomerID | TitleID | NameSurname | Gender | Email | Address | Telephone |
> |---|---|---|---|---|---|---|
> | 1 | t002 | ฟ้า | หญิง | s@gmail.com | กรุงเทพฯ | 091... |
> | 4 | t005 | ชมพู | หญิง | p@gmail.com | นครสวรรค์ | 084... |
> | 8 | t002 | ขาว | หญิง | w8@gmail.com | ชุมพร | 098... |

---

## 🤝 Slide 62: DML – SELECT (JOIN)
**การเชื่อมตารางเข้าด้วยกัน**

- ตัวอย่างการเชื่อมตาราง `Category` กับ `Product` (รู้ว่าหมวดนี้มีสินค้าอะไรบ้าง)
  ```sql
  SELECT CategoryName, ProductName 
  FROM Category 
  INNER JOIN Product 
  ON Category.CategoryID = Product.CategoryID;
  ```

---

## 🛍️ Slide 63: DML – SELECT (Join Question 1)
**โจทย์: ดึงข้อมูลสินค้าพร้อมหมวดหมู่และหน่วยนับ**

> [!EXAMPLE] Trace Table: การ Join 3 ตาราง
> 
> **โจทย์:** สืบค้นสินค้าทั้งหมดโดยแสดงข้อมูล CategoryName, ProductName, Price, Quantity, UnitName
> **คำตอบ (Code):** 
> ```sql
> SELECT CategoryName, ProductName, Price, Quantity, UnitName
> FROM Product
> INNER JOIN Category ON Product.CategoryID = Category.CategoryID
> INNER JOIN Unit ON Product.UnitID = Unit.UnitID;
> ```
> 
> **ผลลัพธ์ที่ได้ (Result):**
> 
> | CategoryName | ProductName | Price | Quantity | UnitName |
> |---|---|---|---|---|
> | Food | เลย์ | 20 | 100 | ซอง |
> | Food | โคลอน | 30 | 300 | กล่อง |
> | Beverage | น้ำชาเขียว | 40 | 200 | ขวด |
> | ... | ... | ... | ... | ... |

---

## 🧾 Slide 64: DML – SELECT (Join Question 2)
**โจทย์: ดึงข้อมูลบิลสั่งซื้อที่ประกอบร่างสมบูรณ์**

> [!EXAMPLE] Trace Table: ใบเสร็จแบบละเอียด
> 
> **โจทย์:** สืบค้นการสั่งซื้อทั้งหมดโดยแสดงข้อมูล OrdersID, OrdersDetailID, CategoryName, ProductName, Price, Quantity, UnitName
> **คำตอบ (Code):** 
> *(นี่คือท่าไม้ตายการ Join ตารางรัวๆ เพื่อให้ได้ใบเสร็จฉบับเต็ม)*
> ```sql
> SELECT Orders.OrdersID, OrdersDetail.OrdersDetailID, Category.CategoryName, Product.ProductName, Product.Price, OrdersDetail.Amount AS Quantity, Unit.UnitName
> FROM OrdersDetail
> INNER JOIN Orders ON OrdersDetail.OrdersID = Orders.OrdersID
> INNER JOIN Product ON OrdersDetail.ProductID = Product.ProductID
> INNER JOIN Category ON Product.CategoryID = Category.CategoryID
> INNER JOIN Unit ON Product.UnitID = Unit.UnitID;
> ```
> 
> **ผลลัพธ์ (Result):** โชว์รายการสั่งซื้อ o001 และ o002 พร้อมรายละเอียดสินค้าครบถ้วนทุกคอลัมน์

---

## ⬅️ Slide 65: DML – SELECT (LEFT JOIN Question)
**โจทย์: ค้นหาคำนำหน้าพร้อมชื่อคนที่ใช้ (ถ้ามี)**

> [!EXAMPLE]
> 
> **โจทย์:** `SELECT TitleName, NameSurname FROM Title LEFT JOIN Customer ON Title.TitleID = Customer.TitleID;`
> *(วิเคราะห์: ฝั่งซ้ายคือตาราง `Title` (นาย นาง นางสาว ฯลฯ) จะถูกลิสต์ออกมาครบทุกคน แม้คำนำหน้านั้นจะยังไม่มีลูกค้าคนไหนใช้เลยก็ตาม โดยลูกค้าคนนั้นจะขึ้นเป็น Null)*

---

## ➡️ Slide 66: DML – SELECT (RIGHT JOIN Question)
**โจทย์: สลับตารางหลักในการ Join**

> [!EXAMPLE]
> 
> **โจทย์:** `SELECT TitleName, NameSurname FROM Title RIGHT JOIN Customer ON Title.TitleID = Customer.TitleID;`
> *(วิเคราะห์: ฝั่งขวาคือ `Customer` เป็นตารางหลัก แปลว่ารายชื่อลูกค้าจะมาครบทุกคน แม้บางคนจะไม่ได้กรอกรหัส TitleID ไว้ ซึ่ง TitleName ของเขาจะโชว์เป็น Null แทน แต่จากตารางตัวอย่าง ทุกคนมี TitleID ครบ ผลลัพธ์จึงแทบไม่ต่างจาก Inner Join)*

---

## ➕ Slide 67 & 68: DML – SELECT (UNION & UNION ALL)
**การนำตารางมาต่อกันในแนวตั้ง**

> [!EXAMPLE] 
> 
> **โจทย์:** เอาข้อมูลผู้ชายและผู้หญิงที่แยกตารางกันไปเมื่อครู่ กลับมาต่อกัน
> 
> **คำตอบ (Code UNION):** `SELECT NameSurname, Gender FROM CustomerMale UNION SELECT NameSurname, Gender FROM CustomerFemale;`
> *(หมายเหตุ: ถ้าใช้ `UNION` ตัวที่ชื่อซ้ำกันเป๊ะๆ จะถูกยุบ แต่ถ้าใช้ `UNION ALL` ในสไลด์ 68 ตัวซ้ำจะไม่ถูกยุบ โผล่มาทุกบรรทัด)*

---

## 🧮 Slide 69 & 70: DML – SELECT (Functions - COUNT)
**ฟังก์ชันนับจำนวนยอดฮิต**

- นับจำนวนลูกค้าทั้งหมด: `SELECT COUNT(NameSurname) FROM Customer;`
- จัดกลุ่มแล้วนับจำนวน: `SELECT CategoryID, COUNT(ProductName) FROM Product GROUP BY CategoryID;`

---

## 🚻 Slide 71: DML – SELECT (Functions Question 1)
**โจทย์: นับหัวประชากรแยกตามเพศ**

> [!EXAMPLE] Trace Table: COUNT
> 
> **โจทย์:** สืบค้นลูกค้าโดยนับจำนวนคนแต่ละเพศ
> **คำตอบ (Code):** `SELECT Gender, COUNT(NameSurname) FROM Customer GROUP BY Gender;`
> 
> **ผลลัพธ์ที่ได้ (Result):**
> 
> | Gender | COUNT(NameSurname) |
> |---|---|
> | ชาย | 5 |
> | หญิง | 3 |

---

## 🏷️ Slide 72: DML – SELECT (Functions Question 2)
**โจทย์: นับชนิดสินค้าแยกตามหมวดหมู่**

> [!EXAMPLE] Trace Table: นับประเภท
> 
> **โจทย์:** สืบค้นสินค้าโดยนับจำนวนสินค้าแต่ละประเภท
> **คำตอบ (Code):** 
> ```sql
> SELECT CategoryName, COUNT(ProductName) 
> FROM Product 
> INNER JOIN Category ON Product.CategoryID = Category.CategoryID 
> GROUP BY CategoryName;
> ```
> 
> **ผลลัพธ์ที่ได้ (Result):** Food=2, Beverage=1, Stationery=1, Medicine=1

---

## 📈 Slide 73: DML – SELECT (Functions - MAX)
**ฟังก์ชันหาค่าสูงสุด**

- หาว่าสินค้าชิ้นไหนแพงที่สุด (โดยใช้ Subquery หาค่า max คืนกลับมาเทียบ):
  `SELECT ProductName, Price FROM Product WHERE Price = (SELECT MAX(Price) FROM Product);`

---

## 📉 Slide 74: DML – SELECT (Functions Question 3)
**โจทย์: หาสินค้าที่ใกล้จะหมดสต็อกที่สุด**

> [!EXAMPLE] Trace Table: การหาค่า MIN
> 
> **โจทย์:** สืบค้นสินค้าที่มีจำนวนคงเหลือน้อยที่สุด (MIN)
> **คำตอบ (Code):** 
> `SELECT ProductName, Quantity FROM Product WHERE Quantity = (SELECT MIN(Quantity) FROM Product);`
> 
> **ผลลัพธ์ที่ได้ (Result):**
> 
> | ProductName | Quantity |
> |---|---|
> | เลย์ | 100 |

---

## 💰 Slide 75 & 76: DML – SELECT (Functions - SUM)
**ฟังก์ชันหาผลรวมและโจทย์ทดสอบ**

- นำจำนวนสต็อกมาบวกกันแยกตามหมวดหมู่:
  `SELECT CategoryID, SUM(Quantity) FROM Product GROUP BY CategoryID;`

> [!EXAMPLE] Trace Table: หาประเภทของเยอะสุด
> 
> **โจทย์:** สืบค้นประเภทสินค้าที่มีจำนวน (ผลรวม) มากกว่า 200
> **คำตอบ (Code):** 
> ```sql
> SELECT CategoryName, SUM(Quantity) 
> FROM Product 
> INNER JOIN Category ON Product.CategoryID = Category.CategoryID 
> GROUP BY CategoryName 
> HAVING SUM(Quantity) > 200;
> ```
> *(ผลลัพธ์: โชว์หมวดหมู่ที่ของรวมกันเกิน 200 ชิ้น)*

---

## 🪟 Slide 77 & 78: CREATE VIEW Statement
**การสร้างหน้าต่างมุมมอง (View)**

- การจับ Join 3 ตารางรวดแล้วแปะชื่อใหม่ให้เรียกใช้ง่ายๆ:
  ```sql
  CREATE VIEW CategoryProductUnit AS 
  SELECT CategoryName, ProductName, UnitName 
  FROM Category 
  INNER JOIN Product ON Category.CategoryID = Product.CategoryID 
  INNER JOIN Unit ON Product.UnitID = Unit.UnitID;
  ```

> [!EXAMPLE] Trace Table: สร้าง View ข้อมูลลูกค้าแบบฉบับย่อ
> 
> **โจทย์ (Slide 78):** สร้าง View ชื่อ `TitleCustomer` ให้มีรายละเอียดคำนำหน้า, ชื่อ, เพศ, อีเมล, ที่อยู่, โทรศัพท์
> **คำตอบ (Code):**
> ```sql
> CREATE VIEW TitleCustomer AS
> SELECT Title.TitleName AS 'คำนำหน้าชื่อ', Customer.NameSurname AS 'ชื่อ-นามสกุล', Customer.Gender AS 'เพศ', Customer.Email AS 'อีเมล', Customer.Address AS 'ที่อยู่', Customer.Telephone AS 'โทรศัพท์'
> FROM Customer
> INNER JOIN Title ON Customer.TitleID = Title.TitleID;
> ```

---

## 👁️ Slide 79: CREATE VIEW (Usage)
**การนำ View ไปใช้**

เมื่อเราสร้าง View ในหน้าสไลด์ 77 และ 78 เสร็จแล้ว เวลาหัวหน้าหรือโปรแกรมเมอร์คนอื่นมาทำงานต่อ เขาจะสบายมาก เพียงแค่สืบค้นแบบธรรมดาๆ เสมือนว่ามันเป็นตารางหน้าต่างเดียวจบ:

- `SELECT * FROM CategoryProductUnit;`
- `SELECT * FROM TitleCustomer;`

> *(ผลลัพธ์: จะได้ตารางสวยงามที่ถูกเตรียมไว้ล่วงหน้าโดยไม่ต้องมานั่งเขียนคำสั่ง JOIN ยาวเหยียดอีกต่อไป)*

---

# References
- **Course:** Database System
- **Chapter:** Lecture 7.5 - Advanced SQL (Part 2)
- **Slides:** 39 slides (Ungrouped Complete Revision)
- **Related Notes:** [[Lecture 7.5 (Part 1) - Advanced SQL (Slide 1-40)]]

---
*Last updated: 2026-07-07*
