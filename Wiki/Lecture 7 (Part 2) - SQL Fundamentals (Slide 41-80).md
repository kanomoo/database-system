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

# Lecture 7: SQL Fundamentals (พื้นฐานภาษา SQL) - Part 2 (Slide 41-80)

> [!SUMMARY] ภาพรวมบทเรียน (Slides 41-80)
> บทเรียนนี้สานต่อจาก Part 1 โดยจะเจาะลึกเข้าไปในฟีเจอร์การดึงข้อมูลระดับสูงขึ้น เช่น การจัดกลุ่ม (Group By, Having), การจัดเรียง (Order By), ตัวดำเนินการตรรกศาสตร์ (And, Or, In, Between), การสร้างตัวแปรชั่วคราว (Alias) ไปจนถึงท่าไม้ตายอย่างการเชื่อมตาราง (JOIN) และการรวมตาราง (UNION) แบบละเอียดทุกเม็ดไม่มีรวบรัด

---

## 🧮 Slide 41: GROUP BY (Example)
**ตัวอย่างการใช้ GROUP BY**

> [!EXAMPLE] Trace Table: ปัญหาถ้ารวมดื้อๆ
> 
> **"Sales" Table:**
> 
> | Company | Amount |
> |---|---|
> | W3Schools | 5500 |
> | IBM | 4500 |
> | W3Schools | 7100 |
> 
> **คำสั่งแบบดื้อๆ:** `SELECT Company, SUM(Amount) FROM Sales`
> 
> **ผลลัพธ์ (Result) ที่ผิดพลาด:**
> 
> | Company | SUM(Amount) |
> |---|---|
> | W3Schools | 17100 |
> | IBM | 17100 |
> | W3Schools | 17100 |
> *(ปัญหา: ตัวเลข 17100 คือผลรวมทั้งหมดของตาราง (55+45+71) มันถูกเอาไปแปะให้ทุกๆ บรรทัดมั่วซั่วไปหมด นี่คือเหตุผลว่าทำไมถึงต้องมีคำสั่ง Group by)*

---

## ✅ Slide 42: GROUP BY (Solution)
**การแก้ปัญหาด้วย GROUP BY**

โค้ดจากสไลด์ 41 ถือว่าพัง (Invalid) เพราะคอลัมน์ Company โดนผลกระทบจากการรวมยอดมั่วๆ เพื่อแก้ปัญหานี้เราต้องเติมคำสั่ง `GROUP BY` เข้าไปสั่งให้ระบบมัดรวมบริษัทชื่อเดียวกันไว้ด้วยกันก่อน

> [!EXAMPLE] Trace Table: การใช้ GROUP BY อย่างถูกต้อง
> 
> **คำสั่ง:** 
> ```sql
> SELECT Company, SUM(Amount) 
> FROM Sales 
> GROUP BY Company
> ```
> 
> **ผลลัพธ์ (Result) ที่ถูกต้อง:**
> 
> | Company | SUM(Amount) |
> |---|---|
> | W3Schools | 12600 |
> | IBM | 4500 |
> *(การวิเคราะห์: ระบบเอายอดของ W3Schools มาบวกกัน (55+71 = 126) แยกกองออกจากยอดของ IBM ถือเป็นการรวมยอดแยกตามกลุ่มที่สมบูรณ์แบบ)*

---

## 🛡️ Slide 43: HAVING
**การคัดกรองข้อมูล "หลัง" จากถูกจัดกลุ่ม (HAVING)**

- **ทำไมถึงต้องมี HAVING:** เราไม่สามารถใช้ `WHERE` ไปคัดกรองผลลัพธ์ที่เกิดจากฟังก์ชันสรุปผลอย่าง `SUM()`, `AVG()` ได้ (เพราะ WHERE จะทำงานก่อนการบวกเลขเสมอ)
- คลื่นลูกใหม่จึงเกิดขึ้นนั่นคือ `HAVING` ซึ่งทำหน้าที่เหมือน WHERE ทุกประการ แต่เอาไว้ใช้ทดสอบผลลัพธ์ **"หลังจากที่ถูก GROUP BY มัดรวมบวกเลขเสร็จแล้ว"**
- **ไวยากรณ์:**
  ```sql
  SELECT column, SUM(column)
  FROM table 
  GROUP BY column 
  HAVING condition
  ```

---

## 🎯 Slide 44: HAVING (Example)
**ตัวอย่างการประยุกต์ใช้ HAVING**

> [!EXAMPLE] Trace Table: ค้นหาบริษัทที่ยอดขายทะลุเป้า
> 
> **โจทย์:** จากตาราง Sales ขอดูชื่อบริษัทที่มียอดรวมกันเกิน 10,000 เท่านั้น
> 
> **คำสั่ง:**
> ```sql
> SELECT Company, SUM(Amount) FROM Sales 
> GROUP BY Company HAVING SUM(Amount)>10000
> ```
> 
> **ผลลัพธ์ (Result):**
> 
> | Company | SUM(Amount) |
> |---|---|
> | W3Schools | 12600 |
> *(ข้อสังเกต: IBM ซึ่งมียอดรวมแค่ 4,500 ถูก HAVING เตะทิ้งไปจากตารางผลลัพธ์อย่างสวยงาม)*

---

## 🔀 Slide 45: ORDER BY
**การจัดเรียงผลลัพธ์ (ORDER BY)**

- คีย์เวิร์ด `ORDER BY` ถูกใช้สำหรับ "จัดเรียงแถวข้อมูล (Sort the rows)" ก่อนที่จะพ่นออกหน้าจอ
- ค่าเริ่มต้น (Default) หากไม่ระบุอะไรเลย มันจะเรียงจาก น้อยไปมาก (A-Z, 0-9) หรือที่เรียกว่า Ascending (ASC)

> [!EXAMPLE] ตาราง Orders ตั้งต้น
> 
> | Company | OrderNumber |
> |---|---|
> | Sega | 3412 |
> | ABC Shop | 5678 |
> | W3Schools | 2312 |
> | W3Schools | 6798 |

---

## 🅰️ Slide 46: ORDER BY (Alphabetical Example)
**ตัวอย่างการจัดเรียงตามตัวอักษร**

> [!EXAMPLE] Trace Table: จัดเรียงชื่อบริษัท (A-Z)
> 
> **โจทย์:** จงเรียงชื่อบริษัทในตาราง Orders ตามลำดับพจนานุกรม
> **คำสั่ง:** `SELECT Company, OrderNumber FROM Orders ORDER BY Company`
> 
> **ผลลัพธ์ (Result):**
> 
> | Company | OrderNumber |
> |---|---|
> | **A**BC Shop | 5678 |
> | **S**ega | 3412 |
> | **W**3Schools | 6798 |
> | **W**3Schools | 2312 |
> *(การวิเคราะห์: แถวทั้งหมดถูกขยับสลับที่ใหม่ให้ A ขึ้นก่อน S และ W)*

---

## 🔢 Slide 47: ORDER BY (Multiple Columns)
**ตัวอย่างการจัดเรียงควบ 2 คอลัมน์ (A-Z และตัวเลข)**

หากชื่อบริษัทซ้ำกัน (เช่น W3Schools) เราสามารถสั่งให้มันเรียงเงื่อนไขที่ 2 ซ้อนเข้าไปได้ (เช่น เรียงตาม OrderNumber)

> [!EXAMPLE] Trace Table: จัดเรียง 2 ชั้น
> 
> **โจทย์:** เรียงชื่อบริษัทตามอักษร (A-Z) ก่อน แล้วถ้าชื่อซ้ำ ให้เรียงตาม OrderNumber จากน้อยไปมาก
> **คำสั่ง:** `SELECT Company, OrderNumber FROM Orders ORDER BY Company, OrderNumber`
> 
> **ผลลัพธ์ (Result):**
> 
> | Company | OrderNumber |
> |---|---|
> | ABC Shop | 5678 |
> | Sega | 3412 |
> | W3Schools | **2312** |
> | W3Schools | **6798** |
> *(การวิเคราะห์: พอถึงคิว W3Schools ระบบจะเช็คคอลัมน์ที่ 2 และดัน 2312 ขึ้นมาก่อน 6798 ทันที)*

---

## 🔽 Slide 48: ORDER BY (Descending)
**ตัวอย่างการจัดเรียงย้อนกลับ (DESC)**

> [!EXAMPLE] Trace Table: จัดเรียง Z-A
> 
> **โจทย์:** จงเรียงชื่อบริษัทแบบถอยหลัง (จากฮูกไปไก่ Z-A)
> **คำสั่ง:** (เติมคีย์เวิร์ด DESC ต่อท้ายคอลัมน์)
> `SELECT Company, OrderNumber FROM Orders ORDER BY Company DESC`
> 
> **ผลลัพธ์ (Result):**
> 
> | Company | OrderNumber |
> |---|---|
> | **W**3Schools | 6798 |
> | **W**3Schools | 2312 |
> | **S**ega | 3412 |
> | **A**BC Shop | 5678 |

---

## 🔀 Slide 49: ORDER BY (Mixed ASC & DESC)
**การจัดเรียงแบบผสมผสาน (ขึ้นบ้าง ลงบ้าง)**

เราสามารถสั่งให้คอลัมน์หนึ่งเรียงลง และอีกคอลัมน์เรียงขึ้น ผสมกันได้อย่างอิสระ!

> [!EXAMPLE] Trace Table: จัดเรียงผสมผสาน
> 
> **โจทย์:** เรียงชื่อบริษัท Z-A แต่ในบริษัทเดียวกันให้เรียงตัวเลขจากน้อยไปมาก (ASC)
> **คำสั่ง:** `SELECT Company, OrderNumber FROM Orders ORDER BY Company DESC, OrderNumber ASC`
> 
> **ผลลัพธ์ (Result):**
> 
> | Company | OrderNumber |
> |---|---|
> | W3Schools | **2312** |
> | W3Schools | **6798** |
> | Sega | 3412 |
> | ABC Shop | 5678 |

---

## 🔗 Slide 50: AND & OR
**ตัวดำเนินการตรรกศาสตร์ (และ / หรือ)**

เราใช้ `AND` และ `OR` ในการเชื่อมเงื่อนไข `WHERE` สองประโยคเข้าด้วยกัน
- **AND (และ):** จะคายแถวข้อมูลออกมา ก็ต่อเมื่อเงื่อนไข "ทุกข้อ" เป็นจริง 100% (ALL conditions are true)
- **OR (หรือ):** จะคายแถวข้อมูลออกมา ขอแค่เงื่อนไข "ข้อใดข้อหนึ่ง" เป็นจริงก็พอ (ANY condition is true)

*(ตัวอย่างต่อไปนี้จะใช้ตาราง Persons เป็นฐานข้อมูลอ้างอิงตลอด)*

---

## 🤝 Slide 51: AND (Example)
**ตัวอย่างการใช้งาน AND**

> [!EXAMPLE] Trace Table: บังคับสองเงื่อนไข
> 
> **โจทย์:** ขอดูข้อมูลคนที่ชื่อ Tove และนามสกุล Svendson
> **คำสั่ง:** `SELECT * FROM Persons WHERE FirstName='Tove' AND LastName='Svendson'`
> 
> **ผลลัพธ์ (Result):**
> 
> | LastName | FirstName | Address | City |
> |---|---|---|---|
> | Svendson | Tove | Borgvn 23 | Sandnes |
> *(วิเคราะห์: ต้องผ่านเกณฑ์เป๊ะทั้ง 2 ข้อ ถึงจะถูกดึงออกมา)*

---

## 🛣️ Slide 52: OR (Example)
**ตัวอย่างการใช้งาน OR**

> [!EXAMPLE] Trace Table: เอาข้อใดข้อหนึ่ง
> 
> **โจทย์:** ขอดูคนชื่อ Tove หรือไม่ก็นามสกุล Svendson (ใครเข้าเกณฑ์ข้อใดข้อหนึ่ง ดึงมาเลย)
> **คำสั่ง:** `SELECT * FROM Persons WHERE firstname='Tove' OR lastname='Svendson'`
> 
> **ผลลัพธ์ (Result):**
> 
> | LastName | FirstName | Address | City |
> |---|---|---|---|
> | Svendson | Tove | Borgvn 23 | Sandnes |
> | Svendson | Stephen | Kaivn 18 | Sandnes |
> *(วิเคราะห์: Stephen ถูกดึงมาด้วยเพราะถึงแม้ชื่อจะไม่ใช่ Tove แต่นามสกุลตรงสเปค Svendson ซึ่งถือว่าผ่านเกณฑ์ OR)*

---

## 📦 Slide 53: AND & OR Combined
**การใช้งานผสมกันแบบซับซ้อนด้วยวงเล็บ**

เราสามารถใช้ `()` มาช่วยจัดกลุ่มตรรกศาสตร์ (ทำในวงเล็บก่อน) เพื่อหลีกเลี่ยงความสับสนระหว่าง AND และ OR

> [!EXAMPLE] Trace Table: ผสมวงเล็บตรรกศาสตร์
> 
> **โจทย์:** ขอคนชื่อ Tove หรือ Stephen ก็ได้ "แต่ทุกคนต้อง" นามสกุล Svendson เท่านั้นนะ!
> **คำสั่ง:** 
> ```sql
> SELECT * FROM Persons 
> WHERE (FirstName='Tove' OR FirstName='Stephen') 
> AND LastName='Svendson'
> ```
> 
> **ผลลัพธ์ (Result):**
> ได้ผลลัพธ์เป็น 2 บรรทัดเหมือนเดิม คือ Tove Svendson และ Stephen Svendson

---

## 🎭 Slide 54: The LIKE Condition
**การค้นหาแบบเข้าแพทเทิร์น (LIKE)**

- คำสั่ง `LIKE` จะถูกจับคู่กับสัญลักษณ์เครื่องหมายเปอร์เซ็นต์ `%` ซึ่งทำหน้าที่เป็น "การ์ดพิเศษ (Wildcard)" มีความหมายว่า "ตรงนี้จะเป็นตัวอักษรกลวงๆ กี่ตัวก็ได้ หรือไม่มีเลยก็ได้"

> [!EXAMPLE] แบบขึ้นต้นด้วย
> **คำสั่ง:** `SELECT * FROM Persons WHERE FirstName LIKE 'O%'`
> **ความหมาย:** ขอคนที่ชื่อ "ขึ้นต้นด้วยตัว O ส่วนข้างหลังจะเป็นอะไรยาวแค่ไหนช่างมัน"

---

## 🧩 Slide 55: LIKE Condition (cont.)
**แพทเทิร์นเปอร์เซ็นต์รูปแบบต่างๆ**

> [!EXAMPLE] แบบลงท้ายด้วย
> **คำสั่ง:** `SELECT * FROM Persons WHERE FirstName LIKE '%a'`
> **ความหมาย:** "ข้างหน้าเป็นอะไรก็ได้ แต่ขอให้ลงท้ายด้วยตัว a" (เช่น Ola, Anna)

> [!EXAMPLE] แบบแทรกตรงกลาง (Contain)
> **คำสั่ง:** `SELECT * FROM Persons WHERE FirstName LIKE '%la%'`
> **ความหมาย:** "มีคำว่า la ซ่อนอยู่ที่ไหนสักแห่งในชื่อ ไม่ว่าจะหัว กลาง หรือท้าย" (เช่น Ola)

---

## 🎯 Slide 56: IN
**การค้นหาแบบเหวี่ยงแหในคราวเดียว (IN)**

- หากเราขี้เกียจเขียน `OR` ซ้ำๆ กันหลายรอบ (`Name='A' OR Name='B' OR Name='C'`) เราสามารถยุบมันด้วยตัวดำเนินการ `IN (..)` ได้เลย
- `IN` จะจับคู่กับรายชื่อที่ถูกระบุไว้ในวงเล็บอย่างเป๊ะๆ (Exact value)

> **ไวยากรณ์:** `SELECT column_name FROM table_name WHERE column_name IN (value1,value2,..)`

---

## 🏹 Slide 57: IN (Example)
**ตัวอย่างการประยุกต์ใช้ IN**

> [!EXAMPLE] Trace Table: ใช้ IN แทน OR
> 
> **โจทย์:** ขอดูข้อมูลของคนที่มีนามสกุล Hansen หรือ Pettersen เท่านั้น
> **คำสั่ง:** `SELECT * FROM Persons WHERE LastName IN ('Hansen','Pettersen')`
> 
> **ผลลัพธ์ (Result):**
> 
> | LastName | FirstName | Address | City |
> |---|---|---|---|
> | Hansen | Ola | Timoteivn 10 | Sandnes |
> | Pettersen | Kari | Storgt 20 | Stavanger |

---

## 📏 Slide 58: BETWEEN ... AND
**การค้นหาช่วงข้อมูล (Between)**

- ตัวดำเนินการ `BETWEEN ... AND` ใช้สำหรับเลือกข้อมูลที่ตกอยู่ใน "ช่วง (Range)" ระหว่างค่าสองค่า
- สามารถใช้กับข้อมูลได้ทั้งแบบ "ตัวเลข (Numbers)", "ข้อความ (Text)", หรือ "วันที่ (Dates)"

> **ไวยากรณ์:** `SELECT column_name FROM table_name WHERE column_name BETWEEN value1 AND value2`

---

## 🔤 Slide 59: BETWEEN (Text Example 1)
**ตัวอย่างการใช้งาน BETWEEN กับข้อความ**

> [!EXAMPLE] Trace Table: ช่วงของตัวอักษร
> 
> **โจทย์:** ขอรายชื่อคนที่นามสกุลอยู่ระหว่างหมวดหมู่ H ถึง P
> **คำสั่ง:** `SELECT * FROM Persons WHERE LastName BETWEEN 'Hansen' AND 'Pettersen'`
> 
> **ผลลัพธ์ (Result):**
> 
> | LastName | FirstName | Address | City |
> |---|---|---|---|
> | Hansen | Ola | Timoteivn 10 | Sandnes |
> | Nordmann | Anna | Neset 18 | Sandnes |
> *(ข้อสังเกตประหลาด: Pettersen ไม่ถูกดึงออกมาด้วย! ทำไมล่ะ? อ่านต่อหน้าถัดไป)*

---

## ⚠️ Slide 60: BETWEEN ... AND (Important Notice)
**ความน่าปวดหัวของ BETWEEN ข้ามยี่ห้อฐานข้อมูล**

> [!WARNING] คำเตือนระดับโลก (IMPORTANT!)
> กฎของการใช้ `BETWEEN...AND` นั้น **"ไม่เหมือนกัน"** ในแต่ละฐานข้อมูล (เช่น Oracle, SQL Server, MySQL):
> - **แบบที่ 1 (Exclusive):** ดึงเฉพาะค่าที่อยู่ตรงกลาง ไม่นับหัวท้าย (Pettersen ไม่ถูกนับ)
> - **แบบที่ 2 (Inclusive):** ดึงมาหมดทั้งหัว ท้าย และตรงกลาง (Pettersen จะโดนดึงมาด้วย)
> - **แบบที่ 3 (Semi-inclusive):** ดึงหัว ไม่ดึงท้าย หรือดึงท้าย ไม่ดึงหัว
> 
> **ข้อสรุป:** ก่อนใช้ BETWEEN จงไปอ่านคู่มือยี่ห้อฐานข้อมูลที่คุณกำลังใช้อยู่ให้ดีก่อน!

---

## 🚫 Slide 61: NOT BETWEEN ... AND
**การใช้คำสั่งตรงข้าม (อยู่นอกช่วง)**

เราสามารถพลิกการทำงานได้ด้วยการเติม `NOT` เข้าไปข้างหน้า

> [!EXAMPLE] Trace Table: อยู่นอกช่วง
> 
> **โจทย์:** ขอดูคนที่นามสกุล "ไม่อยู่" ในช่วง H ถึง P
> **คำสั่ง:** `SELECT * FROM Persons WHERE LastName NOT BETWEEN 'Hansen' AND 'Pettersen'`
> 
> **ผลลัพธ์ (Result):**
> 
> | LastName | FirstName | Address | City |
> |---|---|---|---|
> | Pettersen | Kari | Storgt 20 | Stavanger |
> | Svendson | Tove | Borgvn 23 | Sandnes |
> *(วิเคราะห์: Svendson เริ่มด้วย S เกิน P ไปแล้ว ส่วน Pettersen ดันหลุดรอดมาได้เพราะกฎของฐานข้อมูลตัวอย่างที่มองว่า P ดิบๆ เล็กกว่า Pe)*

---

## 🎭 Slide 62: Aliases
**การใช้นามแฝง (Alias)**

- รำคาญไหมที่ชื่อคอลัมน์ในฐานข้อมูลมักจะอ่านยากหรือยาวเหยียด?
- SQL อนุญาตให้เราตั้ง "ชื่อเล่น (Alias)" ชั่วคราวให้กับ "ชื่อคอลัมน์" หรือ "ชื่อตาราง" ได้เพื่อให้อ่านง่ายขึ้น
- **นามแฝงคอลัมน์:** `SELECT column AS column_alias FROM table`
- **นามแฝงตาราง:** `SELECT column FROM table AS table_alias`

---

## 🥸 Slide 63: Aliases (Column Example)
**ตัวอย่างการตั้งชื่อเล่นให้คอลัมน์**

> [!EXAMPLE] โค้ดตั้งชื่อคอลัมน์ใหม่
> 
> **คำสั่ง:** 
> ```sql
> SELECT LastName AS Family, FirstName AS Name 
> FROM Persons
> ```
> *(วิเคราะห์: สั่งให้คอลัมน์ LastName ไปออกหน้าจอด้วยชื่อ Family แทน และ FirstName เปลี่ยนเป็น Name แทน)*

---

## 🖼️ Slide 64: Aliases (Results & Table Example)
**ผลลัพธ์จากการใช้นามแฝง**

> [!EXAMPLE] Trace Table: ผลลัพธ์จากการตั้ง Alias
> 
> **ผลลัพธ์จากหน้า 63:** (หัวตารางกลายเป็น Family และ Name โดยอัตโนมัติ)
> 
> | Family | Name |
> |---|---|
> | Hansen | Ola |
> | Svendson | Tove |
> | Pettersen | Kari |
> 
> **ตัวอย่างนามแฝงตาราง (Table Alias):**
> **คำสั่ง:** `SELECT LastName, FirstName FROM Persons AS Employees`
> แม้ตารางตั้งต้นจะชื่อ Persons แต่มันจะถูกมองเห็นเป็นชื่อ Employees ในหน่วยความจำชั่วคราว มีประโยชน์มากเวลาเอาไปใช้คู่กับการทำ Join ที่ตารางยาวๆ

---

## 🗃️ Slide 65: The SELECT INTO Statement
**การก๊อปปี้ตารางสร้างเป็นตารางใหม่ (SELECT INTO)**

คำสั่งนี้คือท่าไม้ตายสุดคลาสสิกที่มักใช้ทำ "สำรองข้อมูล (Backup)" หรือถอดข้อมูลเก่าๆ ไปเก็บถาวร (Archiving) มันจะสร้างตารางใหม่เอี่ยมขึ้นมาพร้อมกับโยนข้อมูลยัดเข้าไปเลย
> **ไวยากรณ์:** `SELECT column_name(s) INTO newtable FROM source`

**ตัวอย่างการทำ Backup ทั้งตาราง:**
`SELECT * INTO Persons_backup FROM Persons`
*(คำสั่งเดียว ได้ตาราง Persons_backup ที่โคลนนิ่งมา 100% ทันที!)*

---

## 🧹 Slide 66: SELECT INTO (With Conditions)
**การก๊อปปี้เฉพาะส่วนที่ต้องการ**

เราสามารถประยุกต์ร่วมกับลูกเล่นทุกอย่างของ Select ได้:
- **ก๊อปมาแค่บางคอลัมน์:**
  `SELECT LastName,FirstName INTO Persons_backup FROM Persons`
- **ก๊อปมาแค่บางแถว (พ่วง WHERE):** สร้างตารางแบคอัปเฉพาะคนที่อยู่เมือง Sandnes
  `SELECT LastName,Firstname INTO Persons_sandnes FROM Persons WHERE City='Sandnes'`

---

## 🔗 Slide 67: SELECT INTO (With JOIN)
**การก๊อปปี้ข้อมูลที่ดึงข้ามตาราง**

ความเหนือชั้นคือ มันสามารถ Join ตารางให้เสร็จสับ แล้วค่อยเทผลลัพธ์ยัดลงตาราง Backup ใหม่ได้เลยในคำสั่งเดียว!

> [!EXAMPLE]
> **คำสั่ง:**
> ```sql
> SELECT Employees.Name,Orders.Product 
> INTO Empl_Ord_backup 
> FROM Employees 
> INNER JOIN Orders 
> ON Employees.Employee_ID=Orders.Employee_ID
> ```
> *(วิเคราะห์: เชื่อมตารางพนักงานกับยอดสั่งซื้อจนเสร็จ แล้วโยนยอดรวมเข้าตารางใหม่ชื่อ Empl_Ord_backup ทันที)*

---

## 🤝 Slide 68: Join (Joins and Keys)
**ราชาแห่ง SQL: การเชื่อมตาราง (JOIN)**

- **ทำไมต้อง Join?** เพราะกระบวนการ Normalization ของเราหั่นตารางแยกออกจากกันจนกระจุยกระจายหมดแล้ว เวลาจะเรียกดูข้อมูลที่สมบูรณ์ เราจึงต้องเอาตาราง 2 อัน (หรือมากกว่า) มาปะกบประกอบร่างกันใหม่
- **กุญแจสำคัญ (Keys):** ตัวเชื่อมตารางก็คือคอลัมน์กุญแจหลัก (Primary Key) ที่โยงไปหากุญแจต่างด้าว (Foreign Key) แบบไม่มีข้อมูลซ้ำซ้อน
- *(ตัวอย่าง: ในตาราง Orders จะมีคอลัมน์ `Employee_ID` ซ่อนอยู่ เพื่อเป็นเชือกโยงไปหาตัวตนจริงของพนักงานในตาราง Employees โดยไม่ต้องพิมพ์ชื่อพนักงานซ้ำซ้อน)*

---

## 🏢 Slide 69: Join (Referring to Two Tables)
**การอ้างอิงคอลัมน์จากสองตาราง**

เพื่อกันความสับสนเวลาคอมพิวเตอร์ตามหาคอลัมน์ เรามักจะต้อง "ใส่ชื่อตารางนำหน้า" คอลัมน์ด้วยจุด `.` (เช่น `Orders.Product`)
- `Employee_ID` คือกุญแจหลัก (PK) ของตาราง Employees
- `Prod_ID` คือกุญแจหลัก (PK) ของตาราง Orders
- ส่วน `Employee_ID` ที่แฝงตัวอยู่ในตาราง Orders จะถูกเรียกว่ากุญแจต่างด้าว (FK) ใช้สำหรับโยงข้อมูล

---

## 📋 Slide 70: Join (Tables Data)
**ตารางตัวอย่างสำหรับการ Join**

> [!EXAMPLE] Trace Table: วัตถุดิบตั้งต้น
> 
> **ตาราง Employees:**
> 
> | Employee_ID | Name |
> |---|---|
> | 01 | Hansen, Ola |
> | 02 | Svendson, Tove |
> | 03 | Svendson, Stephen |
> | 04 | Pettersen, Kari |
> 
> **ตาราง Orders:**
> 
> | Prod_ID | Product | Employee_ID |
> |---|---|---|
> | 234 | Printer | 01 |
> | 657 | Table | 03 |
> | 865 | Chair | 03 |

---

## 🧵 Slide 71: Join (Implicit Join Example)
**การเชื่อมตารางแบบซ่อนเร้น (ผ่าน WHERE)**

> [!EXAMPLE] Trace Table: ท่า Join แบบโบราณ
> 
> **โจทย์:** ใครบ้างที่สั่งซื้อสินค้า? แล้วเขาสั่งอะไร?
> **คำสั่ง:** (ดึงสองตารางมาพร้อมกัน แล้วใช้ WHERE เชื่อมคีย์)
> ```sql
> SELECT Employees.Name, Orders.Product 
> FROM Employees, Orders 
> WHERE Employees.Employee_ID = Orders.Employee_ID
> ```
> 
> **ตารางผลลัพธ์ (Result):**
> 
> | Name | Product |
> |---|---|
> | Hansen, Ola | Printer |
> | Svendson, Stephen | Table |
> | Svendson, Stephen | Chair |

---

## 🖨️ Slide 72: Join (Implicit Join + Filter)
**การเชื่อมตารางพร้อมการกรองข้อมูล**

> [!EXAMPLE] Trace Table: หาคนสั่งปริ้นเตอร์
> 
> **โจทย์:** ค้นหาชื่อพนักงานที่สั่งซื้อเครื่องพิมพ์ (Printer)
> **คำสั่ง:** (เชื่อมเสร็จแล้ว เติม AND สั่งกรอง Product ต่อเลย)
> ```sql
> SELECT Employees.Name 
> FROM Employees, Orders 
> WHERE Employees.Employee_ID = Orders.Employee_ID 
> AND Orders.Product = 'Printer'
> ```
> 
> **ตารางผลลัพธ์ (Result):**
> 
> | Name |
> |---|
> | Hansen, Ola |

---

## 🔗 Slide 73: INNER JOIN Syntax
**ไวยากรณ์การเชื่อมตารางแบบใหม่ (INNER JOIN)**

ท่าที่ถูกต้องและเป็นมาตรฐานสากลกว่า คือการใช้คีย์เวิร์ด `JOIN` ตรงๆ แทนที่จะไปใช้ WHERE แบบท่าโบราณ
**ไวยากรณ์:**
```sql
SELECT field1, field2... 
FROM first_table 
INNER JOIN second_table 
ON first_table.keyfield = second_table.foreign_keyfield
```

*(หมายเหตุ: INNER JOIN จะให้ผลลัพธ์เหมือนท่าโบราณเป๊ะ แต่โค้ดอ่านง่ายและชัดเจนกว่ามาก)*

---

## 🎯 Slide 74: INNER JOIN Result
**ผลลัพธ์และนิยามของ INNER JOIN**

> [!DEFINITION] การทำงานของ INNER JOIN
> การจอยน์แบบ "วงใน" หมายความว่า ระบบจะคายเฉพาะข้อมูลที่มีคู่อยู่ในตารางทั้ง 2 ฝั่งเท่านั้น (Match both tables)
> - พนักงานคนไหนที่**ไม่เคยสั่งของเลย** (เช่น Tove และ Kari) จะถูกปัดตก ไม่โชว์ในผลลัพธ์
> - ออร์เดอร์ไหนที่**ไม่มีเจ้าของ** (ซึ่งเป็นไปไม่ได้ในระบบที่ออกแบบดี) ก็จะถูกปัดตกเช่นกัน

---

## ⬅️ Slide 75: LEFT JOIN Syntax
**การจอยน์ออกซ้าย (LEFT JOIN)**

ถ้าหากโจทย์บอกว่า "อยากรายชื่อพนักงานทุกคนออกมาให้หมด! ไม่ว่าจะเคยสั่งของหรือไม่ก็ตาม" INNER JOIN จะใช้ไม่ได้แล้ว เราต้องใช้ท่า `LEFT JOIN`
**ไวยากรณ์:** เปลี่ยนแค่คำว่า INNER เป็น LEFT
```sql
SELECT Employees.Name, Orders.Product 
FROM Employees 
LEFT JOIN Orders 
ON Employees.Employee_ID=Orders.Employee_ID
```

---

## 👈 Slide 76: LEFT JOIN Result
**ผลลัพธ์ของการจอยน์ออกซ้าย**

> [!EXAMPLE] Trace Table: การทำงานของ LEFT JOIN
> กฎคือตารางที่เขียนฝั่งซ้าย (`Employees`) ห้ามหายเด็ดขาด ทุกคนต้องลอยมาอยู่ในผลลัพธ์!
> 
> **ตารางผลลัพธ์ (Result):**
> 
> | Name | Product |
> |---|---|
> | Hansen, Ola | Printer |
> | **Svendson, Tove** | *(null)* |
> | Svendson, Stephen | Table |
> | Svendson, Stephen | Chair |
> | **Pettersen, Kari** | *(null)* |
> *(วิเคราะห์: Tove และ Kari ที่ไม่มีคู่โผล่มาแล้ว! และในช่อง Product ของพวกเขาจะแสดงเป็นค่าว่างเปล่า (Null) แทน)*

---

## ➡️ Slide 77: RIGHT JOIN Syntax
**การจอยน์ออกขวา (RIGHT JOIN)**

ตรรกะกลับด้านกับตะกี้: "ขอดูออร์เดอร์ทุกใบที่มีในระบบให้ครบ! ต่อให้บางออร์เดอร์มันจะพัง หาชื่อพนักงานที่เป็นเจ้าของไม่เจอก็ตาม"
**ไวยากรณ์:** เปลี่ยนเป็นคำว่า RIGHT
```sql
SELECT Employees.Name, Orders.Product 
FROM Employees 
RIGHT JOIN Orders 
ON Employees.Employee_ID=Orders.Employee_ID
```

---

## 👉 Slide 78: RIGHT JOIN Result
**ผลลัพธ์ของการจอยน์ออกขวา**

> [!EXAMPLE] Trace Table: การทำงานของ RIGHT JOIN
> กฎคือตารางที่เขียนฝั่งขวา (`Orders`) ห้ามหายเด็ดขาด
> 
> **ตารางผลลัพธ์ (Result):**
> 
> | Name | Product |
> |---|---|
> | Hansen, Ola | Printer |
> | Svendson, Stephen | Table |
> | Svendson, Stephen | Chair |
> *(วิเคราะห์: ตารางผลักดันออร์เดอร์ทุกอันออกมา ซึ่งออร์เดอร์ทุกอัน (Printer, Table, Chair) บังเอิญมีเจ้าของครบหมดแล้ว ผลลัพธ์ที่ได้จึงหน้าตาเหมือนกับ INNER JOIN แบบเป๊ะๆ!)*

---

## 📝 Slide 79: INNER JOIN with Filter
**ตัวอย่างส่งท้ายเรื่อง Join**

เป็นตัวอย่างย้ำการทำงานของ INNER JOIN ผสมกับการสกัดเงื่อนไข (WHERE)

> [!EXAMPLE] หาคนสั่งปริ้นเตอร์ด้วย INNER JOIN
> **คำสั่ง:**
> ```sql
> SELECT Employees.Name 
> FROM Employees 
> INNER JOIN Orders 
> ON Employees.Employee_ID=Orders.Employee_ID 
> WHERE Orders.Product = 'Printer'
> ```
> **ผลลัพธ์:** ได้ `Hansen, Ola` คนเดียวล้วนๆ (ท่านี้ประสิทธิภาพดีและ Clean กว่าท่าโบราณในสไลด์ 72 อย่างมาก)

---

## ➕ Slide 80: UNION and UNION ALL
**การนำตารางมาต่อกันในแนวตั้ง (UNION)**

หาก `JOIN` คือการปะกบตารางใน "แนวนอน (คอลัมน์กว้างขึ้น)", `UNION` จะเป็นการนำตารางมาต่อกันใน "แนวตั้ง (แถวยาวขึ้น)" 

> [!DEFINITION] กฎเหล็กของการ UNION
> 1. ตารางทั้งสองต้องมี**ชนิดของคอลัมน์ตรงกันเป๊ะ** (Data Type เหมือนกัน)
> 2. `UNION` เฉยๆ จะทำการ **"ปัดข้อมูลที่ซ้ำซ้อนกันทิ้ง (Distinct)"** (คล้ายการทำ Set Union)
> 
> **ไวยากรณ์:**
> ```sql
> SQL Statement 1
> UNION
> SQL Statement 2
> ```

---

> (*Lecture 7 - Part 2 สิ้นสุดที่สไลด์ 80 / สไลด์ 81-94 จะขอยกไปต่อใน Part 3 เพื่อคงความละเอียดของ Trace tables ไว้อย่างสูงสุด*)

---
*Last updated: 2026-07-07*
