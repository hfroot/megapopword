function populateGrid() {
  const grid = document.getElementById("grid");

  // Create an array of letters
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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

function setupTimer() {
  const timer = document.getElementById("timer");

  // Set the starting time in milliseconds
  const startTime = 3 * 60 * 1000;

  let time = startTime;

  // Update the timer every 1000 milliseconds (1 second)
  const interval = setInterval(() => {
    // Calculate the minutes and seconds remaining
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);

    // Display the time in the format "MM:SS"
    timer.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    // Decrement the time by 1000 milliseconds (1 second)
    time -= 1000;

    // If the time reaches 0, stop the timer
    if (time <= 0) {
      clearInterval(interval);
    }
  }, 1000);
}
setupTimer()

function addInteractivity() {
  // Get a reference to the table element
  let table = document.getElementById("grid");

  // Initialize the word variable
  let word = "";

  // Add a mousedown event listener to the table
  table.addEventListener("mousedown", function(event) {
    // Get the target element that was clicked
    let target = event.target;

    // If the target is a table cell
    if (target.tagName === "TD") {
      // Add the "selected" class to the cell
      target.classList.add("selected");

      // Update the word variable with the letter in the cell
      word += target.textContent;

      // Add a mouseover event listener to the table
      table.addEventListener("mouseover", mouseoverHandler);
    }
  });

  // Add a mouseup event listener to the table
  document.addEventListener("mouseup", function(event) {
    // Remove the mouseover event listener from the table
    table.removeEventListener("mouseover", mouseoverHandler);

    // Get the selected cells
    let cells = Array.from(table.getElementsByClassName("selected"));

    // Check if the word is valid
    isWordValid(word).then(isValid => {
      // If the word is valid, highlight the cells in blue
      // Otherwise, highlight the cells in red
      if (word.length > 3) {
        for (let i = 0; i < cells.length; i++) {
          cells[i].classList.remove("selected");
          cells[i].classList.add(isValid ? "valid" : "invalid");
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
        // Loop over the cells and apply the "valid" or "invalid" class
        for (let i = 0; i < cells.length; i++) {
          cells[i].classList.remove(isValid ? "valid" : "invalid");
        }
        word = "";
      }, 1000);
    });
  });

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
}
addInteractivity()

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
