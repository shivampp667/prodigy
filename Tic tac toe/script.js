const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  return winConditions.some(condition => {
    return condition.every(index => board[index] === currentPlayer);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
