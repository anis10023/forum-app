# Insert data into the tables

USE forum_app;

INSERT INTO posts (post_id, title, content, user_id, topic_id)VALUES(0, 'Example 1', 'lorem ipsum', 'user1', 0),(0, 'Example 2', 'lorem ipsum', 'user2', 0), (0, 'Example 3', 'lorem ipsum', 'user3', 0);

INSERT INTO users (user_id, username)VALUES('user1', 'johnnyBoys'), ('user2', 'KayBys'), ('user3', 'Lenny')