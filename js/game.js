const board = document.querySelector('#board');
const title = document.querySelector('#title');
const message = document.querySelector('#message');
const params = new URLSearchParams(window.location.search);
const puzzleFile = params.get('puzzle') || 'easy_1.json';

fetch(`assets/puzzles/${puzzleFile}`)
    .then((response) => response.json())
    .then((game) => {
        title.textContent = game.title;
        drawBoard(game.puzzle, game.solution);
    });

function drawBoard(puzzle, solution) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const number = puzzle[row][col];
            const input = document.createElement('input');

            input.className = 'cell';
            input.maxLength = 1;
            input.inputMode = 'numeric';

            if (number !== 0) {
                input.value = number;
                input.disabled = true;
                input.classList.add('fixed');
            }

            input.addEventListener('input', () => {
                input.value = input.value.replace(/[^1-9]/g, '');

                if (input.value === '') {
                    input.classList.remove('wrong', 'correct');
                    message.textContent = 'Fill the empty cells.';
                    return;
                }

                if (Number(input.value) === solution[row][col]) {
                    input.classList.remove('wrong');
                    input.classList.add('correct');

                    if (levelIsFinished(solution)) {
                        message.textContent = 'Congratulations! You finished the level.';
                    } else {
                        message.textContent = 'Correct.';
                    }
                } else {
                    input.classList.remove('correct');
                    input.classList.add('wrong');
                    message.textContent = 'Wrong number.';
                }
            });

            board.appendChild(input);
        }
    }
}

function levelIsFinished(solution) {
    const inputs = document.querySelectorAll('.cell');

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];

        if (input.classList.contains('fixed')) {
            continue;
        }

        const row = Math.floor(i / 9);
        const col = i % 9;
        const correctNumber = solution[row][col];

        if (Number(input.value) !== correctNumber) {
            return false;
        }
    }

    return true;
}
