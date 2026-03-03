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
    constructor() { }
    drawInitial() {
        this.draw(0);
    }
    draw(index) {
        console.log(HANGMAN_PICS[index]);
    }
}
//# sourceMappingURL=hangman-drawing.js.map