const cardArray = [
    {
        name: "fries",
        img: "images/fries.png"
    },
    {
        name: "cheeseburger",
        img: "images/cheeseburger.png"
    },
    {
        name: "hotdog",
        img: "images/hotdog.png"
    },
    {
        name: "ice-cream",
        img: "images/ice-cream.png"
    },
    {
        name: "milkshake",
        img: "images/milkshake.png"
    },
    {
        name: "pizza",
        img: "images/pizza.png"
    },
    {
        name: "fries",
        img: "images/fries.png"
    },
    {
        name: "cheeseburger",
        img: "images/cheeseburger.png"
    },
    {
        name: "hotdog",
        img: "images/hotdog.png"
    },
    {
        name: "ice-cream",
        img: "images/ice-cream.png"
    },
    {
        name: "milkshake",
        img: "images/milkshake.png"
    },
    {
        name: "pizza",
        img: "images/pizza.png"
    }
];

cardArray.sort(function() {
    // Shuffle the array using random comparison
    // Comparing the two values
    // If the number is positive reverse the order
    // If the number is negative or zero keeo the order
    // That means the first before the second
    return 0.5 - Math.random();
});

const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement("img");
        card.setAttribute("src", "images/blank.png");
        // Setting an id for every image
        card.setAttribute("data-id", i);
        // Adding event listener so when we click the card we flip it (invoking flipCard)
        card.addEventListener("click", flipCard);
        // Showing the cards in the html
        gridDisplay.appendChild(card);
    }
}

createBoard();

function checkMatch() {
    const cards = document.querySelectorAll("img");
    // If there is a match
    if (cardsChosenIds[0] === cardsChosenIds[1]) {
        cards[cardsChosenIds[0]].setAttribute("src", "images/blank.png");
        cards[cardsChosenIds[1]].setAttribute("src", "images/blank.png");
        alert("You have clicked the same image !");
    }
    if (cardsChosen[0] === cardsChosen[1]) {
        // Going to the element in html and changing its src to be blank image after we found a match
        cards[cardsChosenIds[0]].setAttribute("src", "images/white.png");
        cards[cardsChosenIds[1]].setAttribute("src", "images/white.png");
        // Removing the event listener because it's done for these two images matched
        cards[cardsChosenIds[0]].removeEventListener("click", flipCard);
        cards[cardsChosenIds[1]].removeEventListener("click", flipCard);
        cardsWon.push(cardsChosen);
    }
    else { // When two images are clicked and it's not a match
        cards[cardsChosenIds[0]].setAttribute("src", "images/blank.png");
        cards[cardsChosenIds[1]].setAttribute("src", "images/blank.png");
        alert("Sorry try again !");
    }
    // Displaying the score according to how many cards matched
    resultDisplay.textContent = cardsWon.length;
    // Initializing the arrays of chosen cards
    cardsChosen = [];
    cardsChosenIds = [];

    // If all cards are shown and the game is finished
    if (cardsWon.length === cardArray.length / 2) {
        resultDisplay.innerHTML = "Congratulations, You found them all !";
    }
}

function flipCard() {
    // Storing the data id of the specific image clicked
    const cardId = this.getAttribute("data-id");
    // Pushing the clicked images in a new array
    cardsChosen.push(cardArray[cardId].name);
    // Pushing its respective id
    cardsChosenIds.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    // After two images are clicked we must check for a match
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}


