import { HANGMAN_INDEX } from "types";

const HANGMAN_PICS = [
  `
+---+
|   |  
|      
|      
|      
|      
=========`,
  `
+---+
|   |  
|   O  
|      
|      
|      
=========`,
  `
+---+
|   |  
|   O  
|   |  
|      
|      
=========`,
  `
+---+
|   |  
|   O  
|   |\\ 
|      
|      
=========`,
  `
+---+
|   |  
|   O  
|  /|\\ 
|      
|      
=========`,
  `
+---+
|   |  
|   O  
|  /|\\ 
|    \\ 
|      
=========`,
  `
+---+
|   |  
|   O  
|  /|\\ 
|  / \\ 
|      
=========`,
];

export default class HangmanDrawing {
  constructor() {}

  public drawInitial() {
    this.draw(0);
  }

  public draw(index: HANGMAN_INDEX) {
    console.log(HANGMAN_PICS[index]);
  }
}
