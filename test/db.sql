CREATE DATABASE test_workers_auth ENCODING 'utf8';
DROP DATABASE test_workers_auth;

CREATE TABLE IF NOT EXISTS auth(
    id SERIAL NOT NULL PRIMARY KEY,
    userlogin VARCHAR(50) NOT NULL,
    passlogin VARCHAR(150) NOT NULL
);

DROP TABLE auth;

/* http://andti.com.br/tool/hash */
INSERT INTO auth VALUES(1,'admin@aws.com','81dc9bdb52d04dc20036dbd8313ed055');          /*1234*/
INSERT INTO auth VALUES(2,'developer1@heroku.com','e10adc3949ba59abbe56e057f20f883e'); /*123456*/
INSERT INTO auth VALUES(3,'nodedev@gmail.com','827ccb0eea8a706c4c34a16891f84e7b');    /*12345*/

SELECT * FROM auth;