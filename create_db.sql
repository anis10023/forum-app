-- Create database script for forum_app
CREATE DATABASE IF NOT EXISTS forum_app;
USE forum_app;

-- Create the app user and give it access to the database
CREATE USER IF NOT EXISTS 'new_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON forum_app.* TO 'new_user'@'localhost';
FLUSH PRIVILEGES;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Create the topics table
CREATE TABLE IF NOT EXISTS topics (
  topic_id INT AUTO_INCREMENT PRIMARY KEY,
  topic_name VARCHAR(255) NOT NULL
);

-- Create the posts table
CREATE TABLE IF NOT EXISTS posts (
  post_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_id INT,
  topic_id INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
);

-- Create the user_topic table to represent the many-to-many relationship between users and topics
CREATE TABLE IF NOT EXISTS user_topic (
  user_id INT,
  topic_id INT,
  PRIMARY KEY (user_id, topic_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
);
