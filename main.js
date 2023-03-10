// Create an array of letters
const vowels = "AEIOU".repeat(4)
const usefulConsonants = "GMNRST".repeat(3)
const ordinaryConsonants = "BCDFHLPVWY".repeat(2)
const devilishConsonants = "JKQXZ"
const letters = vowels.concat(usefulConsonants).concat(ordinaryConsonants).concat(devilishConsonants).split("");

const MINUTES = 3;
const MAX_TIME = MINUTES * 60 * 1000;

let highScore = 0; // global variable to store the high score

// Initialize the word variable
let word = "";

function populateGrid() {
  const grid = document.getElementById("grid");

  // Create 10 rows
  for (let i = 0; i < 10; i++) {
    const row = grid.insertRow();

    // Create 10 cells
    for (let j = 0; j < 10; j++) {
      const cell = row.insertCell();

      // Select a random letter from the letters array and assign it to the cell
      cell.textContent = letters[Math.floor(Math.random() * letters.length)];
    }
  }
}
populateGrid()

function startTimer() {
  const timer = document.getElementById("timer");

  // Set the starting time in milliseconds
  const startTime = MAX_TIME;

  let time = startTime;
  disableNewGameButton();
  // Update the timer every 1000 milliseconds (1 second)
  const interval = setInterval(() => {
    // Calculate the minutes and seconds remaining
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);

    // Display the time in the format "MM:SS"
    timer.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    // Decrement the time by 1000 milliseconds (1 second)
    time -= 1000;

    // If the time reaches 0, stop the timer and disable the table
    if (time <= 0) {
      clearInterval(interval);
      disableTable();
      enableNewGameButton();
      updateHighScoreMaybe();
    }
  }, 1000);
}
startTimer()

function addInteractivity() {
  // Get a reference to the table element
  let table = document.getElementById("grid");

  table.addEventListener("mousedown", mouseDownHandler);
  document.addEventListener("mouseup", mouseUpHandler);
  table.addEventListener("touchstart", mouseDownHandler);
  document.addEventListener("touchend", mouseUpHandler);
}
addInteractivity()

function mouseDownHandler(event) {
  // Get the target element that was clicked/touched
  let target = event.target;

  // If the target is a table cell
  if (target.tagName === "TD") {
    // Add the "selected" class to the cell
    target.classList.add("selected");

    // Update the word variable with the letter in the cell
    word += target.textContent;

    // Get a reference to the table element
    let table = document.getElementById("grid");

    table.addEventListener("mouseover", mouseoverHandler);
    table.addEventListener("touchmove", mouseoverHandler);
  }
}

// Mouseover event handler function
function mouseoverHandler(event) {
  // Get the target element that the mouse is over
  let target = event.target;

  // If the target is a table cell
  if (target.tagName === "TD") {
    // Add the "selected" class to the cell
    target.classList.add("selected");

    // Update the word variable with the letter in the cell
    word += target.textContent;
  }
}

function mouseUpHandler(event) {
  // Get a reference to the table element
  let table = document.getElementById("grid");

  // Remove the mouseover event listener from the table
  table.removeEventListener("mouseover", mouseoverHandler);
  // Remove the touchmove event listener from the table
  table.removeEventListener("touchmove", mouseoverHandler);

  // Get the selected cells
  let cells = Array.from(document.getElementsByClassName("selected"));

  // Check if the word is valid
  isWordValid(word).then(isValid => {
    // If the word is valid, highlight the cells in blue
    // Otherwise, highlight the cells in red
    if (word.length > 3) {
      for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("selected");
        cells[i].classList.add(isValid ? "valid" : "invalid");
      }
      if (isValid) {
        updateScore(cells.length);
        playWordSound();
      }
    } else {
      // If the word is less than 3 letters long, just remove the "selected" class from the cells
      for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("selected");
      }
    }

    // After 1 second, remove the "valid" or "invalid" class from all cells
    // and reset the word variable and word display
    setTimeout(() => {
      // Remove the text content of the cells
      for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains("valid")) {
          cells[i].textContent = "";
        }
        cells[i].classList.remove(isValid ? "valid" : "invalid");
      }
      descendColumns()
      word = "";
    }, 1000);
  })
}

async function isWordValid(word) {
  // Make a GET request to the Datamuse API to check if the word is valid
  // limit to returning 1 word because just want to check if given word is valid
  // and include the frequency score to be used later for scoring
  const response = await fetch(`https://api.datamuse.com/words?sp=${word}&max=1&md=f`);

  // Convert the response to JSON
  const data = await response.json();

  // If the array has at least one item and the first item's word property matches the word passed to the function, the word is valid
  return Array.isArray(data) && data.length > 0 && data[0].word.toLowerCase() === word.toLowerCase();
}

// Get a reference to the score display element
const scoreDisplay = document.getElementById("score-display");

// Get a reference to the score element
const scoreElement = document.getElementById("score");

// Function to update the score
function updateScore(points) {
  // Increment the current score by the number of points
  let score = parseInt(scoreElement.textContent) + points;

  // Update the score element with the new score
  scoreElement.textContent = score;
}

async function descendColumns() {
  // Get a reference to the table element
  let table = document.getElementById("grid");
  // Get the rows of the table
  let rows = table.getElementsByTagName("tr");

  // Loop through the rows from the bottom to the top
  for (let i = rows.length - 1; i >= 0; i--) {
    // Get the cells in the current row
    let cells = rows[i].getElementsByTagName("td");

    // Loop through the cells in the current row
    for (let j = 0; j < cells.length; j++) {
      // If the cell is empty
      if (!cells[j].textContent) {
        // Find the first cell in the column above the current cell that has text content
        let above = cells[j].parentElement.previousElementSibling;
        while (above && !above.cells[j].textContent) {
          above = above.previousElementSibling;
        }

        // If a cell was found
        if (above) {
          // Copy the text content of the found cell into the current cell
          cells[j].textContent = above.cells[j].textContent;

          // Remove the text content of the found cell
          above.cells[j].textContent = "";
        } else {
          // Generate a new letter for the current cell
          cells[j].textContent = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }
    // Add a delay of 500 milliseconds (half a second) before continuing the loop
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

// Add a class to the table element when the timer is up
function disableTable() {
  let table = document.getElementById("grid");
  table.classList.add("disabled");
}

function setupNewGameButton() {
  let table = document.getElementById("grid");
  const newGameButton = document.getElementById("newGameButton");
  newGameButton.addEventListener("click", function() {
    // Remove the "disabled" class from the table
    table.classList.remove("disabled");

    // Set the current score to 0
    const currentScore = 0;
    scoreElement.textContent = currentScore;

    startTimer();
  });
}
setupNewGameButton();

function enableNewGameButton() {
  const newGameButton = document.getElementById("newGameButton");
  newGameButton.disabled = false
}

function disableNewGameButton() {
  const newGameButton = document.getElementById("newGameButton");
  newGameButton.disabled = true
}

function updateHighScoreMaybe() {
  // Get references to the score and high score elements
  let scoreElement = document.getElementById("score");
  let highScoreElement = document.getElementById("highscore");

  // Get the current score and high score as integers
  let currentScore = parseInt(scoreElement.textContent, 10);
  let highScore = parseInt(highScoreElement.textContent, 10);

  // If the current score is higher than the high score
  if (currentScore > highScore) {
    // Update the high score
    highScoreElement.textContent = currentScore;
    playHighScoreSound();
  }
}

function playWordSound() {
  // Get a reference to the audio element
  let audio = document.getElementById("word-sound");
  console.log(audio)
  // const audioElement = new Audio("/sounds/word.wav");
  audio.play();
}

function playHighScoreSound() {
  // Get a reference to the audio element
  let audio = document.getElementById("highscore-sound");
  audio.play();
}