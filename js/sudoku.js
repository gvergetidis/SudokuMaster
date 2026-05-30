const puzzleBox = document.querySelector('#puzzles');

fetch('assets/puzzles/puzzles.json')
    .then((response) => response.json())
    .then(showPuzzles);

function showPuzzles(puzzles) {
    puzzles.forEach(addPuzzleCard);
}

function addPuzzleCard(puzzle) {
    const card = document.createElement('button');

    card.type = 'submit';
    card.name = 'puzzle';
    card.value = puzzle.file;
    card.className = `card ${puzzle.difficulty}`;
    card.innerHTML = `<strong>${puzzle.title}</strong><span>${puzzle.difficulty}</span>`;

    puzzleBox.appendChild(card);
}
