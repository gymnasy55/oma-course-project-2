DROP TABLE IF EXISTS persons;
DROP TABLE IF EXISTS users;
CREATE TABLE persons (
  id SERIAL PRIMARY KEY,
  fname VARCHAR NOT NULL,
  lname VARCHAR NOT NULL,
  age INT NOT NULL,
  city VARCHAR NOT NULL,
  phoneNumber VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  companyName VARCHAR NOT NULL,
  user_id INT NOT NULL
);

INSERT INTO persons VALUES(DEFAULT, 'Lorem', 'Ipsum', 22, 'Kharkiv', '+380777777777', 'test1@test.com', 'DevEducation', 1);
INSERT INTO persons VALUES(DEFAULT, 'Dolor', 'Sit', 23, 'Kharkiv', '+380777777777', 'test2@test.com', 'DevEducation', 2);
INSERT INTO persons VALUES(DEFAULT, 'Amet', 'Сonsectetur', 24, 'Kharkiv', '+380777777777', 'test3@test.com', 'DevEducation', 2);
INSERT INTO persons VALUES(DEFAULT, 'Adipiscing', 'Elit', 25, 'Kharkiv', '+380777777777', 'test4@test.com', 'DevEducation', 1);