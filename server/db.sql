CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
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

CREATE TABLE card_stats (
  card_id INT PRIMARY KEY,
  deck_id INT NOT NULL,
  easiness_factor FLOAT NOT NULL DEFAULT 2.5,
  repetitions INT NOT NULL DEFAULT 0,
  last_interval INT NOT NULL DEFAULT 0,
  due_date TIMESTAMP NOT NULL DEFAULT NOW(),
  last_studied_at TIMESTAMP,
  FOREIGN KEY (card_id) REFERENCES cards (card_id),
  FOREIGN KEY (deck_id) REFERENCES decks (deck_id)
);
