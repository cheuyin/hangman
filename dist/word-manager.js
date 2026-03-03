import { readFileSync } from "fs";
export default class WordManager {
    constructor() {
        this.secretWord = this.chooseRandomWord().split("");
        this.wrongGuesses = [];
        this.correctGuesses = Array(this.secretWord.length).fill("");
    }
    chooseRandomWord() {
        let content;
        try {
            content = readFileSync("./word-list.txt", "utf-8");
            content = content.split("\n");
        }
        catch (err) {
            console.error(err);
            throw err;
        }
        const numWords = content.length;
        const randomIndex = Math.floor(Math.random() * numWords);
        const randomWord = content[randomIndex];
        return randomWord;
    }
    getSecretWord() {
        return this.secretWord;
    }
    getCorrectGuesses() {
        return this.correctGuesses;
    }
    getWrongGuesses() {
        return this.wrongGuesses;
    }
}
//# sourceMappingURL=word-manager.js.map