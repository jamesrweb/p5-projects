const guesses = {};

function guessPI(number) {
  let in_circle_count = 0;
  let in_square_count = number;

  // we will draw a red point with a width and height of 10px
  stroke(181, 0, 24);
  strokeWeight(10);
  for (let i = number; i > 0; i--) {
    // 0 - 1 inclusive
    const x = (Math.random() * 101) / 100;
    // 0 - 1 inclusive
    const y = (Math.random() * 101) / 100;
    // from bottom left to x y
    const distance = dist(0, 0, x, y);
    // if it was greater than 1 we wouldn't be inside the circle
    if (distance <= 1) in_circle_count++;
    // draw the point to the canvas
    point(map(x, 0, 1, 10, width - 10), map(y, 0, 1, -10, -height + 10));
  }

  // Area of the circle = PI * r ** 2
  // Area of the square = 4 * r ** 2)
  // Area of the circle / Area of the square equals PI / 4
  // Since the r ** 2 parts cancel eachother out
  // We can from this calculate PI to be 4 * the ratio of in circle vs in square
  // 4 * in circle / in square will thus be roughly equivalent to PI
  const guess = (4 * in_circle_count) / in_square_count;

  // cache the guess information for outputting later
  guesses[number] = {};
  guesses[number].guess = guess;
  guesses[number].in_circle_count = in_circle_count;
  guesses[number].in_square_count = in_square_count;

  //return the guess
  return guess;
}

function outputGuesses() {
  const { elt: table } = createElement("table");
  const { elt: headingRow } = createElement("tr");
  const headings = ["Number", "Guess", "In circle count", "In square count"];
  for (const heading of headings) {
    const { elt: tableHeading } = createElement("th");
    tableHeading.textContent = heading;
    headingRow.appendChild(tableHeading);
  }

  table.appendChild(headingRow);

  for (const number of Object.keys(guesses)) {
    const { elt: tableRow } = createElement("tr");
    const { in_circle_count, in_square_count, guess } = guesses[number];

    const { elt: numberCell } = createElement("td");
    numberCell.textContent = number;
    tableRow.appendChild(numberCell);

    const { elt: guessCell } = createElement("td");
    guessCell.textContent = guess;
    tableRow.appendChild(guessCell);

    const { elt: circleCountCell } = createElement("td");
    circleCountCell.textContent = in_circle_count;
    tableRow.appendChild(circleCountCell);

    const { elt: squareCountCell } = createElement("td");
    squareCountCell.textContent = in_square_count;
    tableRow.appendChild(squareCountCell);

    table.appendChild(tableRow);
  }
}
