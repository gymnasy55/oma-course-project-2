DELETE FROM persons;
DELETE FROM users;

INSERT INTO users VALUES (DEFAULT, 'polcraz', '12345', FALSE);
INSERT INTO users VALUES (DEFAULT, 'oma', '123456', FALSE);

INSERT INTO persons VALUES(DEFAULT, 'Lorem', 'Ipsum', 22, 'Kharkiv', '+380777777777', 'test1@test.com', 'DevEducation', 1, FALSE);
INSERT INTO persons VALUES(DEFAULT, 'Dolor', 'Sit', 23, 'Kharkiv', '+380777777777', 'test2@test.com', 'DevEducation', 2, FALSE);
INSERT INTO persons VALUES(DEFAULT, 'Amet', 'Сonsectetur', 24, 'Kharkiv', '+380777777777', 'test3@test.com', 'DevEducation', 2, FALSE);
INSERT INTO persons VALUES(DEFAULT, 'Adipiscing', 'Elit', 25, 'Kharkiv', '+380777777777', 'test4@test.com', 'DevEducation', 1, FALSE);