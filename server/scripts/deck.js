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