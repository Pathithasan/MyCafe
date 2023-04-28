CREATE DATABASE cafedb;
Use cafedb;
CREATE TABLE cafe (
  id CHAR(36) NOT NULL,
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
  cafe_id CHAR(36) NOT NULL,
  start_date DATE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (cafe_id) REFERENCES cafe(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);