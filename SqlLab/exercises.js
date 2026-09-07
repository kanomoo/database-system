/**
 * SQL Lab - ชุดแบบฝึกหัดและข้อมูลทั้งหมดจากบทเรียน (Lecture 7 & 7.5)
 */

const BEGINNER_MODULES = [
  {
    id: "beg-mod-1",
    name: "👶 พื้นฐานสำหรับคนไม่เคยเขียนโค้ด (SQL 101)",
    desc: "สอนทีละสเต็ปแบบเข้าใจง่ายที่สุด เปรียบเทียบกับ Excel และชีวิตประจำวัน",
    exercises: [
      {
        id: "beg-1",
        title: "1. SELECT คืออะไร? (เหมือนเลือกคอลัมน์ใน Excel)",
        badge: "Concept",
        theory: `
          <h4>คำว่า SELECT คืออะไรกันแน่?</h4>
          <p>คำว่า <b>SELECT</b> ในภาษาอังกฤษแปลตรงตัวว่า <b>"เลือก"</b></p>
          <p>หน้าที่ของมันมีอย่างเดียวคือ: <b>"บอกว่าเราอยากดูคอลัมน์แนวตั้งอันไหนบ้าง"</b></p>
          <div class="tip-box">
            <strong>📊 นึกภาพตาราง Excel:</strong><br/>
            สมมุติว่าตารางนักเรียนมี 4 คอลัมน์ (ID, Name, Subject, Score) แต่เราอยากดูแค่ <b>ชื่อ (Name)</b> กับ <b>คะแนน (Score)</b> คอลัมน์อื่นไม่อยากเห็น...<br/>
            ใน SQL เราแค่พิมพ์: <code>SELECT Name, Score FROM Students;</code>
          </div>
          <p>กดปุ่ม <b>"เรียกให้ทำงาน (Run)"</b> ด้านล่างเพื่อดูผลลัพธ์ทันที!</p>
        `,
        cleanSlateSql: `DROP TABLE IF EXISTS Students;`,
        defaultSql: `-- สร้างตารางสมุดคะแนนนักเรียนตัวอย่าง (มี 4 คอลัมน์)
DROP TABLE IF EXISTS Students;
CREATE TABLE Students (
    ID INT,
    Name VARCHAR(30),
    Subject VARCHAR(30),
    Score INT
);

INSERT INTO Students VALUES 
(1, 'น้องสมชาย', 'คณิตศาสตร์', 85),
(2, 'น้องสมหญิง', 'คณิตศาสตร์', 92),
(3, 'น้องมานะ', 'คณิตศาสตร์', 42),
(4, 'น้องชูใจ', 'คณิตศาสตร์', 78);

-- 🔍 คำสั่ง SELECT:
-- บอกฐานข้อมูลว่า "ขอเลือกดูเฉพาะคอลัมน์ Name และ Score เท่านั้นนะ (ไม่เอา ID กับ Subject)"
SELECT Name, Score 
FROM Students;`
      },
      {
        id: "beg-2",
        title: "2. ดอกจัน (*) คืออะไร? ทำไมใช้ SELECT *",
        badge: "Concept",
        theory: `
          <h4>ทำไมโปรแกรมเมอร์ชอบพิมพ์ SELECT * ?</h4>
          <p>เครื่องหมายดอกจัน <code>*</code> ในภาษา SQL ย่อมาจากคำว่า <b>"ALL (ทั้งหมด)"</b> หรือ <b>"เหมาหมดทุกคอลัมน์"</b></p>
          <div class="tip-box">
            ถ้าตารางมี 20 คอลัมน์ แล้วเราอยากดูข้อมูลทั้งหมด แทนที่จะต้องพิมพ์ชื่อ 20 คอลัมน์ยาวเหยียด เราแค่พิมพ์ <code>SELECT * FROM Students;</code> คำเดียวจบเลย!
          </div>
        `,
        defaultSql: `-- คำสั่งนี้จะดึงมา "ครบทุกคอลัมน์" ที่มีในตาราง Students (มาครบทั้ง ID, Name, Subject, Score)
SELECT * 
FROM Students;`
      },
      {
        id: "beg-3",
        title: "3. FROM คืออะไร? (บอกแหล่งที่มาของตาราง)",
        badge: "Concept",
        theory: `
          <h4>คำว่า FROM คืออะไร?</h4>
          <p>คำว่า <b>FROM</b> แปลว่า <b>"จากที่ไหน"</b></p>
          <p>ในฐานข้อมูล 1 ตัว สามารถเก็บตารางได้เป็นร้อยๆ ตาราง (เหมือนในไฟล์ Excel ที่มีหลายแผ่น Sheet เช่น Sheet ลูกค้า, Sheet สินค้า, Sheet เมนูอาหาร)</p>
          <p>เวลาเราจะดูข้อมูล เราต้องบอกระบบเสมอว่า <code>FROM ชื่อตาราง</code> เพื่อบอกว่าให้ไปเปิดแผ่นตารางไหน</p>
        `,
        defaultSql: `-- สมมุติว่าเราสร้างตารางใหม่ชื่อ "Menu" (เมนูอาหาร)
DROP TABLE IF EXISTS Menu;
CREATE TABLE Menu (
    FoodName VARCHAR(50),
    Price INT
);

INSERT INTO Menu VALUES 
('ข้าวกะเพราหมูกรอบ', 60),
('ข้าวผัดกุ้ง', 50),
('ต้มยำกุ้ง', 120),
('ชาดำเย็น', 25);

-- สั่งว่า: "เลือกดูคอลัมน์ FoodName กับ Price จาก (FROM) ตาราง Menu"
SELECT FoodName, Price 
FROM Menu;`
      },
      {
        id: "beg-varchar",
        title: "4. VARCHAR คืออะไร? (ชนิดข้อมูลตัวอักษร vs CHAR)",
        badge: "Data Types",
        theory: `
          <h4>VARCHAR คืออะไร? ทำไมต้องมีเลขในวงเล็บ?</h4>
          <p><b>VARCHAR</b> ย่อมาจาก <b>Variable-length Character</b> (ตัวอักษรความยาวแปรผัน)</p>
          <p>ตัวเลขในวงเล็บ เช่น <code>VARCHAR(30)</code> หมายถึง <b>"ความยาวสูงสุดที่ยอมให้พิมพ์ได้ไม่เกิน 30 ตัวอักษร"</b></p>
          <div class="tip-box">
            <strong>🥊 เปรียบเทียบ CHAR vs VARCHAR (เข้าใจใน 10 วินาที):</strong><br/>
            &bull; <b>CHAR(30):</b> เหมือนกล่องเหล็กแข็ง 30 ช่อง ถ้าคุณพิมพ์ชื่อ "สมชาย" (5 ตัว) อีก 25 ช่องที่เหลือจะถูกบังคับเติมช่องว่างให้เต็ม 30 ช่องเสมอ &rarr; <i>กินที่ความจุโดยใช่เหตุ!</i><br/>
            &bull; <b>VARCHAR(30):</b> เหมือนถุงยางยืด ถ้าคุณพิมพ์ชื่อ "สมชาย" (5 ตัว) ระบบจะใช้เนื้อที่แค่ 5 ช่องพอดี และคืนพื้นที่ว่างที่เหลือให้ฮาร์ดดิสก์ &rarr; <i>ประหยัดพื้นที่จัดเก็บมาก!</i>
          </div>
          <p>⚠️ <i>หากพิมพ์เกิน 30 ตัวอักษร ระบบจะแจ้ง Error หรือตัดข้อความส่วนเกินทิ้งทันที</i></p>
        `,
        defaultSql: `-- ตัวอย่างการใช้ VARCHAR และ INT ในตาราง Persons (มาตรฐาน W3Schools)
DROP TABLE IF EXISTS Persons;

CREATE TABLE Persons (
    PersonID INT,
    LastName VARCHAR(30),   -- นามสกุล ไม่เกิน 30 ตัวอักษร
    FirstName VARCHAR(30),  -- ชื่อจริง ไม่เกิน 30 ตัวอักษร
    Address VARCHAR(100),   -- ที่อยู่ ไม่เกิน 100 ตัวอักษร
    City VARCHAR(30)        -- เมือง ไม่เกิน 30 ตัวอักษร
);

-- ตรวจสอบโครงสร้างตาราง (เปิดแท็บ "ตาราง" ด้านซ้ายเพื่อดูชนิดข้อมูลได้เลย)
SELECT 'สร้างตาราง Persons ด้วยชนิดข้อมูล VARCHAR สำเร็จ!' AS Status;`
      },
      {
        id: "beg-insert",
        title: "5. INSERT INTO คืออะไร? (หยอดข้อมูล 2 แบบฉบับ W3Schools)",
        badge: "DML",
        theory: `
          <h4>INSERT INTO = การหยอดข้อมูลแถวใหม่ (Row)</h4>
          <p>คำว่า <b>INSERT</b> แปลว่า "แทรก/ใส่" และ <b>INTO</b> แปลว่า "เข้าไปใน"</p>
          <p>ทุกครั้งที่เราสั่งคำสั่งนี้ ตารางจะมีความยาวเพิ่มขึ้น 1 บรรทัดแนวนอนทันที!</p>
          <div class="tip-box">
            <strong>2 รูปแบบมาตรฐานจาก W3Schools:</strong><br/>
            1. <b>แบบระบุคอลัมน์:</b> <code>INSERT INTO Persons (LastName, FirstName) VALUES ('Hansen', 'Ola');</code> (คอลัมน์อื่นจะกลายเป็น NULL ช่องว่างเปล่า)<br/>
            2. <b>แบบใส่ครบทุกคอลัมน์:</b> <code>INSERT INTO Persons VALUES (1, 'Hansen', 'Ola', 'Timoteivn 10', 'Sandnes');</code>
          </div>
          <div class="warning-box">
            <strong>🚨 กฎเหล็กของ W3Schools:</strong><br/>
            &bull; ข้อความ (Text/Varchar) ต้องใส่เครื่องหมาย <code>'...'</code> (Single Quote) เสมอ เช่น <code>'Hansen'</code><br/>
            &bull; ตัวเลข (Int/Decimal) <b>ห้ามใส่เครื่องหมายคำพูดเด็ดขาด</b> เช่น <code>1</code>, <code>25000</code>
          </div>
        `,
        defaultSql: `-- 1. สร้างตาราง Persons รอไว้
DROP TABLE IF EXISTS Persons;
CREATE TABLE Persons (
    PersonID INT,
    LastName VARCHAR(30),
    FirstName VARCHAR(30),
    Address VARCHAR(100),
    City VARCHAR(30)
);

-- 2. หยอดข้อมูลแถวที่ 1: แบบระบุครบทุกคอลัมน์ (W3Schools Syntax)
INSERT INTO Persons VALUES (1, 'Hansen', 'Ola', 'Timoteivn 10', 'Sandnes');

-- 3. หยอดข้อมูลแถวที่ 2: แบบระบุเฉพาะบางคอลัมน์ (Address และ City จะกลายเป็น NULL)
INSERT INTO Persons (PersonID, LastName, FirstName) VALUES (2, 'Svendson', 'Tove');

-- 4. ดูผลลัพธ์ในตารางหลัง INSERT
SELECT * FROM Persons;`
      },
      {
        id: "beg-drop",
        title: "6. DROP คืออะไร? (ลบตารางทิ้ง หายวับไปกับตา vs DELETE)",
        badge: "DDL",
        theory: `
          <h4>คำว่า DROP คืออะไร?</h4>
          <p>คำว่า <b>DROP</b> ในภาษาอังกฤษแปลว่า "ทิ้ง / ปล่อยให้ตก"</p>
          <p>ใน SQL คำว่า <code>DROP TABLE</code> คือ <b>"คำสั่งทำลายล้างตารางทิ้งถาวร!"</b></p>
          <div class="warning-box">
            <strong>🥊 เปรียบเทียบ DROP TABLE vs DELETE (ห้ามสับสน!):</strong><br/>
            &bull; <b>DROP TABLE Persons;</b> &rarr; เผาสมุดทิ้งทั้งเล่ม! หายทั้งข้อมูลแถวข้างใน และหายทั้งหัวคอลัมน์ (ตารางจะหายสาบสูญไปจากฐานข้อมูล)<br/>
            &bull; <b>DELETE FROM Persons;</b> &rarr; เอายางลบมาลบข้อความในกระดาษทิ้ง แต่ตัวเล่มสมุดและหัวคอลัมน์ยังอยู่ครบ รอให้เราเขียนข้อมูลใหม่ลงไปได้<br/>
            &bull; <b>DROP TABLE IF EXISTS Persons;</b> &rarr; "ถ้าตารางนี้มีอยู่ ให้ลบทิ้งไปเลย แต่ถ้ายังไม่มีอยู่ ก็ไม่ต้องด่า ไม่ต้องขึ้น Error สีแดง" (นิยมเขียนไว้บรรทัดแรกสุดของสคริปต์เสมอ)
          </div>
        `,
        defaultSql: `-- สร้างตารางชั่วคราวขึ้นมาทดสอบ
DROP TABLE IF EXISTS TempTable;
CREATE TABLE TempTable ( ID INT, Note VARCHAR(50) );
INSERT INTO TempTable VALUES (1, 'ข้อความทดสอบที่กำลังจะโดนลบ');

-- คำสั่งทำลายตาราง TempTable ทิ้งถาวร
DROP TABLE TempTable;

-- เมื่อลอง SELECT จะพบ Error แจ้งว่า "no such table: TempTable" (เพราะตารางถูกลบหายไปแล้วจริงๆ)
-- SELECT * FROM TempTable;
SELECT 'ตาราง TempTable ถูกลบทำลายด้วยคำสั่ง DROP เรียบร้อยแล้ว!' AS Result;`
      },
      {
        id: "beg-4",
        title: "7. WHERE คืออะไร? (เหมือนปุ่ม Filter ใน Excel)",
        badge: "Filter",
        theory: `
          <h4>WHERE = ตัวกรองแถวข้อมูล</h4>
          <p>ถ้า <code>SELECT</code> คือการเลือกคอลัมน์แนวดิ่ง... <code>WHERE</code> ก็คือการ<b>เลือกแถวแนวนอน</b>!</p>
          <div class="tip-box">
            <strong>เหมือนปุ่ม Filter รูปกรวยใน Excel:</strong><br/>
            ถ้าเรามีเมนูอาหารเต็มไปหมด แต่อยากกินจานที่ราคาไม่เกิน 50 บาท (งบจำกัด)<br/>
            เราใช้คำสั่ง: <code>WHERE Price &lt;= 50</code>
          </div>
        `,
        defaultSql: `-- กรองดูเฉพาะเมนูที่ราคาไม่เกิน 50 บาท (Price <= 50)
SELECT FoodName, Price 
FROM Menu
WHERE Price <= 50;`
      },
      {
        id: "beg-5",
        title: "8. ORDER BY คืออะไร? (เหมือนปุ่ม Sort เรียงลำดับ)",
        badge: "Sorting",
        theory: `
          <h4>ORDER BY = จัดเรียงแถวตามต้องการ</h4>
          <p>ใน Excel เรามีปุ่ม Sort ก-ฮ หรือเรียงจากน้อยไปมาก ใน SQL เราใช้คำว่า <code>ORDER BY</code>:</p>
          <ul>
            <li><code>ASC</code>: เรียงจากน้อยไปมาก (ต่ำสุดขึ้นก่อน)</li>
            <li><code>DESC</code>: เรียงจากมากไปน้อย (สูงสุดขึ้นก่อน เช่น อันดับคะแนน)</li>
          </ul>
        `,
        defaultSql: `-- เรียงเมนูอาหารจากราคาแพงที่สุด ลงไปหาราคาถูกที่สุด (DESC)
SELECT FoodName, Price 
FROM Menu
ORDER BY Price DESC;`
      },
      {
        id: "beg-6",
        title: "9. สูตรคำนวณ COUNT, SUM, AVG (เหมือนสูตร Excel)",
        badge: "Formulas",
        theory: `
          <h4>ฟังก์ชันคำนวณอัตโนมัติ</h4>
          <p>เทียบกับสูตรที่คุณเคยใช้ใน Excel ได้เลย:</p>
          <ul>
            <li><code>COUNT(*)</code> = สูตร <code>=COUNTA()</code> นับว่ามีกี่แถว/กี่รายการ</li>
            <li><code>SUM(Price)</code> = สูตร <code>=SUM()</code> เอาตัวเลขมารวมกัน</li>
            <li><code>AVG(Price)</code> = สูตร <code>=AVERAGE()</code> หาค่าเฉลี่ย</li>
            <li><code>MIN() / MAX()</code> = หาค่าน้อยสุด และ ค่ามากสุด</li>
          </ul>
        `,
        defaultSql: `-- คำนวณสรุปสถิติราคาอาหารทั้งหมดในร้าน
SELECT 
    COUNT(*) AS จำนวนเมนูทั้งหมด,
    SUM(Price) AS ราคารวมทุกเมนู,
    AVG(Price) AS ราคาเฉลี่ย,
    MIN(Price) AS ราคาถูกสุด,
    MAX(Price) AS ราคาแพงสุด
FROM Menu;`
      },
      {
        id: "beg-7",
        title: "10. GROUP BY คืออะไร? (เหมือน Pivot Table ใน Excel)",
        badge: "Pivot",
        theory: `
          <h4>GROUP BY = มัดรวมข้อมูลเป็นกลุ่มๆ ก่อนคำนวณ</h4>
          <p>เหมือนการทำ <b>Pivot Table</b> ใน Excel!</p>
          <p>ถ้าเรามียอดขายสินค้าหลายประเภท (เครื่องดื่ม, ขนม) แล้วอยากรู้ว่า <i>"เครื่องดื่มขายได้รวมกี่บาท? ขนมขายได้รวมกี่บาท?"</i></p>
          <p>คำสั่ง <code>GROUP BY Category</code> จะไปมัดรวมหมวดเดียวกันไว้ด้วยกัน แล้วค่อยคำนวณผลรวมของแต่ละหมวดออกมา</p>
        `,
        defaultSql: `DROP TABLE IF EXISTS CafeSales;
CREATE TABLE CafeSales (
    Category VARCHAR(30),
    ItemName VARCHAR(30),
    Amount INT
);

INSERT INTO CafeSales VALUES 
('เครื่องดื่ม', 'ชาเย็น', 40),
('เครื่องดื่ม', 'กาแฟลาเต้', 65),
('เบเกอรี่', 'ครัวซองต์', 55),
('เบเกอรี่', 'เค้กช็อกโกแลต', 85),
('เครื่องดื่ม', 'ชาเขียวมะนาว', 45);

-- มัดรวมตามประเภท (Category) แล้วหาผลรวมยอดขายของแต่ละประเภท
SELECT Category, COUNT(*) AS จำนวนรายการ, SUM(Amount) AS ยอดขายรวม
FROM CafeSales
GROUP BY Category;`
      },
      {
        id: "beg-8",
        title: "11. JOIN คืออะไร? (เหมือนสูตร VLOOKUP ข้ามตาราง)",
        badge: "Relational",
        theory: `
          <h4>JOIN = เอา 2 ตารางมาต่อกัน</h4>
          <p>เหมือนสูตร <b>=VLOOKUP()</b> หรือ <b>=XLOOKUP()</b> ใน Excel!</p>
          <div class="tip-box">
            สมมุติว่าตารางบิล (Orders) มีบันทึกว่า: <i>"บิลที่ 101 ลูกค้ารหัส 1 สั่งกาแฟ"</i>... แต่เราไม่รู้ว่ารหัส 1 คือใคร?<br/>
            เราเลยสั่ง <code>JOIN</code> เพื่อให้ระบบไปเปิดตารางลูกค้า (Customers) แล้วเอาชื่อของรหัส 1 มาแปะข้างๆ บิลให้เราดูทันที!
          </div>
        `,
        defaultSql: `DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS OrdersSimple;

CREATE TABLE Customers (
    CustID INT PRIMARY KEY,
    CustName VARCHAR(30)
);

CREATE TABLE OrdersSimple (
    OrderID INT,
    CustID INT,
    Item VARCHAR(30)
);

INSERT INTO Customers VALUES (1, 'พี่สมชาย'), (2, 'พี่สมหญิง');
INSERT INTO OrdersSimple VALUES (101, 1, 'กาแฟร้อน'), (102, 2, 'ชานมไข่มุก'), (103, 1, 'เค้กส้ม');

-- ใช้ INNER JOIN ดึงชื่อลูกค้าจากตาราง Customers มาแสดงคู่กับใบสั่งซื้อ
SELECT OrdersSimple.OrderID, Customers.CustName, OrdersSimple.Item
FROM OrdersSimple
INNER JOIN Customers ON OrdersSimple.CustID = Customers.CustID;`
      },
      {
        id: "beg-9",
        title: "12. ประกอบร่างคำสั่ง SQL ฉบับสมบูรณ์",
        badge: "Mastery",
        theory: `
          <h4>นำทุกคำสั่งมาต่อกันเป็นประโยคเดียว!</h4>
          <p>เวลาเขียนคำสั่ง SQL ที่มีหลายเงื่อนไข ให้จำลำดับการเขียนไว้เสมอ:</p>
          <ol>
            <li><code>SELECT</code> (อยากดูคอลัมน์ไหน)</li>
            <li><code>FROM</code> (จากตารางอะไร)</li>
            <li><code>WHERE</code> (กรองแถวก่อนจัดกลุ่ม)</li>
            <li><code>GROUP BY</code> (มัดรวมกลุ่มตามอะไร)</li>
            <li><code>HAVING</code> (กรองผลรวมของกลุ่ม)</li>
            <li><code>ORDER BY</code> (เรียงลำดับผลลัพธ์)</li>
          </ol>
        `,
        defaultSql: `-- ตัวอย่างการรวมมิตร:
SELECT Category, SUM(Amount) AS TotalSales
FROM CafeSales
WHERE Amount >= 45
GROUP BY Category
HAVING SUM(Amount) >= 100
ORDER BY TotalSales DESC;`
      },
      {
        id: "beg-w3schools",
        title: "13. ชุดข้อมูลจำลอง W3Schools (Customers)",
        badge: "W3Schools",
        theory: `
          <h4>ชุดข้อมูลคลาสสิกที่คนทั้งโลกใช้ฝึกใน W3Schools</h4>
          <p>นี่คือตาราง <code>Customers</code> อันโด่งดังจากเว็บ W3Schools ซึ่งมีคอลัมน์ <code>CustomerName</code>, <code>City</code>, <code>Country</code></p>
          <p>ลองฝึกรันคำสั่งค้นหาลูกค้าตามประเทศต่างๆ เช่น ค้นหาลูกค้าใน 'Germany' หรือ 'Mexico'</p>
        `,
        defaultSql: `DROP TABLE IF EXISTS Customers;
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(50),
    ContactName VARCHAR(50),
    Address VARCHAR(60),
    City VARCHAR(30),
    PostalCode VARCHAR(10),
    Country VARCHAR(30)
);

-- ข้อมูลตัวอย่างจาก W3Schools SQL Tutorial
INSERT INTO Customers VALUES
(1, 'Alfreds Futterkiste', 'Maria Anders', 'Obere Str. 57', 'Berlin', '12209', 'Germany'),
(2, 'Ana Trujillo Emparedados', 'Ana Trujillo', 'Avda. de la Constitución 2222', 'México D.F.', '05021', 'Mexico'),
(3, 'Antonio Moreno Taquería', 'Antonio Moreno', 'Mataderos 2312', 'México D.F.', '05023', 'Mexico'),
(4, 'Around the Horn', 'Thomas Hardy', '120 Hanover Sq.', 'London', 'WA1 1DP', 'UK'),
(5, 'Berglunds snabbköp', 'Christina Berglund', 'Berguvsvägen 8', 'Luleå', 'S-958 22', 'Sweden');

-- ค้นหาลูกค้าที่อยู่ในประเทศ Germany หรือ Mexico ตามตัวอย่าง W3Schools
SELECT CustomerName, ContactName, City, Country
FROM Customers
WHERE Country IN ('Germany', 'Mexico')
ORDER BY Country ASC, CustomerName ASC;`
      },
      {
        id: "beg-create-table",
        title: "14. อยากเพิ่มตารางใหม่ / เพิ่มคอลัมน์ ทำยังไง?",
        badge: "Create Table",
        theory: `
          <h4>เพิ่มตารางใหม่ได้ไหม? &rarr; ได้แน่นอน 100%!</h4>
          <p>ในฐานข้อมูล เราสามารถสร้างตารางกี่สิบกี่ร้อยตารางก็ได้ โดยการ "เพิ่มตาราง" มักมี 2 กรณี:</p>
          <div class="tip-box">
            <strong>1. อยากสร้างตารางใหม่เอี่ยม (CREATE TABLE):</strong><br/>
            เหมือนการกดปุ่ม ➕ เพิ่ม Sheet ใหม่ใน Excel โดยเราต้องตั้งชื่อตาราง และกำหนดหัวคอลัมน์พร้อมชนิดข้อมูล (เช่น <code>INT</code>, <code>VARCHAR</code>)<br/><br/>
            <strong>2. ตารางเดิมมีอยู่แล้ว แต่อยากเพิ่มคอลัมน์ใหม่ (ALTER TABLE ... ADD):</strong><br/>
            เหมือนตารางเดิมมี 3 ช่อง แต่อยากแทรกช่องที่ 4 เช่น เพิ่มช่อง <code>Rating</code> (คะแนนความชอบ) เข้าไปตามหลัก W3Schools
          </div>
          <p>💡 <b>ลองสังเกต:</b> เมื่อกดปุ่ม <b>"▶ รันคำสั่ง"</b> ด้านล่างแล้ว ให้ลองสลับไปที่แท็บ <b>"🗄️ ตาราง"</b> ทางด้านซ้ายมือ คุณจะเห็นตาราง <code>MyHobbies</code> ปรากฏขึ้นมาในระบบทันที! คลิกที่ตารางเพื่อดูข้อมูลได้เลย</p>
        `,
        defaultSql: `-- 1. เคลียร์ตารางเดิมทิ้งก่อน (ถ้าเคยมีอยู่แล้ว) เพื่อไม่ให้ชนกัน
DROP TABLE IF EXISTS MyHobbies;

-- 2. สร้างตารางใหม่ขึ้นมา (เหมือนเพิ่ม Sheet ใหม่)
CREATE TABLE MyHobbies (
    HobbyID INT PRIMARY KEY,
    HobbyName VARCHAR(50),
    HoursPerWeek INT
);

-- 3. หยอดข้อมูลตัวอย่างลงในตารางใหม่
INSERT INTO MyHobbies VALUES
(1, 'เล่นเกม / ดูสตรีมเมอร์', 15),
(2, 'ฟังเพลง / เล่นดนตรี', 7),
(3, 'อ่านหนังสือ / ศึกษาเขียนโค้ด', 10);

-- 4. ลองเพิ่มคอลัมน์ใหม่เข้าไปในตารางเดิม (ALTER TABLE ... ADD จาก W3Schools)
ALTER TABLE MyHobbies ADD Rating INT;

-- 5. เรียกดูตารางที่เราเพิ่งสร้างและเพิ่มคอลัมน์
SELECT * FROM MyHobbies;`
      }
    ]
  }
];

const LAB_MODULES = [
  {
    id: "mod-0",
    name: "🚀 Step 0: ปฐมบทมือใหม่",
    desc: "พื้นฐานสำหรับคนไม่เคยเขียน SQL มาก่อน วิธีสร้างไฟล์ .sql และวิธีรัน",
    exercises: [
      {
        id: "ex-0-1",
        title: "0.1 ทำความรู้จักไฟล์ .sql และคำสั่งแรก",
        badge: "Basic",
        theory: `
          <h4>ไฟล์ .sql คืออะไร?</h4>
          <p>ไฟล์นามสกุล <code>.sql</code> เป็นไฟล์ข้อความธรรมดา (Plain text) ที่เราพิมพ์ชุดคำสั่งภาษา SQL ลงไป เพื่อนำไปส่งให้ระบบฐานข้อมูล (RDBMS) ทำงาน</p>
          <div class="tip-box">
            <strong>💡 วิธีกดรันในเว็บนี้:</strong>
            กดปุ่ม <b>"เรียกให้ทำงาน (Ctrl+Enter)"</b> ด้านล่าง หรือใช้คีย์ลัด <code>Ctrl + Enter</code> บนแป้นพิมพ์เพื่อประมวลผลคำสั่งทันที!
          </div>
          <p>คำสั่งด้านขวาเป็นการทดสอบคำนวณและแสดงข้อความโดยไม่ต้องดึงจากตารางใดๆ</p>
        `,
        cleanSlateSql: `-- ไม่จำเป็นต้องสร้างตารางสำหรับข้อนี้`,
        defaultSql: `SELECT 
    'ยินดีต้อนรับสู่ SQL Lab!' AS WelcomeMessage, 
    2026 AS Year, 
    100 + 50 AS CalculatedResult;`
      }
    ]
  },
  {
    id: "mod-1",
    name: "🏗️ Part 1: พื้นฐาน DDL & DML (Lecture 7)",
    desc: "สร้างตาราง, นำเข้าข้อมูล, แก้ไข, ลบ, และค้นหาข้อมูลเบื้องต้น",
    exercises: [
      {
        id: "ex-1-1",
        title: "1.1 CREATE TABLE: สร้างตาราง Person",
        badge: "DDL",
        theory: `
          <h4>การสร้างโครงสร้างตาราง (CREATE TABLE)</h4>
          <p>คำสั่ง <code>CREATE TABLE</code> ใช้กำหนดชื่อตารางและชื่อคอลัมน์พร้อมชนิดข้อมูล (Data Type):</p>
          <ul>
            <li><code>VARCHAR(30)</code>: ข้อความยาวไม่เกิน 30 ตัวอักษร</li>
            <li><code>INT</code>: ตัวเลขจำนวนเต็ม</li>
          </ul>
          <p>เมื่อขึ้นตัวอย่างใหม่ แนะนำให้ใส่ <code>DROP TABLE IF EXISTS ...;</code> เสมอ เพื่อล้างตารางเก่าทิ้ง ไม่ให้เกิด Error ว่าตารางซ้ำ</p>
        `,
        cleanSlateSql: `DROP TABLE IF EXISTS Person;`,
        defaultSql: `DROP TABLE IF EXISTS Person;

CREATE TABLE Person (
    LastName VARCHAR(30),
    FirstName VARCHAR(30),
    Address VARCHAR(50),
    Age INT
);

-- ตรวจสอบตารางที่สร้างขึ้น (ยังไม่มีข้อมูล)
SELECT * FROM Person;`
      },
      {
        id: "ex-1-2",
        title: "1.2 ALTER TABLE: เพิ่มและลบคอลัมน์",
        badge: "DDL",
        theory: `
          <h4>การปรับโครงสร้างตารางเดิม (ALTER TABLE)</h4>
          <p>ใช้เมื่อสร้างตารางไปแล้ว แต่ต้องการเพิ่มคอลัมน์ใหม่ หรือลบคอลัมน์ที่ไม่ใช้ออก:</p>
          <ul>
            <li><code>ADD column_name datatype</code>: เพิ่มคอลัมน์ใหม่</li>
            <li><code>DROP COLUMN column_name</code>: ลบคอลัมน์ทิ้ง</li>
          </ul>
        `,
        cleanSlateSql: `DROP TABLE IF EXISTS Person;
CREATE TABLE Person (
    LastName VARCHAR(30),
    FirstName VARCHAR(30),
    Address VARCHAR(50),
    Age INT
);
INSERT INTO Person VALUES ('Pettersen', 'Kari', 'Storgt 20', 45);`,
        defaultSql: `-- เพิ่มคอลัมน์ City
ALTER TABLE Person ADD City VARCHAR(30);

-- อัปเดตข้อมูลเมืองให้ Kari
UPDATE Person SET City = 'Stavanger' WHERE LastName = 'Pettersen';

-- ดูผลลัพธ์
SELECT * FROM Person;`
      },
      {
        id: "ex-1-3",
        title: "1.3 INSERT INTO: การนำเข้าข้อมูล",
        badge: "DML",
        theory: `
          <h4>การเพิ่มข้อมูลลงตาราง (INSERT INTO)</h4>
          <p>มี 2 แบบ:</p>
          <ol>
            <li><b>ใส่ครบทุกคอลัมน์:</b> <code>INSERT INTO Table VALUES (v1, v2, ...);</code></li>
            <li><b>ระบุเฉพาะบางคอลัมน์:</b> <code>INSERT INTO Table (col1, col2) VALUES (v1, v2);</code> (คอลัมน์ที่เว้นไว้จะเป็น <code>NULL</code>)</li>
          </ol>
        `,
        cleanSlateSql: `DROP TABLE IF EXISTS Persons;
CREATE TABLE Persons (
    LastName VARCHAR(30),
    FirstName VARCHAR(30),
    Address VARCHAR(50),
    City VARCHAR(30)
);`,
        defaultSql: `DROP TABLE IF EXISTS Persons;
CREATE TABLE Persons (
    LastName VARCHAR(30),
    FirstName VARCHAR(30),
    Address VARCHAR(50),
    City VARCHAR(30)
);

-- แบบที่ 1: ใส่ครบทุกคอลัมน์
INSERT INTO Persons VALUES ('Pettersen', 'Kari', 'Storgt 20', 'Stavanger');
INSERT INTO Persons VALUES ('Hetland', 'Camilla', 'Hagabakka 24', 'Sandnes');

-- แบบที่ 2: ระบุเฉพาะบางคอลัมน์ (FirstName และ City จะเป็น NULL)
INSERT INTO Persons (LastName, Address) VALUES ('Rasmussen', 'Storgt 67');

-- ดูข้อมูลทั้งหมดในตาราง
SELECT * FROM Persons;`
      },
      {
        id: "ex-1-4",
        title: "1.4 UPDATE: แก้ไขข้อมูลในตาราง",
        badge: "DML",
        theory: `
          <h4>การแก้ไขข้อมูล (UPDATE)</h4>
          <p>ใช้เปลี่ยนค่าในแถวที่มีอยู่แล้ว โดยใช้ <code>WHERE</code> ระบุแถวเป้าหมาย</p>
          <div class="warning-box">
            <strong>⚠️ คำเตือนสำคัญ:</strong>
            หากลืมใส่ <code>WHERE</code> ข้อมูลทุกแถวในตารางจะถูกเปลี่ยนเป็นค่าเดียวกันทั้งหมดทันที!
          </div>
        `,
        cleanSlateSql: `DROP TABLE IF EXISTS Persons;
CREATE TABLE Persons (
    LastName VARCHAR(30),
    FirstName VARCHAR(30),
    Address VARCHAR(50),
    City VARCHAR(30)
);
INSERT INTO Persons VALUES ('Nilsen', 'Fred', 'Kirkegt 56', 'Stavanger');
INSERT INTO Persons (LastName, Address) VALUES ('Rasmussen', 'Storgt 67');`,
        defaultSql: `-- เติมชื่อ 'Nina' และเปลี่ยนที่อยู่ให้ Rasmussen
UPDATE Persons 
SET FirstName = 'Nina', Address = 'Stien 12', City = 'Stavanger'
WHERE LastName = 'Rasmussen';

-- ดูผลลัพธ์หลังแก้ไข
SELECT * FROM Persons;`
      },
      {
        id: "ex-1-5",
        title: "1.5 DELETE: ลบแถวข้อมูล",
        badge: "DML",
        theory: `
          <h4>การลบข้อมูล (DELETE)</h4>
          <p>ใช้ลบแถวที่ไม่ต้องการออกจากตาราง:</p>
          <ul>
            <li><code>DELETE FROM Table WHERE ...;</code>: ลบเฉพาะแถวที่ตรงเงื่อนไข</li>
            <li><code>DELETE FROM Table;</code>: ล้างข้อมูลทุกแถว แต่ยังเหลือโครงสร้างตารางเปล่าไว้</li>
          </ul>
        `,
        cleanSlateSql: `DROP TABLE IF EXISTS Persons;
CREATE TABLE Persons (
    LastName VARCHAR(30),
    FirstName VARCHAR(30),
    Address VARCHAR(50),
    City VARCHAR(30)
);
INSERT INTO Persons VALUES ('Nilsen', 'Fred', 'Kirkegt 56', 'Stavanger');
INSERT INTO Persons VALUES ('Rasmussen', 'Nina', 'Stien 12', 'Stavanger');`,
        defaultSql: `-- ลบเฉพาะคนนามสกุล Rasmussen
DELETE FROM Persons WHERE LastName = 'Rasmussen';

-- ดูข้อมูลที่เหลือ
SELECT * FROM Persons;`
      },
      {
        id: "ex-1-6",
        title: "1.6 SELECT & DISTINCT: การคัดเลือกข้อมูล",
        badge: "DQL",
        theory: `
          <h4>การดึงข้อมูล (SELECT) และการตัดแถวซ้ำ (DISTINCT)</h4>
          <p>คำสั่งที่ใช้บ่อยที่สุดในภาษา SQL:</p>
          <ul>
            <li><code>SELECT *</code>: ดึงข้อมูลมาทุกคอลัมน์</li>
            <li><code>SELECT Col1, Col2</code>: ดึงเฉพาะคอลัมน์ที่ต้องการ</li>
            <li><code>SELECT DISTINCT Col</code>: ดึงเฉพาะค่าที่ไม่ซ้ำกัน (ยุบแถวซ้ำ)</li>
          </ul>
        `,
        cleanSlateSql: `DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders (
    Company VARCHAR(30),
    OrderNumber INT
);
INSERT INTO Orders VALUES ('Sega', 3412);
INSERT INTO Orders VALUES ('W3Schools', 2312);
INSERT INTO Orders VALUES ('Trio', 4678);
INSERT INTO Orders VALUES ('W3Schools', 6798);`,
        defaultSql: `-- แบบที่ 1: ดึงมาทั้งหมด (W3Schools จะโผล่มา 2 ครั้ง)
SELECT Company FROM Orders;

-- แบบที่ 2: ใช้ DISTINCT ยุบชื่อซ้ำให้เหลือแค่ 1 บรรทัด
SELECT DISTINCT Company FROM Orders;`
      },
      {
        id: "ex-1-7",
        title: "1.7 WHERE: การกรองข้อมูลและตรรกศาสตร์",
        badge: "DQL",
        theory: `
          <h4>การกรองข้อมูลด้วยเงื่อนไข (WHERE)</h4>
          <p>เครื่องหมายที่ใช้เปรียบเทียบ:</p>
          <ul>
            <li><code>=</code> เท่ากับ, <code>&lt;&gt;</code> ไม่เท่ากับ</li>
            <li><code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code></li>
            <li><code>AND</code>: ต้องจริงทั้งสองเงื่อนไข</li>
            <li><code>OR</code>: เป็นจริงอย่างน้อยหนึ่งเงื่อนไข</li>
          </ul>
          <p><b>หมายเหตุ:</b> ข้อความต้องใส่เครื่องหมาย <code>'...'</code> เสมอ เช่น <code>City = 'Sandnes'</code></p>
        `,
        cleanSlateSql: `DROP TABLE IF EXISTS Persons;
CREATE TABLE Persons (
    LastName VARCHAR(30),
    FirstName VARCHAR(30),
    Address VARCHAR(50),
    City VARCHAR(30),
    Year INT
);
INSERT INTO Persons VALUES ('Hansen', 'Ola', 'Timoteivn 10', 'Sandnes', 1951);
INSERT INTO Persons VALUES ('Svendson', 'Tove', 'Borgvn 23', 'Sandnes', 1978);
INSERT INTO Persons VALUES ('Svendson', 'Stale', 'Kaivn 18', 'Sandnes', 1980);
INSERT INTO Persons VALUES ('Pettersen', 'Kari', 'Storgt 20', 'Stavanger', 1960);`,
        defaultSql: `-- กรองเฉพาะคนที่อยู่ในเมือง Sandnes และเกิดหลังปี 1970
SELECT * FROM Persons 
WHERE City = 'Sandnes' AND Year > 1970;`
      },
      {
        id: "ex-1-8",
        title: "1.8 ORDER BY: การจัดเรียงลำดับ",
        badge: "DQL",
        theory: `
          <h4>การเรียงลำดับผลลัพธ์ (ORDER BY)</h4>
          <ul>
            <li><code>ASC</code>: เรียงจากน้อยไปมาก (A &rarr; Z, 0 &rarr; 9) เป็นค่าเริ่มต้น</li>
            <li><code>DESC</code>: เรียงจากมากไปน้อย (Z &rarr; A, 9 &rarr; 0)</li>
            <li>สามารถเรียงหลายคอลัมน์คั่นด้วยลูกน้ำได้</li>
          </ul>
        `,
        cleanSlateSql: `DROP TABLE IF EXISTS Persons;
CREATE TABLE Persons (
    LastName VARCHAR(30),
    FirstName VARCHAR(30),
    Address VARCHAR(50),
    City VARCHAR(30),
    Year INT
);
INSERT INTO Persons VALUES ('Hansen', 'Ola', 'Timoteivn 10', 'Sandnes', 1951);
INSERT INTO Persons VALUES ('Svendson', 'Tove', 'Borgvn 23', 'Sandnes', 1978);
INSERT INTO Persons VALUES ('Svendson', 'Stale', 'Kaivn 18', 'Sandnes', 1980);
INSERT INTO Persons VALUES ('Pettersen', 'Kari', 'Storgt 20', 'Stavanger', 1960);`,
        defaultSql: `-- เรียงนามสกุลจาก A -> Z หากซ้ำกันให้เรียงปีเกิดจากมากไปน้อย
SELECT LastName, FirstName, Year, City 
FROM Persons 
ORDER BY LastName ASC, Year DESC;`
      }
    ]
  },
  {
    id: "mod-2",
    name: "🧮 Part 2: การคำนวณ จัดกลุ่ม & เชื่อมตาราง",
    desc: "SUM, GROUP BY, HAVING, INNER/LEFT/RIGHT JOIN, UNION และ VIEW",
    exercises: [
      {
        id: "ex-2-1",
        title: "2.1 SUM & GROUP BY: รวมยอดขายแยกตามบริษัท",
        badge: "Aggregates",
        theory: `
          <h4>ทำไมต้องใช้ GROUP BY ร่วมกับฟังก์ชันคำนวณ?</h4>
          <p>หากเราสั่ง <code>SELECT Company, SUM(Amount) FROM Sales</code> โดยไม่มี <code>GROUP BY</code> ระบบจะเกิดข้อผิดพลาด เพราะผลรวมมีค่าเดียว แต่บริษัทมีหลายแถว</p>
          <p>การใส่ <code>GROUP BY Company</code> จะสั่งให้มัดรวมบริษัทชื่อเดียวกันไว้ด้วยกันก่อน แล้วค่อยหาผลรวมยอดขายของแต่ละบริษัท</p>
        `,
        cleanSlateSql: `DROP TABLE IF EXISTS Sales;
CREATE TABLE Sales (
    Company VARCHAR(30),
    Amount INT
);
INSERT INTO Sales VALUES ('W3Schools', 5500);
INSERT INTO Sales VALUES ('IBM', 4500);
INSERT INTO Sales VALUES ('W3Schools', 7100);`,
        defaultSql: `DROP TABLE IF EXISTS Sales;
CREATE TABLE Sales (
    Company VARCHAR(30),
    Amount INT
);
INSERT INTO Sales VALUES ('W3Schools', 5500);
INSERT INTO Sales VALUES ('IBM', 4500);
INSERT INTO Sales VALUES ('W3Schools', 7100);

-- รวมยอดขายแยกรายบริษัทอย่างถูกต้อง
SELECT Company, SUM(Amount) AS TotalSales
FROM Sales
GROUP BY Company;`
      },
      {
        id: "ex-2-2",
        title: "2.2 HAVING: กรองกลุ่มข้อมูลหลังคำนวณ",
        badge: "Aggregates",
        theory: `
          <h4>ความแตกต่างระหว่าง WHERE กับ HAVING</h4>
          <ul>
            <li><code>WHERE</code>: กรองแถวข้อมูล<b>ก่อน</b>ที่จะนำไปจัดกลุ่ม (ห้ามใช้ฟังก์ชัน เช่น SUM ใน WHERE)</li>
            <li><code>HAVING</code>: กรองผลลัพธ์<b>หลัง</b>จากการจัดกลุ่มและคำนวณแล้ว</li>
          </ul>
        `,
        cleanSlateSql: `DROP TABLE IF EXISTS Sales;
CREATE TABLE Sales (
    Company VARCHAR(30),
    Amount INT
);
INSERT INTO Sales VALUES ('W3Schools', 5500);
INSERT INTO Sales VALUES ('IBM', 4500);
INSERT INTO Sales VALUES ('W3Schools', 7100);`,
        defaultSql: `-- แสดงเฉพาะบริษัทที่มียอดขายรวมเกิน 10,000 บาท
SELECT Company, SUM(Amount) AS TotalSales
FROM Sales
GROUP BY Company
HAVING SUM(Amount) > 10000;`
      },
      {
        id: "ex-2-3",
        title: "2.3 INNER JOIN: คัดเฉพาะแถวที่สัมพันธ์กัน",
        badge: "JOIN",
        theory: `
          <h4>การเชื่อมตารางแบบ INNER JOIN</h4>
          <p>เป็นการดึงข้อมูลจาก 2 ตาราง โดยจะแสดงผล<b>เฉพาะแถวที่ค่าในคีย์เชื่อมโยงตรงกันทั้งสองฝั่งเท่านั้น</b></p>
          <p>ในตัวอย่างนี้เชื่อมตาราง <code>Persons.Id_P = Orders.Id_P</code></p>
        `,
        cleanSlateSql: `DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Persons;
CREATE TABLE Persons (
    Id_P INT PRIMARY KEY,
    LastName VARCHAR(30),
    FirstName VARCHAR(30),
    City VARCHAR(30)
);
CREATE TABLE Orders (
    Id_O INT PRIMARY KEY,
    OrderNo INT,
    Id_P INT
);
INSERT INTO Persons VALUES (1, 'Hansen', 'Ola', 'Sandnes');
INSERT INTO Persons VALUES (2, 'Svendson', 'Tove', 'Sandnes');
INSERT INTO Persons VALUES (3, 'Pettersen', 'Kari', 'Stavanger');

INSERT INTO Orders VALUES (1, 77895, 3);
INSERT INTO Orders VALUES (2, 44678, 3);
INSERT INTO Orders VALUES (3, 22456, 1);
INSERT INTO Orders VALUES (4, 24562, 1);
INSERT INTO Orders VALUES (5, 34764, 15);`,
        defaultSql: `SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo
FROM Persons
INNER JOIN Orders ON Persons.Id_P = Orders.Id_P
ORDER BY Persons.LastName;`
      },
      {
        id: "ex-2-4",
        title: "2.4 LEFT JOIN: เอาตารางซ้ายมาทั้งหมด",
        badge: "JOIN",
        theory: `
          <h4>การเชื่อมตารางแบบ LEFT JOIN</h4>
          <p>จะดึงข้อมูลจากตารางฝั่งซ้าย (Persons) ออกมา<b>ทุกคนครบทุกแถว</b> แม้ว่าคนนั้นจะยังไม่เคยมีใบสั่งซื้อในตารางขวา (Orders) ก็ตาม (ฝั่งขวาจะแสดงเป็น <code>NULL</code>)</p>
          <p>สังเกตแถวของ <code>Svendson Tove</code> จะแสดงขึ้นมาด้วย</p>
        `,
        cleanSlateSql: `DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Persons;
CREATE TABLE Persons (
    Id_P INT PRIMARY KEY,
    LastName VARCHAR(30),
    FirstName VARCHAR(30),
    City VARCHAR(30)
);
CREATE TABLE Orders (
    Id_O INT PRIMARY KEY,
    OrderNo INT,
    Id_P INT
);
INSERT INTO Persons VALUES (1, 'Hansen', 'Ola', 'Sandnes');
INSERT INTO Persons VALUES (2, 'Svendson', 'Tove', 'Sandnes');
INSERT INTO Persons VALUES (3, 'Pettersen', 'Kari', 'Stavanger');

INSERT INTO Orders VALUES (1, 77895, 3);
INSERT INTO Orders VALUES (2, 44678, 3);
INSERT INTO Orders VALUES (3, 22456, 1);
INSERT INTO Orders VALUES (4, 24562, 1);
INSERT INTO Orders VALUES (5, 34764, 15);`,
        defaultSql: `SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo
FROM Persons
LEFT JOIN Orders ON Persons.Id_P = Orders.Id_P
ORDER BY Persons.LastName;`
      },
      {
        id: "ex-2-5",
        title: "2.5 UNION vs UNION ALL: การรวมผลลัพธ์",
        badge: "Set Ops",
        theory: `
          <h4>การรวมแถวข้อมูล (UNION & UNION ALL)</h4>
          <ul>
            <li><code>UNION</code>: นำข้อมูล 2 ตารางมาต่อกันในแนวตั้ง และ<b>ตัดตัวที่ซ้ำกันทิ้ง</b></li>
            <li><code>UNION ALL</code>: นำข้อมูลมาต่อกันโดยตรง <b>เก็บทุกแถวไว้ครบถ้วน แม้จะซ้ำกัน</b></li>
          </ul>
        `,
        cleanSlateSql: `DROP TABLE IF EXISTS Employees_Norway;
DROP TABLE IF EXISTS Employees_USA;
CREATE TABLE Employees_Norway ( E_ID INT, E_Name VARCHAR(50) );
CREATE TABLE Employees_USA ( E_ID INT, E_Name VARCHAR(50) );

INSERT INTO Employees_Norway VALUES (1, 'Hansen, Ola'), (2, 'Svendson, Tove'), (3, 'Svendson, Stephen'), (4, 'Pettersen, Kari');
INSERT INTO Employees_USA VALUES (1, 'Turner, Sally'), (2, 'Kent, Clark'), (3, 'Hansen, Ola'), (4, 'Scott, Stephen');`,
        defaultSql: `-- รวมรายชื่อพนักงานแบบตัดตัวซ้ำทิ้ง (Hansen, Ola จะเหลือแถวเดียว)
SELECT E_Name FROM Employees_Norway
UNION
SELECT E_Name FROM Employees_USA
ORDER BY E_Name;`
      },
      {
        id: "ex-2-6",
        title: "2.6 CREATE VIEW: สร้างมุมมองตารางเสมือน",
        badge: "View",
        theory: `
          <h4>การสร้าง View</h4>
          <p>View คือตารางเสมือนที่สร้างจากผลการ Query คำสั่งยาวๆ ช่วยให้เราสามารถเรียกดูข้อมูลที่ประมวลผลไว้แล้วได้ง่ายๆ เหมือนตารางปกติ</p>
        `,
        cleanSlateSql: `DROP TABLE IF EXISTS Products;
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(40),
    UnitPrice DECIMAL(10,2)
);
INSERT INTO Products VALUES (1, 'Chai', 18.00);
INSERT INTO Products VALUES (2, 'Chang', 19.00);
INSERT INTO Products VALUES (3, 'Aniseed Syrup', 10.00);
INSERT INTO Products VALUES (4, 'Chef Anton Seasoning', 22.00);`,
        defaultSql: `DROP VIEW IF EXISTS View_ExpensiveProducts;

-- สร้าง View เก็บเฉพาะสินค้าราคาเกิน 15 บาท
CREATE VIEW View_ExpensiveProducts AS
SELECT ProductID, ProductName, UnitPrice
FROM Products
WHERE UnitPrice > 15.00;

-- ดึงข้อมูลจาก View
SELECT * FROM View_ExpensiveProducts ORDER BY UnitPrice DESC;`
      }
    ]
  },
  {
    id: "mod-3",
    name: "🛒 Part 3: แล็บระบบร้านค้า 7 ตาราง (Lecture 7.5)",
    desc: "ฐานข้อมูลสมบูรณ์ 7 ตาราง พร้อมโจทย์ข้อสอบแล็บจริง 12 ข้อ",
    exercises: [
      {
        id: "ex-3-0",
        title: "3.0 โหลดฐานข้อมูลร้านค้าสมบูรณ์ 7 ตาราง",
        badge: "Setup All",
        theory: `
          <h4>โครงสร้างระบบร้านค้าสมบูรณ์ 7 ตาราง</h4>
          <p>ประกอบด้วย: <code>Title</code>, <code>Customer</code>, <code>Category</code>, <code>Unit</code>, <code>Product</code>, <code>Orders</code>, <code>OrdersDetail</code></p>
          <div class="tip-box">
            กดปุ่ม <b>"เรียกให้ทำงาน (Run)"</b> เพื่อสร้างทั้ง 7 ตารางและหยอดข้อมูลตัวอย่างทั้งหมดจากสไลด์บทที่ 7.5 ทันที
          </div>
        `,
        cleanSlateSql: `-- ตัวจัดการจะสร้างตารางทั้งหมดใน defaultSql`,
        defaultSql: `-- ล้างและสร้างระบบร้านค้า 7 ตาราง
DROP TABLE IF EXISTS OrdersDetail;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Unit;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Title;

CREATE TABLE Title (
    TitleID VARCHAR(5) PRIMARY KEY,
    TitleName VARCHAR(20) NOT NULL
);

CREATE TABLE Customer (
    CustID VARCHAR(10) PRIMARY KEY,
    CustName VARCHAR(50) NOT NULL,
    CustAddress VARCHAR(100),
    CustSex VARCHAR(1),
    CustSalary DECIMAL(10, 2),
    TitleID VARCHAR(5)
);

CREATE TABLE Category (
    CateID VARCHAR(5) PRIMARY KEY,
    CateName VARCHAR(30) NOT NULL
);

CREATE TABLE Unit (
    UnitID VARCHAR(5) PRIMARY KEY,
    UnitName VARCHAR(20) NOT NULL
);

CREATE TABLE Product (
    ProdID VARCHAR(10) PRIMARY KEY,
    ProdName VARCHAR(50) NOT NULL,
    ProdPrice DECIMAL(10, 2) NOT NULL,
    ProdCost DECIMAL(10, 2) NOT NULL,
    ProdQty INT NOT NULL,
    CateID VARCHAR(5),
    UnitID VARCHAR(5)
);

CREATE TABLE Orders (
    OrderID VARCHAR(10) PRIMARY KEY,
    OrderDate DATE NOT NULL,
    CustID VARCHAR(10)
);

CREATE TABLE OrdersDetail (
    OrderID VARCHAR(10),
    ProdID VARCHAR(10),
    UnitPrice DECIMAL(10, 2) NOT NULL,
    Quantity INT NOT NULL,
    Discount DECIMAL(5, 2) DEFAULT 0,
    PRIMARY KEY (OrderID, ProdID)
);

-- หยอดข้อมูลตัวอย่าง
INSERT INTO Title VALUES ('T01', 'นาย'), ('T02', 'นางสาว'), ('T03', 'นาง');
INSERT INTO Customer VALUES 
('C001', 'สมชาย ชัยชนะ', 'กรุงเทพมหานคร', 'M', 25000.00, 'T01'),
('C002', 'สมหญิง จริงใจ', 'เชียงใหม่', 'F', 32000.00, 'T02'),
('C003', 'มานะ อดทน', 'ขอนแก่น', 'M', 18000.00, 'T01'),
('C004', 'สุภาพร วงศ์ดี', 'กรุงเทพมหานคร', 'F', 45000.00, 'T03'),
('C005', 'วีระ กล้าหาญ', 'ชลบุรี', 'M', 22000.00, 'T01');

INSERT INTO Category VALUES ('CT01', 'อาหารกระป๋อง'), ('CT02', 'เครื่องดื่ม'), ('CT03', 'ของใช้ทั่วไป');
INSERT INTO Unit VALUES ('U01', 'กระป๋อง'), ('U02', 'ขวด'), ('U03', 'ชิ้น');

INSERT INTO Product VALUES 
('P001', 'ปลากระป๋องไฮคิว', 18.00, 14.00, 150, 'CT01', 'U01'),
('P002', 'น้ำส้มคั้นแท้', 35.00, 25.00, 80, 'CT02', 'U02'),
('P003', 'สบู่ก้อนหอม', 15.00, 10.00, 200, 'CT03', 'U03'),
('P004', 'กาแฟปรุงสำเร็จ', 65.00, 50.00, 45, 'CT02', 'U02'),
('P005', 'ยาสระผมสูตรเย็น', 59.00, 42.00, 60, 'CT03', 'U02');

INSERT INTO Orders VALUES 
('ORD01', '2026-08-01', 'C001'),
('ORD02', '2026-08-03', 'C002'),
('ORD03', '2026-08-05', 'C001'),
('ORD04', '2026-08-10', 'C004');

INSERT INTO OrdersDetail VALUES 
('ORD01', 'P001', 18.00, 5, 0.00),
('ORD01', 'P002', 35.00, 2, 0.00),
('ORD02', 'P003', 15.00, 10, 5.00),
('ORD03', 'P004', 65.00, 1, 0.00),
('ORD04', 'P005', 59.00, 3, 10.00);

SELECT 'สร้างและหยอดข้อมูล 7 ตารางสำเร็จสมบูรณ์!' AS Status;`
      },
      {
        id: "ex-3-1",
        title: "3.1 ค้นหาลูกค้าเรียงตามเงินเดือนสูงสุด",
        badge: "ORDER BY",
        theory: `
          <h4>โจทย์ข้อที่ 1</h4>
          <p>จงแสดงชื่อลูกค้า ที่อยู่ เพศ และเงินเดือน โดยเรียงลำดับจากคนที่มีเงินเดือนสูงที่สุดลงไปหาน้อยที่สุด (Descending)</p>
        `,
        defaultSql: `SELECT CustName, CustAddress, CustSex, CustSalary
FROM Customer
ORDER BY CustSalary DESC;`
      },
      {
        id: "ex-3-2",
        title: "3.2 ค้นหาสินค้าราคา 20 - 60 บาท ด้วย BETWEEN",
        badge: "BETWEEN",
        theory: `
          <h4>โจทย์ข้อที่ 2</h4>
          <p>จงค้นหาสินค้าที่มีราคาขาย (<code>ProdPrice</code>) อยู่ในช่วง 20 ถึง 60 บาท โดยใช้ <code>BETWEEN ... AND</code></p>
        `,
        defaultSql: `SELECT ProdID, ProdName, ProdPrice
FROM Product
WHERE ProdPrice BETWEEN 20.00 AND 60.00;`
      },
      {
        id: "ex-3-3",
        title: "3.3 ค้นหาลูกค้าใน กทม. หรือ เชียงใหม่ ด้วย IN",
        badge: "IN Clause",
        theory: `
          <h4>โจทย์ข้อที่ 3</h4>
          <p>จงแสดงรายชื่อลูกค้าที่อาศัยอยู่ในจังหวัด 'กรุงเทพมหานคร' หรือ 'เชียงใหม่' โดยใช้ <code>IN (...)</code></p>
        `,
        defaultSql: `SELECT CustID, CustName, CustAddress
FROM Customer
WHERE CustAddress IN ('กรุงเทพมหานคร', 'เชียงใหม่');`
      },
      {
        id: "ex-3-4",
        title: "3.4 ค้นหาชื่อสินค้าด้วย LIKE Wildcard",
        badge: "LIKE",
        theory: `
          <h4>โจทย์ข้อที่ 4</h4>
          <p>จงค้นหาสินค้าที่มีคำว่า <b>'สบู่'</b> อยู่ส่วนใดก็ได้ของชื่อ (<code>%สบู่%</code>) หรือขึ้นต้นด้วยคำว่า <b>'กาแฟ'</b> (<code>กาแฟ%</code>)</p>
        `,
        defaultSql: `SELECT ProdID, ProdName, ProdPrice
FROM Product
WHERE ProdName LIKE '%สบู่%' OR ProdName LIKE 'กาแฟ%';`
      },
      {
        id: "ex-3-5",
        title: "3.5 คำนวณกำไรและมูลค่าสต็อกรวม",
        badge: "Computed",
        theory: `
          <h4>โจทย์ข้อที่ 5</h4>
          <p>จงคำนวณกำไรต่อหน่วย (<code>ProdPrice - ProdCost</code>) และมูลค่าสต็อกสินค้าทั้งหมด (<code>ProdPrice * ProdQty</code>) พร้อมตั้งนามแฝง (Alias)</p>
        `,
        defaultSql: `SELECT 
    ProdName,
    ProdPrice,
    ProdCost,
    (ProdPrice - ProdCost) AS UnitProfit,
    (ProdPrice * ProdQty) AS TotalStockValue
FROM Product;`
      },
      {
        id: "ex-3-6",
        title: "3.6 สรุปจำนวนลูกค้าและเงินเดือนเฉลี่ยแยกเพศ",
        badge: "GROUP BY",
        theory: `
          <h4>โจทย์ข้อที่ 6</h4>
          <p>จงนับจำนวนลูกค้า (<code>COUNT</code>) และหาเงินเดือนเฉลี่ย (<code>AVG</code>) โดยจัดกลุ่มแยกตามเพศ (<code>GROUP BY CustSex</code>)</p>
        `,
        defaultSql: `SELECT 
    CustSex,
    COUNT(CustID) AS TotalCustomers,
    AVG(CustSalary) AS AverageSalary
FROM Customer
GROUP BY CustSex;`
      },
      {
        id: "ex-3-7",
        title: "3.7 กรองกลุ่มเงินเดือนเฉลี่ยเกิน 30,000 ด้วย HAVING",
        badge: "HAVING",
        theory: `
          <h4>โจทย์ข้อที่ 7</h4>
          <p>แสดงเฉพาะกลุ่มเพศที่มียอดเงินเดือนเฉลี่ยสูงกว่า 30,000 บาทขึ้นไป</p>
        `,
        defaultSql: `SELECT 
    CustSex,
    AVG(CustSalary) AS AverageSalary
FROM Customer
GROUP BY CustSex
HAVING AVG(CustSalary) > 30000;`
      },
      {
        id: "ex-3-8",
        title: "3.8 เชื่อมโยง Customer กับ Title เพื่อใส่คำนำหน้า",
        badge: "2-Table JOIN",
        theory: `
          <h4>โจทย์ข้อที่ 8</h4>
          <p>เชื่อมโยง 2 ตารางระหว่าง <code>Customer</code> กับ <code>Title</code> เพื่อให้แสดงคำนำหน้าชื่อเต็ม (เช่น นาย, นางสาว)</p>
        `,
        defaultSql: `SELECT 
    Customer.CustID,
    Title.TitleName,
    Customer.CustName,
    Customer.CustAddress
FROM Customer
INNER JOIN Title ON Customer.TitleID = Title.TitleID;`
      },
      {
        id: "ex-3-9",
        title: "3.9 เชื่อมโยง 3 ตาราง: สินค้า + ประเภท + หน่วยนับ",
        badge: "3-Table JOIN",
        theory: `
          <h4>โจทย์ข้อที่ 9</h4>
          <p>แสดงรหัสสินค้า ชื่อสินค้า ราคาขาย พร้อมชื่อประเภทสินค้า (จาก Category) และชื่อหน่วยนับ (จาก Unit)</p>
        `,
        defaultSql: `SELECT 
    Product.ProdID,
    Product.ProdName,
    Product.ProdPrice,
    Category.CateName,
    Unit.UnitName
FROM Product
INNER JOIN Category ON Product.CateID = Category.CateID
INNER JOIN Unit ON Product.UnitID = Unit.UnitID;`
      },
      {
        id: "ex-3-10",
        title: "3.10 รายงานคำสั่งซื้อแบบลึก 4 ตาราง",
        badge: "4-Table JOIN",
        theory: `
          <h4>โจทย์ข้อที่ 10 (ข้อสอบออกบ่อย!)</h4>
          <p>เชื่อมโยง 4 ตาราง: <code>Orders</code> + <code>Customer</code> + <code>OrdersDetail</code> + <code>Product</code> เพื่อออกรายงานใบเสร็จสินค้าครบทุกรายละเอียด</p>
        `,
        defaultSql: `SELECT 
    Orders.OrderID,
    Orders.OrderDate,
    Customer.CustName,
    Product.ProdName,
    OrdersDetail.Quantity,
    OrdersDetail.UnitPrice,
    (OrdersDetail.Quantity * OrdersDetail.UnitPrice) AS SubTotal
FROM Orders
INNER JOIN Customer ON Orders.CustID = Customer.CustID
INNER JOIN OrdersDetail ON Orders.OrderID = OrdersDetail.OrderID
INNER JOIN Product ON OrdersDetail.ProdID = Product.ProdID
ORDER BY Orders.OrderID;`
      },
      {
        id: "ex-3-11",
        title: "3.11 สำรองข้อมูลลูกค้าหญิงด้วย CREATE TABLE AS",
        badge: "Subquery DDL",
        theory: `
          <h4>โจทย์ข้อที่ 11</h4>
          <p>สร้างตารางใหม่ชื่อ <code>CustomerFemale</code> โดยดึงเฉพาะข้อมูลลูกค้าผู้หญิงมาเก็บไว้</p>
        `,
        defaultSql: `DROP TABLE IF EXISTS CustomerFemale;

CREATE TABLE CustomerFemale AS
SELECT CustID, CustName, CustAddress, CustSalary
FROM Customer
WHERE CustSex = 'F';

-- ตรวจสอบตารางใหม่ที่สร้างขึ้น
SELECT * FROM CustomerFemale;`
      },
      {
        id: "ex-3-12",
        title: "3.12 สร้าง View สรุปยอดเงินรวมสุทธิต่อใบสั่งซื้อ",
        badge: "View & Aggregates",
        theory: `
          <h4>โจทย์ข้อที่ 12</h4>
          <p>สร้าง View ชื่อ <code>View_OrderSummary</code> คำนวณยอดเงินรวมสุทธิของแต่ละบิล (<code>Quantity * UnitPrice - Discount</code>)</p>
        `,
        defaultSql: `DROP VIEW IF EXISTS View_OrderSummary;

CREATE VIEW View_OrderSummary AS
SELECT 
    Orders.OrderID,
    Orders.OrderDate,
    Customer.CustName,
    SUM(OrdersDetail.Quantity * OrdersDetail.UnitPrice - OrdersDetail.Discount) AS NetAmount
FROM Orders
INNER JOIN Customer ON Orders.CustID = Customer.CustID
INNER JOIN OrdersDetail ON Orders.OrderID = OrdersDetail.OrderID
GROUP BY Orders.OrderID, Orders.OrderDate, Customer.CustName;

-- เรียกดูรายงานผ่าน View โดยเรียงยอดเงินสุทธิจากมากไปน้อย
SELECT * FROM View_OrderSummary ORDER BY NetAmount DESC;`
      }
    ]
  }
];
