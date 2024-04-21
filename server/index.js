const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

// Scripts imports
const { getTimerState, setTimerState } = require("./scripts/timerState");
const settingsRouter = require("./scripts/settings");

//ROUTES//
// register API

///////////// LOGIN BACKEND
app.post("/users/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "Username already registered" });
    }

    const newUser = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username", [username, hashedPassword]);

    res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login API
app.post("/users/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
///////////// LOGIN BACKEND

///////////// CARDS BACKEND

// create a card
app.post("/cards", async (req, res) => {
  try {
    const { card_answer, card_question } = req.body;
    const newCard = await pool.query("INSERT INTO cards (card_answer, card_question) VALUES($1, $2) RETURNING *", [card_answer, card_question]);

    res.json(newCard.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all card
app.get("/cards", async (req, res) => {
  try {
    const allCards = await pool.query("SELECT * FROM cards");
    res.json(allCards.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a card
app.get("/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await pool.query("SELECT * FROM cards WHERE card_id = $1", [id]);
    res.json(card.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a card
app.put("/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { card_question } = req.body;
    const updateCard = await pool.query("UPDATE cards SET card_question = $1 WHERE card_id = $2", [card_question, id]);

    res.json("Card was updated");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a card
app.delete("/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCard = await pool.query("DELETE FROM cards WHERE card_id = $1", [id]);
    res.json("Card was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

///////////// CARDS BACKEND

app.listen(5174, () => {
  console.log("Server has started on port 5174");
});

///////////// POMODORO BACKEND

// Import timerState
// Get current timer state
app.get("/api/timer", (req, res) => {
  res.json(getTimerState());
});

// Update current timer state
app.post("/api/timer", (req, res) => {
  const newState = req.body;
  setTimerState(newState);
  res.json({ message: "Timer updated successfully" });
});

///////////// POMODORO BACKEND

// Settings
app.use("/api/settings", settingsRouter);
