import promptSync from "prompt-sync";
import HangmanDrawing from "./hangman-drawing.js";
import WordManager from "./word-manager.js";
import { HANGMAN_INDEX } from "types.js";

const prompt = promptSync();

function runGame() {
  // Introductory Message
  console.log(
    `
    ██   ██  █████  ███    ██  ██████  ███    ███  █████  ███    ██
    ██   ██ ██   ██ ████   ██ ██       ████  ████ ██   ██ ████   ██
    ███████ ███████ ██ ██  ██ ██   ███ ██ ████ ██ ███████ ██ ██  ██
    ██   ██ ██   ██ ██  ██ ██ ██    ██ ██  ██  ██ ██   ██ ██  ██ ██
    ██   ██ ██   ██ ██   ████  ██████  ██      ██ ██   ██ ██   ████
    `,
  );

  const hangmanDrawing = new HangmanDrawing();
  const wordManager = new WordManager();
  let currentHangmanStep: HANGMAN_INDEX = 0;

  let gameRunning = true;

  // LOOP:
  while (gameRunning) {
    // Draw game states
    hangmanDrawing.draw(currentHangmanStep as HANGMAN_INDEX);
    wordManager.printWrongGuesses();
    wordManager.printCorrectGuessses();

    // Get guess
    const guess = getGuess();

    // Update guesses
    const isGuessCorrect: boolean = wordManager.processGuess(guess);

    // Check if game is over
    if (wordManager.checkAllLettersGuessed()) {
      // Game is won
      gameRunning = false;
      console.log(
        `Nice! You correctly guessed ${wordManager.getSecretWord()}.`,
      );
    } else {
      if (!isGuessCorrect) {
        if (currentHangmanStep === 5) {
          gameRunning = false;
          hangmanDrawing.draw(6);
          console.log(`You lost.`);
          wordManager.printWrongGuesses();
          console.log(`The secret word was ${wordManager.getSecretWord()}.`);
        }

        currentHangmanStep++;
      }
    }
  }

  console.log("The game is over.");
}
runGame();

// Gets console input from user; keeps asking until it gets valid input
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
