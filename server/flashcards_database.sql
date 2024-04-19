CREATE DATABASE akar;

CREATE TABLE cards(
    card_id SERIAL PRIMARY KEY,
    card_answer TEXT,
    card_question TEXT
);
