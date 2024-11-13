const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");

const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
// Speed of the ball
let timerId;
// Controling the direction of the ball
let xDirection = 2;
let yDirection = 2;

let score = 0;

// User's starting position
const userStart = [230, 10];
let currentPosition = userStart;

// Ball's starting position
const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

// Class for creating blocks
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

// Array of all the blocks
const blocks = [
    // 1st row
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    // 2nd row
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    // 3rd row
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
];

// Draw the blocks
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.style.left = blocks[i].bottomLeft[0] + "px"; // Assigning the xAxis
        block.style.bottom = blocks[i].bottomLeft[1] + "px"; // Assigning the yAxis
        grid.appendChild(block);
    }
    
}

addBlocks();

// Add the user
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

// Drawing the user from the styles of its class from the css file
function drawUser() {
    user.style.left = currentPosition[0] + "px";
    user.style.bottom = currentPosition[1] + "px";
}

// Moving the user
function moveUser(event) {
    switch(event.key) {
        case "ArrowLeft":
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawUser();
            }
            break;
        case "ArrowRight":
            if (currentPosition[0] < (boardWidth - blockWidth)) {
                currentPosition[0] += 10;
                drawUser();
            }
            break;
    }
}

// This function is onvoked with every press on the keydown in the keyboard
document.addEventListener("keydown", moveUser);

// Add the ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

// Drawing the ball from the styles of its class from the css file
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + "px";
    ball.style.bottom = ballCurrentPosition[1] + "px";
}

// Moving the ball
function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    // Checking if there is a collision with every move
    checkForCollisions();
}

// Set interval to control the speed of the ball's move
timerId = setInterval(moveBall, 30);

// Checking if there is collision between the ball and the blocks or the wall
function checkForCollisions() {
    // Check for block collisions
    for (let i =0; i < blocks.length; i++) {
        // A condition to know that we are in the block's area
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            // Array.from() to convert this NodeList to a real array
            const allBlocks = Array.from(document.querySelectorAll(".block"));
            // If there is a collision the block will be removed
            // Removing the class so the block will be hided
            allBlocks[i].classList.remove("block");
            // Removing the block itself from the blocks Array
            blocks.splice(i, 1);
            // Changing the direction after a collision with a block
            changeDirection();
            // Incrementing the score
            score++;
            scoreDisplay.innerHTML = score;

            // Check for win
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = "YOU WIN !";
                // Stop the ball's move
                clearInterval(timerId);
                // Stop the user's move
                document.removeEventListener("keydown", moveUser);
            }
        }
    }

    // Check for wall collisions
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0
    ) {
        changeDirection();
    }

    // Check for user collisions
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection();
    }

    // Check for game over (ball's collision with the bottom border)
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId);
        scoreDisplay.innerHTML = "You lose !";
        // Remove the possibility of moving
        document.removeEventListener("keydown", moveUser);
    }
}

// Changing the direction of ball with every collision
function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2;
        return;
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return;
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2;
        return;
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2;
        return;
    }
}


