const grid = document.getElementById("grid");

// Create an array of letters
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Create 10 rows
for (let i = 0; i < 10; i++) {
  const row = document.createElement("tr");

  // Create 10 cells
  for (let j = 0; j < 10; j++) {
    const cell = document.createElement("td");

    // Select a random letter from the letters array and assign it to the cell
    cell.textContent = letters[Math.floor(Math.random() * letters.length)];

    row.appendChild(cell);
  }

  grid.appendChild(row);
}
