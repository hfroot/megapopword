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

  // Add a mousedown event listener to the table
  table.addEventListener("mousedown", function(event) {
    // Get the target element that was clicked
    let target = event.target;

    // If the target is a table cell
    if (target.tagName === "TD") {
      // Add the "selected" class to the cell
      target.classList.add("selected");

      // Add a mouseover event listener to the table
      table.addEventListener("mouseover", mouseoverHandler);
    }
  });

  // Add a mouseup event listener to the document
  document.addEventListener("mouseup", function(event) {
    // Remove the mouseover event listener from the table
    table.removeEventListener("mouseover", mouseoverHandler);

    // Highlight all the selected cells for one second
    let cells = table.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].classList.contains("selected")) {
        cells[i].classList.add("highlighted");
      }
    }

    setTimeout(() => {
      // Remove the "highlighted" and "selected" classes from all cells
      for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("highlighted");
        cells[i].classList.remove("selected");
      }
    }, 1000);
  });

  // Mouseover event handler function
  function mouseoverHandler(event) {
    // Get the target element that the mouse is over
    let target = event.target;

    // If the target is a table cell
    if (target.tagName === "TD") {
      // Add the "selected" class to the cell
      target.classList.add("selected");
    }
  }
}
addInteractivity()
