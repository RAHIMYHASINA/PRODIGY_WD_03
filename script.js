// Initial game variables
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal wins
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical wins
    [0, 4, 8], [2, 4, 6]              // Diagonal wins
];

// Elements
const gameStatus = document.getElementById('gameStatus');
const cells = document.querySelectorAll('.cell');

// Add click event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Function to handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-index');

    if (gameBoard[cellIndex] !== "" || !isGameActive) {
        return;
    }

    updateCell(clickedCell, cellIndex);
    checkForWinner();
}

// Function to update the cell with the current player's mark
function updateCell(cell, index) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// Function to check if there is a winner
function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.textContent = `Player ${currentPlayer} has won!`;
        isGameActive = false;
        return;
    }

    // Check for a draw
    if (!gameBoard.includes("")) {
        gameStatus.textContent = "It's a draw!";
        isGameActive = false;
        return;
    }

    // Switch to the other player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to reset the game
function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    gameStatus.textContent = "Player X's turn";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}

