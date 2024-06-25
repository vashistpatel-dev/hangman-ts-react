export function HangmanWord() {
  const word = "test";
  const guessedLetters = ["t", "g", "e"];

  return (
    // Sets the word font
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {/* Iterates over each letter in the word */}
      {word.split("").map((letter, index) => (
        // Underlines and set key for each letter
        <span style={{ borderBottom: ".1em solid black" }} key={index}>
          {/* Sets each letter to be visible or hidden */}
          <span
            style={{
              visibility: guessedLetters.includes(letter)
                ? "visible"
                : "hidden",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
