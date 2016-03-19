CREATE DATABASE `analytics`;
CREATE TABLE `analytics`(
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	user_id VARCHAR(30) NOT NULL,
	session_id VARCHAR(30) NOT NULL,
	url VARCHAR(2083),
	referrer VARCHAR(2083),
	title VARCHAR(255),
	screen_height INT,
	screen_width INT,
	user_agent VARCHAR(255),
	language VARCHAR(10),
	platform VARCHAR(50),
	ip VARCHAR(15),
	`timestamp` TIMESTAMP
);

