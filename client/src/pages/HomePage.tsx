import React, { useEffect, useState } from "react";
import Deck from "../components/Home/deck";
import WeekStreak from "../components/Home/WeekStreak";
import Greetings from "../components/Home/Greetings";
import NewDeck from "../components/Home/NewDeck";
import api from "../api";
import supabase from '../../utils/supabase';

interface Deck {
  deck_id: number;
  deck_name: string;
  user_id: number;
}

interface User {
  id: number;
  username: string;
  full_name: string;
}

const HomePage: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const fetchDecks = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.get(`/decks/${userId}`);
      console.log("Fetched decks:", response.data);
      setDecks(response.data);
    } catch (error) {
      console.error("Error fetching decks:", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUser({ id: 0, username: "", full_name: user.user_metadata.full_name });
      } else {
        console.error("User ID not found in localStorage");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchDecks();
    fetchUserInfo();
  }, []);

  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col mt-[8%]">
        <div className="mb-[15%] flex justify-center">
          {user && <Greetings fullName={user.full_name} />}
        </div>
        <div className="flex flex-col items-end">
          <NewDeck onDeckCreated={fetchDecks} />
          {decks.map((deck) => (
            <Deck
              key={deck.deck_id}
              name={deck.deck_name}
              deckId={deck.deck_id}
              newLabel="5"
              learningLabel="2"
              reviewLabel="9"
            />
          ))}
        </div>
        <div className="mt-[30%] flex justify-center items-center">
          <WeekStreak />
        </div>
        <span className="text-center text-textBase mt-[4%]">
          12 Cards Studied Today
        </span>
      </div>
    </div>
  );
};

export default HomePage;
