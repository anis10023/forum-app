// Exporting a function that sets up routes for the application
module.exports = function (app, forumData) {
  // Home route
  app.get("/", function (req, res) {
    res.render("index.ejs", forumData);
  });

  // About route
  app.get("/about", function (req, res) {
    res.render("about.ejs", forumData);
  });

  // Topics route
  app.get("/topics", function (req, res) {
    // Query database to get all topics
    let sqlquery = "SELECT * FROM topics";

    // Execute SQL query
    db.query(sqlquery, (err, result) => {
      if (err) {
        return res.status(500).send("Error fetching data from the database.");
      }
      res.render("topics.ejs", { forumName: "Unity", topics: result });
    });
  });

  // Users route
  app.get("/users", function (req, res) {
    // Query database to get all users
    let sqlquery = "SELECT * FROM users";

    // Execute SQL query
    db.query(sqlquery, (err, result) => {
      if (err) {
        return res.status(500).send("Error fetching data from the database.");
      }
      res.render("users.ejs", { forumName: "Unity", users: result });
    });
  });

  // Posts route
  app.get("/posts", function (req, res) {
    // Query database to get all posts
    let sqlquery = "SELECT * FROM posts";

    // Execute SQL query
    db.query(sqlquery, (err, result) => {
      if (err) {
        return res.status(500).send("Error fetching data from the database.");
      }
      res.render("posts.ejs", { forumName: "Unity", posts: result });
    });
  });

  // Add New Post page (GET)
  app.get("/add-new-post", function (req, res) {
    // Fetch necessary data, e.g., users and topics
    let sqlQueryUsers = "SELECT * FROM users";
    let sqlQueryTopics = "SELECT * FROM topics";

    db.query(sqlQueryUsers, (errUsers, users) => {
      if (errUsers) {
        console.error("Error fetching users:", errUsers);
        users = [];
      }

      db.query(sqlQueryTopics, (errTopics, topics) => {
        if (errTopics) {
          console.error("Error fetching topics:", errTopics);
          topics = [];
        }

        res.render("add-new-post.ejs", { forumName: "Unity", users, topics });
      });
    });
  });

  // Route to handle form submission for adding a new post (POST)
  app.post("/add-new-post", function (req, res) {
    // Extract data from the form submission
    const title = req.body.title;
    const content = req.body.content;
    const userId = req.body.user;
    const topicId = req.body.topic;

    // Perform database insertion or any other required logic
    // For example, assuming you have a 'posts' table
    const sqlQuery =
      "INSERT INTO posts (title, content, user_id, topic_id) VALUES (?, ?, ?, ?)";
    const values = [title, content, userId, topicId];

    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error("Error inserting post:", err);
        return res.status(500).send("Error inserting post into the database.");
      }

      // Insert into user_topic to represent the association between the user and the topic
      const sqlUserTopic =
        "INSERT INTO user_topic (user_id, topic_id) VALUES (?, ?)";
      const valuesUserTopic = [userId, topicId];

      db.query(
        sqlUserTopic,
        valuesUserTopic,
        (errUserTopic, resultUserTopic) => {
          if (errUserTopic) {
            console.error("Error inserting user_topic:", errUserTopic);
            // Handle the error if needed
          }

          // Redirect the user to a different page after successful submission
          res.redirect("/posts"); // Change "/posts" to the desired URL
        }
      );
    });
  });

  // Read Post page (GET)
  app.get("/read-post/:postId", function (req, res) {
    const postId = req.params.postId;

    // Fetch the specific post based on the postId
    const sqlQuery = "SELECT * FROM posts WHERE post_id = ?";
    db.query(sqlQuery, [postId], (err, result) => {
      if (err) {
        console.error("Error fetching post:", err);
        return res.status(500).send("Error fetching post from the database.");
      }

      if (result.length === 0) {
        // Post not found
        return res.status(404).send("Post not found.");
      }

      const post = result[0];
      res.render("read-post.ejs", { forumName: "Unity", post });
    });
  });

  // Search route
  app.get("/search", function (req, res) {
    // Extract the search query from the URL
    const searchQuery = req.query.query;

    if (!searchQuery) {
      // If no search query is provided, render the search form
      return res.render("search.ejs", { forumName: "Unity" });
    }

    // Perform a database query to find posts matching the search query
    let sqlquery = "SELECT * FROM posts WHERE title LIKE ?";
    let searchPattern = `%${searchQuery}%`;

    db.query(sqlquery, [searchPattern], (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).send("Error fetching data from the database.");
      }

      // Render the search results page with the matching posts
      res.render("search-result.ejs", {
        forumName: "Unity",
        searchQuery: searchQuery,
        searchResults: result,
      });
    });
  });

  // ... Add routes for user registration, login, and authentication as needed
};
