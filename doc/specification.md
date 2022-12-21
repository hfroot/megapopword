Megapopword – coding instructions

## Introductory prompt 
a.	Can you write code in javascript, HTML and CSS to make an online word game if I give you the following 9 instructions?

## 1.	Make the Grid
a.	Make a 10 by 10 grid occupying one third of the screen in the centre.  Each square has color: dark green and letter color: white.  All letters are chosen at random with two exceptions. The six letters { a, e, i, o, u, y} are 4 times more likely than average to be chosen, and the six letters {s,t,n,r,g,m}  are twice more likely than average to be chosen.

## 2.	User name box.
a.	At the bottom of the square, in the middle and separated by the width of two rows is a text box 10 letters wide, the same as the grid, outlined in black, pink background and blue lettering.  Centred below this box, is the title “User Name”. The user can type his name in this text box.

## 3.	Current score and best score.
a.	Place two more text boxes, half-way between the right of the grid and the edge of the screen and half-way between the top and bottom of the screen, each eight squares wide, outlined in black, white background, red lettering, one above the other, separated by a height the same as a row on the grid.  Above the upper box is the title “Current score”.  This shows the cumulative score as the user highlights words that match.  Below the lower box is the title “Best score” which shows the highest score achieved at the end of all previous games.

## 4.	Game title and timer.
a.	Above the grid is the title “MegaPopWord” written in black letters twice the size of the letters on the grid.  Between this title and the grid is a digital count down timer with black background and orange numbers. 

## 5.	Play new game and reset buttons
a.	Place two 3d buttons in red with light green lettering one above the other half way between the left edge of the grid and the edge of the screen at the same level as the current score and best score boxes.  The top button contains the words “Play new game?” When clicked, this resets the grid to green, the current score to zero, and the timer to three minutes, but not the user name or the best score. The bottom button contains the words “Reset everything”.  When clicked, this resets the grid to green, the current score to zero, the timer to three minutes, clears the user name and the best score. 

## 6.	Making it interactive. Highlight a word
a.	When the user clicks on a letter it is highlighted in light green.  He can hold and drag the mouse to also highlight any adjacent letter, including diagonally. When the mouse is released the highlighted selection of letters stays on screen for one second.

## 7.	Score the highlighted word.
a.	While the word is highlighted, it is compared to an English dictionary library.  If it matches a library word, the user gets a score: 10 for a 4 letter word, 20 for a 5 letter word, 50 for a 6 letter word, 100 for a 7 letter word, 250 for an 8 letter word, 500 for a 9 letter word, 1000 for a 10 letter word, 2500 for an 11 letter word, 5000 for a 12 or more letter word.  When the word is matched, it is highlighted in blue for one second,  a tinkling bell rings the same number of times as the numbers of letters in the word, and the word score is added to the current score.  If the word does not match, the word is highlighted in red for one second and the sound of a frog is made.

## 8.	Columns of letters drop down to replace the highlighted word and new letters appear at the top.  
a.	After the word is matched, the letters of the word disappear leaving empty squares.  The column of letters above that square drop down to replace these empty squares with new letters, while new random letters appear at the top of the column.  The grid will therefore always show 100 randomly chosen letters.

## 9.	End of game.
a.	The timer starts counting down the moment the user makes his first click and stops at zero.  At which point the game stops, the grid square color changes to grey, the user is no longer able to click on letters, the final current score is displayed, and if the final current score is greater than the best score, the best score is replaced with the current final score.




