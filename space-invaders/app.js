const grid = document.querySelector(".grid");
const resultsDisplay = document.querySelector(".results");
let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let invadersId;
let goingRight = true;
let aliensRemoved = [];
let results = 0;


for (let i = 0; i < 225; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39

];

// Creating invaders
function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        // Checking that the invader we are going to display is not already dead
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add("invader");
        }
    }
}

draw();

// Removing invaders
function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader");
    }
}

squares[currentShooterIndex].classList.add("shooter");

function moveShooter(event) {
    squares[currentShooterIndex].classList.remove("shooter");
    switch(event.key) {
        case "ArrowLeft" :
            if (currentShooterIndex % width !== 0) {
                currentShooterIndex -=1;
            }
            break;
        case "ArrowRight" :
            if (currentShooterIndex % width < width - 1) {
                currentShooterIndex +=1;
            }
            break;
    }
    squares[currentShooterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveShooter);

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    // Remove all invaders to put them in their new positions
    remove();
    // If the invaders touched the right edge
    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            // The invadors move to the next row
            alienInvaders[i] += width + 1;
            // Changing their direction
            direction = -1;
            goingRight = false;
        }
    }
    // If the invaders touched the left edge
    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1;
            direction = 1;
            goingRight = true;
        }
    }
    // Keep updating the position according to the direction
    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }
    // Displaying invaders in their updated positions
    draw();

    // Checking if the invaders touched the shooter
    if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
        resultsDisplay.innerHTML = "GAME OVER";
        clearInterval(invadersId);
    }

    // Checking if the invaders touched the bottom of the border
    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > (squares.length - width)) {
            resultsDisplay.innerHTML = "GAME OVER";
            clearInterval(invadersId);
        }
    }

    // Check for a win
    if (aliensRemoved.length === alienInvaders.length) {
        resultsDisplay.innerHTML = "YOU WIN";
        clearInterval(invadersId);
    }
}

invadersId = setInterval(moveInvaders, 300);

function shoot(event) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;
    function moveLaser() {
        // Updating the laser position on the xAxis
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add("laser");

        // If there is a collision between laser and invader
        if (squares[currentLaserIndex].classList.contains("invader")) {
            // This square should be empty and have a specific effect for a boom collision
            squares[currentLaserIndex].classList.remove("invader");
            squares[currentLaserIndex].classList.remove("laser");
            squares[currentLaserIndex].classList.add("boom");

            // Remove the boom effect after a little bit of time
            setTimeout(function() {
                squares[currentLaserIndex].classList.remove("boom");
            }, 300);
            clearInterval(laserId);
            
            //Remove the invader attacked
            const alienRemoval = alienInvaders.indexOf(currentLaserIndex);
            // Push the invader attacked in the specific array
            aliensRemoved.push(alienRemoval);
            // Incrementing the score
            results++;
            resultsDisplay.innerHTML = results;
        }
    }

    switch(event.key) {
        case "ArrowUp" :
            laserId = setInterval(moveLaser, 100);
    }
}

document.addEventListener("keydown", shoot);

// Go back to the home page
function goBack() {
    window.location.href = "../index.html";
}

