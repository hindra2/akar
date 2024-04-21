CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE cards (
  card_id SERIAL PRIMARY KEY,
  card_question TEXT NOT NULL,
  card_answer TEXT NOT NULL
);

CREATE TABLE decks (
  deck_id SERIAL PRIMARY KEY,
  deck_name VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE deck_cards (
  deck_id INT NOT NULL,
  card_id INT NOT NULL,
  PRIMARY KEY (deck_id, card_id),
  FOREIGN KEY (deck_id) REFERENCES decks (deck_id),
  FOREIGN KEY (card_id) REFERENCES cards (card_id)
);
