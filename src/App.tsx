import { useEffect, useState } from "react";
import words from "./wordList.json";
import { HangmanDrawing } from "./Components/HangmanDrawing";
import { HangmanWord } from "./Components/HangmanWord";
import { Keybaord } from "./Components/Keyboard";

function App() {
  const [wordToGuess, setWordtoGuess] = useState(() => {
    const tempWord = words[Math.floor(Math.random() * words.length)];
    // console.log(tempWord);
    return tempWord;
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const inCorrectLetters = guessedLetters.filter(
    //Gets all letters that were guessed and NOT part of the word.
    //Takes all guessed letters (guessedLetters), filters out letters from it which are part of the "word" (wordToGuess),
    // you end up with all the letters which were incorrectly guessed.
    (letter) => !wordToGuess.includes(letter)
  );

  // useEffect;

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

      <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />

      <div style={{ alignSelf: "stretch" }}>
        <Keybaord />
      </div>
    </div>
  );
}

export default App;
