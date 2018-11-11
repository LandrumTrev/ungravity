-- ====================================================
-- UnGravity :: A workout checklist web app
-- MVC with MySQL, Node, Express, Handlebars and custom ORM.
-- ©2018 Richard Trevillian
-- University of Richmond (Virginia)
-- Full Stack Developer Bootcamp (July 2018)
-- ====================================================
-- SCHEMA.SQL - MySQL CALLS TO CREATE DATABASE AND TABLE STRUCTURE 
-- ====================================================

DROP DATABASE IF EXISTS ungravity_db;
CREATE DATABASE ungravity_db;
USE ungravity_db;

CREATE TABLE todo
(
	id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	item varchar(255) NOT NULL,
	done BOOLEAN DEFAULT false
);



-- HEROKU:
USE hx9rdomw5n64340s;

CREATE TABLE todo (
	id INT AUTO_INCREMENT NOT NULL ,
	item VARCHAR(255),
	done BOOLEAN DEFAULT false,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
);