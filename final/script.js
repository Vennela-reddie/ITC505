// Game configuration
const GRID_SIZE = 5; // Size of the grid (5x5)
const gameBoard = document.getElementById('game-board'); // Game board container
let boardState = []; // 2D array representing the board state (true for "on", false for "off")

// Initialize the game
function initializeGame() {
    // Create a blank board state
    boardState = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false));

    // Clear the board container
    gameBoard.innerHTML = '';

    // Create squares on the board
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.row = row;
            square.dataset.col = col;

            // Add click event listener to toggle lights
            square.addEventListener('click', () => toggleLights(row, col));
            gameBoard.appendChild(square);
        }
    }

    randomizeBoard(); // Randomize the board state
    renderBoard(); // Render the initial state
}

// Toggle the light state of a square and its neighbors
function toggleLights(row, col) {
    const directions = [
        [0, 0],    // Current square
        [-1, 0],   // Above
        [1, 0],    // Below
        [0, -1],   // Left
        [0, 1]     // Right
    ];

    // Iterate through each direction
    directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;

        // Check bounds to ensure valid toggling
        if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
            boardState[newRow][newCol] = !boardState[newRow][newCol];
        }
    });

    renderBoard(); // Update the board visually

    if (checkWin()) {
        setTimeout(() => {
            alert('Congratulations, you win!');
            initializeGame(); // Restart the game after a win
        }, 200);
    }
}

// Render the board visually
function renderBoard() {
    const squares = document.querySelectorAll('.square');

    squares.forEach(square => {
        const row = parseInt(square.dataset.row, 10);
        const col = parseInt(square.dataset.col, 10);

        if (boardState[row][col]) {
            square.classList.add('is-off'); // Add class for "off" state
        } else {
            square.classList.remove('is-off'); // Remove class for "on" state
        }
    });
}

// Randomize the board state to create a solvable configuration
function randomizeBoard() {
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const randomRow = Math.floor(Math.random() * GRID_SIZE);
        const randomCol = Math.floor(Math.random() * GRID_SIZE);
        toggleLights(randomRow, randomCol); // Simulate a random toggle
    }
}

// Check if the player has won (all lights are off)
function checkWin() {
    return boardState.every(row => row.every(cell => !cell)); // True if all cells are "off"
}

// Start the game
initializeGame();
