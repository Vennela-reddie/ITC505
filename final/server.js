document.addEventListener('DOMContentLoaded', () => {
    const size = 5; // 5x5 grid
    const board = document.getElementById('game-board');
    let grid = Array.from({ length: size }, () => Array(size).fill(false));

    function createBoard() {
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.dataset.row = row;
                square.dataset.col = col;
                square.addEventListener('click', () => toggleLights(row, col));
                board.appendChild(square);
            }
        }
    }

    function toggleLights(row, col) {
        toggleSingleSquare(row, col);
        toggleSingleSquare(row - 1, col); // Top
        toggleSingleSquare(row + 1, col); // Bottom
        toggleSingleSquare(row, col - 1); // Left
        toggleSingleSquare(row, col + 1); // Right
        checkWin();
    }

    function toggleSingleSquare(row, col) {
        if (row >= 0 && row < size && col >= 0 && col < size) {
            grid[row][col] = !grid[row][col];
            const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            square.classList.toggle('is-off', grid[row][col]);
        }
    }

    function randomizeBoard() {
        for (let i = 0; i < 20; i++) {
            const row = Math.floor(Math.random() * size);
            const col = Math.floor(Math.random() * size);
            toggleLights(row, col);
        }
    }

    function checkWin() {
        if (grid.every(row => row.every(cell => !cell))) {
            alert('You win!');
        }
    }

    createBoard();
    randomizeBoard();
});
