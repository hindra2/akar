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