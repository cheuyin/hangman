import { readFileSync } from "fs";

export default class WordManager {
  private secretWord: string[]; // Array of characters in the word, all lowercase
  private wrongGuesses: string[];
  private correctGuesses: string[];

  constructor() {
    this.secretWord = this.chooseRandomWord().split("");
    this.wrongGuesses = [];
    this.correctGuesses = Array(this.secretWord.length).fill("_");
  }

  public chooseRandomWord(): string {
    // Load word-list.txt
    let content;
    try {
      content = readFileSync("./word-list.txt", "utf-8");
      content = content.split("\n");
    } catch (err) {
      console.error(err);
      throw err;
    }

    // Get total number of words
    const numWords = content.length;

    // Pick random number
    const randomIndex = Math.floor(Math.random() * numWords);

    // Choose that word
    const randomWord = content[randomIndex]?.toLowerCase() as string;

    return randomWord;
  }

  // Takes a guessed letter from the user
  // Updates the game state based on this guess
  // Returns the array of correct guesses
  public processGuess(guess: string) {
    const formattedGuess = guess.toLocaleLowerCase();
    if (this.secretWord.includes(formattedGuess)) {
      // Update correctGuesses
      const indexes = [];
      let i = -1;
      while ((i = this.secretWord.indexOf(formattedGuess, i + 1)) !== -1) {
        indexes.push(i);
      }
      for (let idx of indexes) {
        this.correctGuesses[idx] = guess;
      }
    } else {
      this.wrongGuesses.push(guess);
    }
  }

  // Returns true if all characters of secret word has been successfully guessed
  // False otherwise
  public checkAllLettersGuessed(): boolean {
    return !this.correctGuesses.includes("_");
  }

  public getSecretWord(): string[] {
    return this.secretWord;
  }

  public getCorrectGuesses(): string[] {
    return this.correctGuesses;
  }

  public getWrongGuesses(): string[] {
    return this.wrongGuesses;
  }

  public printWrongGuesses(): void {
    const formattedString = this.wrongGuesses.join("  ");
    console.log("Wrong Guesses: " + formattedString);
  }

  public printCorrectGuessses(): void {
    const formattedString = this.correctGuesses.join("  ");
    console.log("Correct Guesses: " + formattedString);
  }
}
