DROP DATABASE IF EXISTS workers_CMS;
CREATE DATABASE workers_CMS;

USE workers_CMS;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT
,deptname VARCHAR(30) NOT NULL
,PRIMARY KEY (id)
);

CREATE TABLE emprole(
id INT NOT NULL AUTO_INCREMENT
,title VARCHAR(30) NOT NULL
,salary DECIMAL(10,2) NOT NULL
,department_id INT NOT NULL
,PRIMARY KEY (id)
);

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT
,first_name VARCHAR(30) NOT NULL
,last_name VARCHAR(30) NOT NULL
,role VARCHAR(30) NOT NULL
,manager VARCHAR(30)
,role_id INT 
,manager_id INT
,PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role, manager, role_id, manager_id)
VALUES('N/A', 'N/A', 'N/A', 'N/A', 0, 0);

SELECT deptname
FROM department
JOIN emprole
ON department.id=emprole.department_id;

SELECT title, salary , department_id
FROM emprole
JOIN employee
ON emprole.id=employee.role_id;

SELECT * FROM employee;

