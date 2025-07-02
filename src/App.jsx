import "./App.css";
import Language from "./Language";
import { languages } from "./languages";
export default function App() {
  const langlist = languages.map(language => <Language name={language.name} color={language.color} backgroundColor={language.backgroundColor} /> )
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
    </main>
  );
}
