import { useState } from "react";
import clsx from "clsx";
import "./App.css";
import Language from "./Language";
import { languages } from "./languages";
export default function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetter, setGuessedLetter] = useState([]);
  const letters = currentWord.toUpperCase().split("");
  const wrongGuessCount = guessedLetter.filter(letter=>!letters.includes(letter)).length;
  const isGameOver = wrongGuessCount>=8;

  const word = letters.map((letter) => (
    <span>{guessedLetter.includes(letter) ? letter : "\u00A0"}</span>
  ));
  const langlist = languages.map((language,index) => (
    
    <Language
      key={index}
      name={language.name}
      color={language.color}
      backgroundColor={language.backgroundColor}
      lost={wrongGuessCount>index}
    />
  ));
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const keyboard = alphabet.map((key) => (
    <button
      onClick={() => handleKey(key)}
      className={clsx("key", {
        clicked: guessedLetter.includes(key),
        correct: letters.includes(key),
        wrong: !letters.includes(key),
      })}
    >
      {key}
    </button>
  ));

  function handleKey(key) {
    setGuessedLetter((prevLetter) =>
      prevLetter.includes(key) ? prevLetter : [...prevLetter, key]
    );
  }
  return (
    <main>
      <header>
        <h2>Assembly: Endgame</h2>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className="status">
        <h2>You Win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="languages">{langlist}</section>
      <section className="word">{word}</section>
      <section className="keyboard">{keyboard}</section>
      {isGameOver? <button className="newgamebtn">New Game</button>:null}
    </main>
  );
}
