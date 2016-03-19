CREATE DATABASE `analytics`;
CREATE TABLE `analytics`(
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	session_id VARCHAR(30) NOT NULL,
	referrer VARCHAR(2083),
	title VARCHAR(255),
	screen_height INT,
	screen_width INT,
	user_agent VARCHAR(255),
	language VARCHAR(10),
	platform VARCHAR(50),
	ip VARCHAR(15),
	`timestamp` TIMESTAMP,
	query VARCHAR(2083),
	pathname VARCHAR(2083)
);

