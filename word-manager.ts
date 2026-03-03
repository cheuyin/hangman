import { readFileSync } from "fs";

export default class WordManager {
  private secretWord: string[]; // Array of characters in the word
  private wrongGuesses: string[];
  private correctGuesses: string[];

  constructor() {
    this.secretWord = this.chooseRandomWord().split("");
    this.wrongGuesses = [];
    this.correctGuesses = Array(this.secretWord.length).fill("");
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
    const randomWord = content[randomIndex] as string;

    return randomWord;
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
}
