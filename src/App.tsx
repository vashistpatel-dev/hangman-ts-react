import { useState } from "react";
import words from "./wordList.json";
import { HangmanDrawing } from "./Components/HangmanDrawing";
import { HangmanWord } from "./Components/HangmanWord";
import { Keybaord } from "./Components/Keyboard";

function App() {
  const [wordToGuess, setWordtoGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const inCorrectLetters = guessedLetters.filter(
    //Gets all letter that were guessed and NOT part of the word
    (letter) => !wordToGuess.includes(letter)
  );

  return (
    <div // Main <div>
      style={{
        maxWidth: "800",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>Lose Win</div>

      <HangmanDrawing />
      <HangmanWord />

      <div style={{ alignSelf: "stretch" }}>
        <Keybaord />
      </div>
    </div>
  );
}

export default App;
