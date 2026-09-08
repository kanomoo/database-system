CREATE TABLE Students2(
    ID INT,
    Name VARCHAR(50),
    Age INT
);

INSERT INTO Students(ID,Name,Age) VALUES(1,'Few',20),(2,'John',22),(3,'Jane',21);

SELECT * FROM Students WHERE Age > 20;

UPDATE Students SET Age = 22 WHERE ID = 1;

DELETE FROM Students WHERE ID = 3;
