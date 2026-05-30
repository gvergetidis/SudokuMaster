const puzzleBox = document.querySelector('#puzzles');
const selectedPuzzle = document.querySelector('#selectedPuzzle');

fetch('assets/puzzles/puzzles.json')
    .then((response) => response.json())
    .then((puzzles) => {
        puzzles.forEach((puzzle, index) => {
            const card = document.createElement('button');

            card.type = 'button';
            card.className = `card ${puzzle.difficulty}`;
            card.dataset.file = puzzle.file;
            card.innerHTML = `<strong>${puzzle.title}</strong><span>${puzzle.difficulty}</span>`;

            if (index === 0) {
                card.classList.add('selected');
                selectedPuzzle.value = puzzle.file;
            }

            card.addEventListener('click', () => {
                document.querySelectorAll('.card').forEach((item) => item.classList.remove('selected'));
                card.classList.add('selected');
                selectedPuzzle.value = puzzle.file;
            });

            puzzleBox.appendChild(card);
        });
    });
