import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import { HangmanDrawing } from "./Components/HangmanDrawing";
import { HangmanWord } from "./Components/HangmanWord";
import { Keybaord } from "./Components/Keyboard";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordtoGuess] = useState(() => {
    // const tempWord = words[Math.floor(Math.random() * words.length)];
    const tempWord = getWord();
    console.log(tempWord);
    return tempWord;
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const inCorrectLetters = guessedLetters.filter(
    //Gets all letters that were guessed and NOT part of the word.
    //Takes all guessed letters (guessedLetters), filters out letters from it which are part of the "word" (wordToGuess),
    // you end up with all the letters which were incorrectly guessed.
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = inCorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  // Refresh by pressing ENTER and get a new word, and setGuessedLetters to empty
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== "Enter") return;
      e.preventDefault();
      setGuessedLetters([]);
      setWordtoGuess(getWord());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

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
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice Try! - Refresh to try again"}
      </div>

      <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />

      <div style={{ alignSelf: "stretch" }}>
        <Keybaord
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={inCorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
