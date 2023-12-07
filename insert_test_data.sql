-- Insert data into the tables

USE forum_app;

-- Insert data into topics (assuming you have some topics)
INSERT INTO topics (topic_name) VALUES ('Topic1'), ('Topic2'), ('Topic3');

-- Insert data into users
INSERT INTO users (username, password) VALUES ('johnnyBoys', 'password1'), ('KayBys', 'password2'), ('Lenny', 'password3');

-- Insert data into posts
INSERT INTO posts (title, content, user_id, topic_id) VALUES
  ('Example 1', 'lorem ipsum', 1, 1), -- Assuming 'johnnyBoys' has user_id 1 and 'Topic1' has topic_id 1
  ('Example 2', 'lorem ipsum', 2, 1), -- Assuming 'KayBys' has user_id 2 and 'Topic1' has topic_id 1
  ('Example 3', 'lorem ipsum', 3, 2); -- Assuming 'Lenny' has user_id 3 and 'Topic2' has topic_id 2
