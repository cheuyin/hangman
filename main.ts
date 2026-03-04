import promptSync from "prompt-sync";
import HangmanDrawing from "./hangman-drawing.js";
import WordManager from "./word-manager.js";

const prompt = promptSync();

function runGame() {
  // Introductory Message
  console.log("Let's Play Hangman!");

  const hangmanDrawing = new HangmanDrawing();
  const wordManager = new WordManager();
  const currentHangmanStep = 0;

  const gameRunning = true;

  // LOOP:
  while (gameRunning) {
    // Draw game states
    hangmanDrawing.draw(currentHangmanStep);
    console.log("Wrong Guesses: ", wordManager.getWrongGuesses());
    console.log("Correct Guesses: ", wordManager.getCorrectGuesses());

    // Get guess
    const guess = getGuess();
    // Update guesses
    wordManager.processGuess(guess);
    // Check if game is over
    // Repeat
  }
}

runGame();

// Gets console input from user
// Only accepts alphabetical characters
// Returns the lower case of that character
function getGuess(): string {
  while (true) {
    const name = prompt("Enter your guess: ");
    const lettersOnly = /^[a-zA-Z]+$/;
    if (name.length !== 1) {
      console.log("Your guess should be one letter. Please try again.");
    } else if (!lettersOnly.test(name)) {
      console.log("Your guess should be a letter in the alphabet");
    } else {
      return name.toLowerCase();
    }
  }
}
