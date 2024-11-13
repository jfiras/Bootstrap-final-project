const computerChoiceDisplay = document.getElementById("computer-choice");
const userChoiceDisplay = document.getElementById("user-choice");
const resultDisplay = document.getElementById("result");
const possibleChoices = document.querySelectorAll("button");
let userChoice;
let computerChoice;
let result;

for (let i = 0; i < possibleChoices.length; i++) {
    possibleChoices[i].addEventListener("click", function(e) {
        userChoice = e.target.id;
        userChoiceDisplay.innerHTML = userChoice;
        generateComputerChoice();
        getResult();
    });
}

function generateComputerChoice() {
    // Generating random number from 1 to 3
    const randomNumber = Math.floor(Math.random() * 3);
    // Treating the different possibilities and according to it generating the computer choice randomly
    if (randomNumber === 1) {
        computerChoice = "rock";
    }
    if (randomNumber === 2) {
        computerChoice = "scissors";
    }
    if (randomNumber === 3) {
        computerChoice = "paper";
    }
    computerChoiceDisplay.innerHTML = computerChoice;
}

function getResult() {
    // Displaying the result
    // If the two choices are the same so it's a draw
    if (computerChoice === userChoice) {
        result = "It's a draw !";
    }
    // Treating the other cases when one of the two wins according to the game rules
    if (computerChoice === "rock") {
        if (userChoice === "paper") {
            result = "You win !";
        }
        if (userChoice === "scissors") {
            result = "You lose !";
        }
    }
    if (computerChoice === "paper") {
        if (userChoice === "rock") {
            result = "You lose !";
        }
        if (userChoice === "scissors") {
            result = "You win !";
        }
    }
    if (computerChoice === "scissors") {
        if (userChoice === "rock") {
            result = "You win !";
        }
        if (userChoice === "paper") {
            result = "You lose !";
        }
    }
    resultDisplay.innerHTML = result;
}

// Go back to the home page
function goBack() {
    window.location.href = "../index.html";
}

