const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./collection.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // Create the items table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY,
        idUser INTEGER,
        content TEXT
      )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('posts table created')

      // Clear the existing data in the products table
      db.run(`DELETE FROM posts`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from posts");

        db.run(`CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY,
            idUser TEXT,
            content TEXT,
            idPost INTEGER
          )`,
        (err) => {
          if (err) {
            return console.error(err.message);
          }
        });

        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT,
            name TEXT,
            surname TEXT,
            mail TEXT,
            password TEXT
          )`,
        (err) => {
          if (err) {
            return console.error(err.message);
          }
        });

        //   Close the database connection after all insertions are done
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log("Closed the database connection.");
        });
      });
    }
  );
});