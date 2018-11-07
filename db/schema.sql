-- Schema

DROP DATABASE IF EXISTS ungravity_db;
CREATE DATABASE ungravity_db;
USE ungravity_db;

CREATE TABLE todo
(
	id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	item varchar(255) NOT NULL,
	done BOOLEAN DEFAULT false
);
