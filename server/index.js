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
  const { fullName, username, password } = req.body;
  if (!fullName || !username || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "Username already registered" });
    }

    const newUser = await pool.query(
      "INSERT INTO users (full_name, username, password) VALUES ($1, $2, $3) RETURNING id, full_name, username",
      [fullName, username, hashedPassword]
    );

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser.rows[0] });
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
    const userResult = await pool.query(
      "SELECT id, full_name, username, password FROM users WHERE username = $1",
      [username]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token, userId: user.id, fullName: user.full_name });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user info by ID
app.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userResult = await pool.query(
      "SELECT id, full_name, username FROM users WHERE id = $1",
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResult.rows[0];
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
////////////// LOGIN BACKEND

///////////// CARDS BACKEND

// create a card for a specific deck
app.post("/decks/:deckId/cards", async (req, res) => {
  try {
    const { deckId } = req.params;
    const { card_question, card_answer } = req.body;

    // Insert the card into the cards table
    const newCard = await pool.query(
      "INSERT INTO cards (card_question, card_answer) VALUES($1, $2) RETURNING *",
      [card_question, card_answer]
    );

    // Insert the card-deck association into the deck_cards table
    await pool.query(
      "INSERT INTO deck_cards (deck_id, card_id) VALUES($1, $2)",
      [deckId, newCard.rows[0].card_id]
    );

    res.json(newCard.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get all cards for a specific deck
app.get("/decks/:deckId/cards", async (req, res) => {
  try {
    const { deckId } = req.params;

    // Retrieve all cards for the specified deck
    const deckCards = await pool.query(
      "SELECT c.* FROM cards c JOIN deck_cards dc ON c.card_id = dc.card_id WHERE dc.deck_id = $1",
      [deckId]
    );

    res.json(deckCards.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update a card
app.put("/cards/:cardId", async (req, res) => {
  try {
    const { cardId } = req.params;
    const { card_question, card_answer } = req.body;

    // Update the card in the cards table
    await pool.query(
      "UPDATE cards SET card_question = $1, card_answer = $2 WHERE card_id = $3",
      [card_question, card_answer, cardId]
    );

    res.json({ message: "Card updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete a card
app.delete("/cards/:cardId", async (req, res) => {
  try {
    const { cardId } = req.params;

    // Delete the card from the deck_cards table
    await pool.query("DELETE FROM deck_cards WHERE card_id = $1", [cardId]);

    // Delete the card from the cards table
    await pool.query("DELETE FROM cards WHERE card_id = $1", [cardId]);

    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

///////////// CARDS BACKEND

///////////// DECKS BACKEND

// create a deck
app.post("/decks", async (req, res) => {
  try {
    const { deck_name, user_id } = req.body;
    console.log("Received values:", deck_name, user_id); // Log the received values

    const newDeck = await pool.query(
      "INSERT INTO decks (deck_name, user_id) VALUES($1, $2) RETURNING *",
      [deck_name, user_id]
    );

    console.log("New deck created:", newDeck.rows[0]); // Log the created deck

    res.json(newDeck.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get all decks for a user
app.get("/decks/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const allDecks = await pool.query(
      "SELECT * FROM decks WHERE user_id = $1",
      [userId]
    );
    res.json(allDecks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a single deck by id
app.get("/decks/:deckId", async (req, res) => {
  try {
    const { deckId } = req.params;
    const deck = await pool.query("SELECT * FROM decks WHERE deck_id = $1", [
      deckId,
    ]);

    if (deck.rows.length === 0) {
      return res.status(404).json({ error: "Deck not found" });
    }

    res.json(deck.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// add a card to a deck
app.post("/decks/:deckId/cards", async (req, res) => {
  try {
    const { deckId } = req.params;
    const { cardId } = req.body;
    const addCard = await pool.query(
      "INSERT INTO deck_cards (deck_id, card_id) VALUES($1, $2)",
      [deckId, cardId]
    );

    res.json({ message: "Card added to deck" });
  } catch (err) {
    console.error(err.message);
  }
});

// get all cards for a deck
app.get("/decks/:deckId/cards", async (req, res) => {
  try {
    const { deckId } = req.params;
    const deckCards = await pool.query(
      "SELECT c.* FROM cards c JOIN deck_cards dc ON c.card_id = dc.card_id WHERE dc.deck_id = $1",
      [deckId]
    );
    res.json(deckCards.rows);
  } catch (err) {
    console.error(err.message);
  }
});

///////////// DECKS BACKEND

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
