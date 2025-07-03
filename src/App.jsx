import { useState } from "react";
import "./App.css";
import Language from "./Language";
import { languages } from "./languages";
export default function App() {
  const [currentWord,setCurrentWord] = useState("react");
  const letters = currentWord.split("");
  const word = letters.map(letter => <span>{letter.toUpperCase()}</span>)
  const langlist = languages.map(language => <Language name={language.name} color={language.color} backgroundColor={language.backgroundColor} /> )
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const keyboard = alphabet.map(key => <button>{key}</button>)
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
      <section className="languages">
       {langlist}
      </section>
      <section className="word">
        {word}
      </section>
      <section className="keyboard">
        {keyboard}
      </section>
    </main>
  );
}
