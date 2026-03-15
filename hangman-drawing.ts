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

export function getDrawingString(index: HANGMAN_INDEX) {
  return HANGMAN_PICS[index];
}
