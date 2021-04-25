DROP TABLE IF EXISTS persons;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    deleted BOOLEAN NOT NULL
);

CREATE TABLE persons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  city VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  companyName VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  deleted BOOLEAN NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO users VALUES (DEFAULT, 'polcraz', '12345', FALSE);
INSERT INTO users VALUES (DEFAULT, 'oma', '123456', FALSE);

INSERT INTO persons VALUES(DEFAULT, 'Lorem', 'Ipsum', 22, 'Kharkiv', '+380777777777', 'test1@test.com', 'DevEducation', 1, FALSE);
INSERT INTO persons VALUES(DEFAULT, 'Dolor', 'Sit', 23, 'Kharkiv', '+380777777777', 'test2@test.com', 'DevEducation', 2, FALSE);
INSERT INTO persons VALUES(DEFAULT, 'Amet', 'Сonsectetur', 24, 'Kharkiv', '+380777777777', 'test3@test.com', 'DevEducation', 2, FALSE);
INSERT INTO persons VALUES(DEFAULT, 'Adipiscing', 'Elit', 25, 'Kharkiv', '+380777777777', 'test4@test.com', 'DevEducation', 1, FALSE);