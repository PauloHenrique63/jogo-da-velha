const PLAYER_X = 'X';
const PLAYER_O = 'O';

let currentPlayer = PLAYER_X;
let board = ['', '', '', '', '', '', '', '', ''];
let winner = null;

function playMove(index) {
    if (!winner && board[index] === '') {
        board[index] = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        updateBoard();
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]              // Diagonais
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = currentPlayer;
            break;
        }
    }
}

function isBoardFull() {
    return board.every(cell => cell !== '');
}

function resetGame() {
    currentPlayer = PLAYER_X;
    board = ['', '', '', '', '', '', '', '', ''];
    winner = null;
    updateBoard();
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });

    const status = document.getElementById('status');
    if (winner) {
        status.textContent = `Vencedor: Jogador ${winner}`;
    } else if (isBoardFull()) {
        status.textContent = 'Empate!';
    } else {
        status.textContent = `Vez do jogador ${currentPlayer}`;
    }
}

updateBoard();

