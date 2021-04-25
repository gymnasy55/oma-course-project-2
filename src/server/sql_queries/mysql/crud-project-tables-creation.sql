DROP TABLE IF EXISTS persons;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
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
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);