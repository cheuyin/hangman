export default class WordManager {
  private words: string[];
  private secretWord: string[]; // Array of characters in the word, all lowercase
  private wrongGuesses: string[];
  private correctGuesses: string[];

  constructor(words: string[]) {
    this.words = words;
    this.secretWord = this.chooseRandomWord().split("");
    this.wrongGuesses = [];
    this.correctGuesses = Array(this.secretWord.length).fill("_");
  }

  public chooseRandomWord(): string {
    // Get total number of words
    const numWords = this.words.length;

    // Pick random number
    const randomIndex = Math.floor(Math.random() * numWords);

    // Choose that word
    const randomWord = this.words[randomIndex]?.toLowerCase() as string;

    return randomWord;
  }

  // Takes a guessed letter from the user
  // Updates the game state based on this guess
  // Returns true if guess was correct; false otherwise
  public processGuess(guess: string): boolean {
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
      return true;
    } else {
      this.wrongGuesses.push(guess);
      return false;
    }
  }

  // Returns true if all characters of secret word has been successfully guessed
  // False otherwise
  public checkAllLettersGuessed(): boolean {
    return !this.correctGuesses.includes("_");
  }

  public getSecretWord(): string {
    return this.secretWord.join("");
  }

  public getCorrectGuesses(): string[] {
    return this.correctGuesses;
  }

  public getWrongGuesses(): string[] {
    return this.wrongGuesses;
  }
}
