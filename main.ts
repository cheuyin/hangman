import promptSync from "prompt-sync";
import { getDrawingString } from "./hangman-drawing";
import WordManager from "./word-manager";
import { HANGMAN_STEP } from "./types";
import { readFileSync } from "fs";
import { exit } from "process";

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

  const wordManager = new WordManager(content);
  let currentHangmanStep: HANGMAN_STEP = HANGMAN_STEP.EMPTY;

  let gameRunning = true;

  // LOOP:
  while (gameRunning) {
    // Draw game states
    const currentDrawing = getDrawingString(currentHangmanStep);
    console.log(currentDrawing);
    printWrongGuesses(wordManager.getWrongGuesses());
    printCorrectGuesses(wordManager.getCorrectGuesses());

    // Get guess
    const guess = getGuess(wordManager);

    if (guess === null) {
      gameRunning = false;
      break;
    }

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
        if (currentHangmanStep === HANGMAN_STEP.LEFT_LEG) {
          gameRunning = false;
          const finalDrawing = getDrawingString(HANGMAN_STEP.RIGHT_LEG);
          console.log(finalDrawing);
          console.log(`You lost.`);
          printWrongGuesses(wordManager.getWrongGuesses());
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

function printWrongGuesses(wrongGuesses: string[]): void {
  const formattedString = wrongGuesses.join("  ");
  console.log("Wrong Guesses: " + formattedString);
}

function printCorrectGuesses(correctGuesses: string[]): void {
  const formattedString = correctGuesses.join("  ");
  console.log("Correct Guesses: " + formattedString);
}

// Gets console input from user; keeps asking until it gets valid input
// Only accepts alphabetical characters
// Makes sure that letter hasn't been guessed already
// Returns the lower case of that character
function getGuess(wordManager: WordManager): string | null {
  while (true) {
    const guess = prompt("Guess a letter: ");

    if (guess === null) {
      return null;
    }

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
