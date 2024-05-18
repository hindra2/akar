const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
require("dotenv").config({ path: ".env.server" });

//middleware
app.use(cors());
app.use(express.json());

// Scripts imports
const { getTimerState, setTimerState } = require("./scripts/timerState");
const settingsRouter = require("./scripts/settings");
const firebase = require("./scripts/firebase");

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

// Delete a deck and its associated cards
app.delete("/decks/:deckId", async (req, res) => {
  try {
    const { deckId } = req.params;
    console.log("Received delete request for deck ID:", deckId);

    await pool.query("BEGIN");

    console.log("Deleting cards from deck_cards table...");
    await pool.query("DELETE FROM deck_cards WHERE deck_id = $1", [deckId]);

    console.log("Deleting cards from cards table...");
    await pool.query(
      "DELETE FROM cards WHERE card_id IN (SELECT card_id FROM deck_cards WHERE deck_id = $1)",
      [deckId]
    );

    console.log("Deleting deck from decks table...");
    await pool.query("DELETE FROM decks WHERE deck_id = $1", [deckId]);

    await pool.query("COMMIT");
    console.log("Deck and associated cards deleted successfully");

    res.sendStatus(204);
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error deleting deck:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

///////////// DECKS BACKEND

app.listen(5432, () => {
  console.log("Server has started on port 5174");
});

//////////// SPACED REPETITION ALGORITHM
// Calculate the next repetition interval based on the user's rating
async function calculateInterval(
  easinessFactor,
  repetitions,
  lastInterval,
  rating
) {
  try {
    let interval;
    if (rating >= 3) {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(lastInterval * easinessFactor);
      }
    } else {
      repetitions = 0;
      interval = 1;
    }
    return interval;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

// Update the easiness factor based on the user's rating
function updateEasinessFactor(easinessFactor, rating) {
  const newEasinessFactor =
    easinessFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
  return Math.max(1.3, newEasinessFactor);
}

// Update the card statistics after a review
async function updateCardStats(cardId, rating) {
  try {
    const cardStats = await pool.query(
      "SELECT * FROM card_stats WHERE card_id = $1",
      [cardId]
    );
    const easinessFactor = cardStats.rows[0].easiness_factor;
    const repetitions = cardStats.rows[0].repetitions;
    const lastInterval = cardStats.rows[0].last_interval;

    const newEasinessFactor = updateEasinessFactor(easinessFactor, rating);
    const newInterval = await calculateInterval(
      newEasinessFactor,
      repetitions,
      lastInterval,
      rating
    );
    const newRepetitions = rating >= 4 ? repetitions + 1 : 0;
    const newDueDate = new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000);

    await pool.query(
      "UPDATE card_stats SET easiness_factor = $1, repetitions = $2, last_interval = $3, due_date = $4 WHERE card_id = $5",
      [newEasinessFactor, newRepetitions, newInterval, newDueDate, cardId]
    );
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}
// SPACED REPETITION ALGORITHM

// USING ALGORITHM
// Connect the database to the algorithm for studying flashcards
app.get("/decks/:deckId/study", async (req, res) => {
  try {
    const { deckId } = req.params;

    // Get the cards from the specified deck that are due for review
    const dueCards = await pool.query(
      `SELECT c.*, cs.*
       FROM cards c
       JOIN card_stats cs ON c.card_id = cs.card_id
       JOIN deck_cards dc ON c.card_id = dc.card_id
       WHERE dc.deck_id = $1 AND cs.due_date <= NOW()
       ORDER BY cs.due_date`,
      [deckId]
    );

    if (dueCards.rows.length === 0) {
      return res.status(404).json({ message: "No cards due for review" });
    }

    // Select the card with the earliest due date
    const selectedCard = dueCards.rows.sort(
      (a, b) => a.due_date - b.due_date
    )[0];

    res.json(selectedCard);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/cards/:cardId/review", async (req, res) => {
  try {
    const { cardId } = req.params;
    const { rating } = req.body;

    await updateCardStats(cardId, rating);

    res.json({ message: "Card statistics updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// USING ALGORITHM

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
