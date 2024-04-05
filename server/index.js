const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

// register API

app.post("/users/register", async (req, res) => {
  const { username, password } = req.body;

  const errors = [];

  if (!username || !password) {
    errors.push({ message: "Please enter all fields" });
  }

  if (!password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (errors.length > 0) {
    res.render("register", { errors, username, password });
  } else {
    hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Validation passed
    pool.query(
      `SELECT * FROM users
      WHERE name = $1`,
      [username],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          return res.render("register", {
            message: "Username already registered",
          });
        } else {
          pool.query(
            `INSERT INTO users (name, password)
            VALUES ($1, $2)
            RETURNING id, password`,
            [username, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              req.flash("success_msg", "You are now registered. Please log in");
              res.redirect("/users/login");
            }
          );
        }
      }
    );
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
