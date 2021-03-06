const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
// array of winning cobos
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3 ,4 ,5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessage = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageText = document.querySelector('[data-winning-message-text]');
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessage.classList.remove('show');
};

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
   
};

function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = 'Draw!';
    } else {
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
    }
        winningMessage.classList.add('show');
};

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS);
    });
};

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
};

function swapTurns() {
    // set to the opposite of circle turn
    circleTurn = !circleTurn;
};

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
};

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combinations => {
        return combinations.every(index => {
            // if the current class is in all 3 elements then you are a winner
            return cellElements[index].classList.contains(currentClass)
        });
    });
};
