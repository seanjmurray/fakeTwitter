DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(255),
    email VARCHAR(255),
    pass VARCHAR(255)
);

INSERT INTO users (username,email,pass) VALUES ('testname','test@test.com', '$2b$10$gEC2xV9IHh4whq1L0rWvx.nM4iBsVQGZQVVNGy9XOWq.r65FEkeg2');
SELECT * FROM users;