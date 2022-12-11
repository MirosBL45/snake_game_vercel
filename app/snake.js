//defining size of the board depending on the screen size
let sizeScreenW = screen.width;
let sizeScreenH = screen.height;

let bSize;

if (sizeScreenW < 420 || sizeScreenH < 420) {
    bSize = 15;
} else if (sizeScreenW < 520 || sizeScreenH < 520) {
    bSize = 20;
} else {
    bSize = 25;
}


// board
const blockSize = bSize;
const rows = 20;
const cols = 20;

//drawing object, used for drawing on the board
let board;
let context;

//snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

//speed for snake
let velocityX = 0;
let velocityY = 0;

//make snake body
let snakeBody = [];

//food for snake
let foodX;
let foodY;

//count score
let score = 0;
let scoreEl = document.querySelector('#score');

//is game over
let gameOver = false;

//buttons for mobile
const upBtn = document.querySelector('#upBtn');
const downBtn = document.querySelector('#downBtn');
const leftBtn = document.querySelector('#leftBtn');
const rightBtn = document.querySelector('#rightBtn');



//initial game
window.onload = function () {
    board = document.querySelector('#board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d');

    placeFood();
    document.addEventListener('keyup', changeDirection);
    // updateBoard();
    setInterval(updateBoard, 1000 / 10)
}



function updateBoard() {
    if (gameOver) {
        return;
    }
    context.fillStyle = 'lightsteelblue';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //increase snake body
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        scoreEl.textContent = score;
    }

    //move body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    //update second segment to follow the head of sneak
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = 'lime';
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    //mark each food
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOverState();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOverState();
        }
    }
}



function changeDirection(e) {
    if (e.code == 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == 'ArrowDown' && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == 'ArrowLeft' && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


//move on mobile phone with buttons
upBtn.addEventListener('click', () => {
    if (velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
});

downBtn.addEventListener('click', () => {
    if (velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
});

leftBtn.addEventListener('click', () => {
    if (velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
});

rightBtn.addEventListener('click', () => {
    if (velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
});



function placeFood() {
    //(0-1) * cols -> (0-19.999) -> (0-19) * blockSize
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}


function gameOverState() {
    gameOver = true;
    alert('Game over');
    let reload = document.querySelector('#reload');
    reload.style.display = 'inline-block';
}


//for rules modal
const rulesEl = document.querySelector('.rules_modal');
const closeEl = document.querySelector('#closeModal');
const showEl = document.querySelector('#rules');

closeEl.addEventListener('click', () => {
    rulesEl.style.display = 'none'
})


showEl.addEventListener('click', () => {
    rulesEl.style.display = 'block'
})