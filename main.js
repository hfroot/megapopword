const grid = document.getElementById("grid");

// Create an array of letters
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Create 10 rows
for (let i = 0; i < 10; i++) {
  const row = document.createElement("div");
  row.classList.add("row");

  // Create 10 cells
  for (let j = 0; j < 10; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    // Select a random letter from the letters array
    const letter = letters[Math.floor(Math.random() * letters.length)];
    cell.textContent = letter;

    row.appendChild(cell);
  }

  grid.appendChild(row);
}
