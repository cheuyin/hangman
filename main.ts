import promptSync from "prompt-sync";
import HangmanDrawing from "./hangman-drawing.js";
import WordManager from "./word-manager.js";
import { HANGMAN_INDEX } from "types.js";
import { readFileSync } from "fs";

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

  // Load word list
  let content;
  try {
    content = readFileSync("./word-list.txt", "utf-8");
    content = content.split("\n");
  } catch (err) {
    console.error(err);
    throw err;
  }

  const hangmanDrawing = new HangmanDrawing();
  const wordManager = new WordManager(content);
  let currentHangmanStep: HANGMAN_INDEX = 0;

  let gameRunning = true;

  // LOOP:
  while (gameRunning) {
    // Draw game states
    hangmanDrawing.draw(currentHangmanStep as HANGMAN_INDEX);
    wordManager.printWrongGuesses();
    wordManager.printCorrectGuesses();

    // Get guess
    const guess = getGuess(wordManager);

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

  console.log(
    `
 ██████   █████  ███    ███ ███████      ██████  ██    ██ ███████ ██████  
██       ██   ██ ████  ████ ██          ██    ██ ██    ██ ██      ██   ██ 
██   ███ ███████ ██ ████ ██ █████       ██    ██ ██    ██ █████   ██████  
██    ██ ██   ██ ██  ██  ██ ██          ██    ██  ██  ██  ██      ██   ██ 
 ██████  ██   ██ ██      ██ ███████      ██████    ████   ███████ ██   ██ 
    `,
  );
}
runGame();

// Gets console input from user; keeps asking until it gets valid input
// Only accepts alphabetical characters
// Makes sure that letter hasn't been guessed already
// Returns the lower case of that character
function getGuess(wordManager: WordManager): string {
  while (true) {
    const guess = prompt("Guess a letter: ");
    const lettersOnly = /^[a-zA-Z]+$/;
    if (guess.length !== 1) {
      console.log("Your guess should be one letter. Please try again.");
    } else if (!lettersOnly.test(guess)) {
      console.log(
        "Your guess should be a letter in the alphabet. Please try again.",
      );
    } else if (wordManager.getWrongGuesses().includes(guess.toLowerCase())) {
      console.log(
        `You already guessed '${guess.toLowerCase()}'. Please try again.`,
      );
    } else if (wordManager.getCorrectGuesses().includes(guess.toLowerCase())) {
      console.log(
        `You already guessed '${guess.toLowerCase()}'. Please try again.`,
      );
    } else {
      return guess.toLowerCase();
    }
  }
}
