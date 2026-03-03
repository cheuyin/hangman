import HangmanDrawing from "./hangman-drawing.js";
import WordManager from "./word-manager.js";

const hangmanDrawing = new HangmanDrawing();
hangmanDrawing.drawInitial();

new WordManager();
