import { HANGMAN_STEP } from "./types";

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

export function getDrawingString(step: HANGMAN_STEP) {
  return HANGMAN_PICS[step];
}
