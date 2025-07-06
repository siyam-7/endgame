import { useState } from "react";
import clsx from "clsx";
import "./App.css";
import Language from "./Language";
import { languages } from "./languages";
import { getFarewellText } from "./utils";
import { getWord } from "./utils";
export default function App() {
  const [currentWord, setCurrentWord] = useState(()=>getWord());
  const [guessedLetter, setGuessedLetter] = useState([]);
  const [clickedLetter, setClickedLetter] = useState("");

  const attemptsLeft = languages.length - 1;
  const letters = currentWord.toUpperCase().split("");
  const wrongGuessCount = guessedLetter.filter(
    (letter) => !letters.includes(letter)
  ).length;
  const isGameWon = letters.every((letter) => guessedLetter.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  const word = letters.map((letter) => (
    <span>{guessedLetter.includes(letter) ? letter : "\u00A0"}</span>
  ));
  const langlist = languages.map((language, index) => (
    <Language
      key={index}
      name={language.name}
      color={language.color}
      backgroundColor={language.backgroundColor}
      lost={wrongGuessCount > index}
    />
  ));
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const keyboard = alphabet.map((key) => (
    <button
      onClick={isGameOver ? null : () => handleKey(key)}
      disabled={isGameOver}
      aria-disabled={guessedLetter.includes(key)}
      aria-label={`Letter ${key}`}
      className={clsx("key", {
        clicked: guessedLetter.includes(key),
        correct: letters.includes(key),
        wrong: !letters.includes(key),
        disabled: isGameOver,
      })}
    >
      {key}
    </button>
  ));

  function handleKey(key) {
    setClickedLetter(key);
    setGuessedLetter((prevLetter) =>
      prevLetter.includes(key) ? prevLetter : [...prevLetter, key]
    );
  }
  function renderStatus() {
    if (!isGameOver && letters.includes(clickedLetter)) {
      return null;
    }
    if (!isGameOver && wrongGuessCount > 0) {
      return `${getFarewellText(languages[wrongGuessCount - 1].name)}🫡`;
    }
    if (!isGameOver) {
      return null;
    }
    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    } else {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
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
      <section
        aria-live="polite"
        role="status"
        className={clsx("status", {
          farewell:
            !isGameOver &&
            guessedLetter.length > 0 &&
            !letters.includes(clickedLetter),
          won: isGameWon,
          lost: isGameLost,
        })}
      >
        {renderStatus()}
      </section>
      <section className="languages">{langlist}</section>
      <section className="word">{word}</section>
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(clickedLetter)
            ? `Correct! The letter ${clickedLetter} is in the word.`
            : `Sorry, the letter ${clickedLetter} is not in the word.`}
          You have {attemptsLeft} attempts left.
        </p>
        <p>
          Current word:
          {currentWord
            .split("")
            .map((letter) =>
              guessedLetter.includes(letter) ? letter + "." : "blank."
            )
            .join(" ")}
        </p>
      </section>
      <section className="keyboard">{keyboard}</section>
      {isGameOver ? <button className="newgamebtn">New Game</button> : null}
    </main>
  );
}
