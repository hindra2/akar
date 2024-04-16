const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//middleware
app.use(cors());
app.use(express.json());

// Scripts imports
const { getTimerState, setTimerState } = require("./scripts/timerState");
const settingsRouter = require("./scripts/settings");

//ROUTES//
// register API
app.post("/users/register", async (req, res) => {
  const { username, password } = req.body;
  const errors = [];

  if (!username || !password) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be at least 6 characters long" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Validation passed
    pool.query(`SELECT * FROM users WHERE username = $1`, [username], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      console.log(results.rows);

      if (results.rows.length > 0) {
        return res.status(400).json({ message: "Username already registered" });
      } else {
        pool.query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, password`, [username, hashedPassword], (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
          }

          console.log(results.rows);
          return res.status(201).json({ message: "User registered successfully" });
        });
      }
    });
  }
});

app.post("/users/login", (req, res) => {
  const { username, password } = req.body;
  const errors = [];

  if (!username || !password) {
    errors.push({ message: "Please enter all fields" });
  }

  pool.query(`SELECT * FROM users WHERE username = $1`, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.rows.length == 0) {
      return res.status(401).json({ error: "Invalid username and password" });
    }

    const user = results.rows[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }

      if (isMatch) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ error: "Invalid username or password" });
      }
    });
  });
});

app.listen(5174, () => {
  console.log("Server has started on port 5174");
});


// Import timerState
// Get current timer state
app.get('/api/timer', (req, res) => {
  res.json(getTimerState());
});

// Update current timer state
app.post('/api/timer', (req, res) => {
  const newState = req.body;
  setTimerState(newState);
  res.json({ message: "Timer updated successfully" });
});


// Settings
app.use('/api/settings', settingsRouter);