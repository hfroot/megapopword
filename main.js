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
