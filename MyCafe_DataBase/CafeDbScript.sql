CREATE DATABASE cafedb;
Use cafedb;
CREATE TABLE cafe (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(255) NOT NULL,
  logo VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id CHAR(9) NOT NULL,
  name VARCHAR(255) NOT NULL UNIQUE,
  email_address VARCHAR(255) NOT NULL UNIQUE,
  phone_number VARCHAR(8) NOT NULL UNIQUE,
  gender ENUM('Male', 'Female') NOT NULL,
  cafe_id int NOT NULL,
  start_date DATE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (cafe_id) REFERENCES cafe(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

DELIMITER $$
CREATE PROCEDURE get_cafes_by_location(IN location VARCHAR(255))
BEGIN
    IF location IS NULL OR location = '' THEN
        SELECT c.name, c.description, COUNT(e.id) AS employees, c.logo, c.location, c.id
        FROM cafe c
        LEFT JOIN employee e ON c.id = e.cafe_id
        GROUP BY c.id
        ORDER BY employees DESC;
    ELSE
        SELECT c.name, c.description, COUNT(e.id) AS employees, c.logo, c.location, c.id
        FROM cafe c
        LEFT JOIN employee e ON c.id = e.cafe_id
        WHERE c.location = location
        GROUP BY c.id
        ORDER BY employees DESC;
    END IF;
END$$
DELIMITER ;
