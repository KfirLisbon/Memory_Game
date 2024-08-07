var errors = 0;
var cardList = [
    "Pictures/182_chevron_corporation.jpg",
    "Pictures/branding.jpeg",
    "Pictures/ChessBoard.jpg",
    "Pictures/download (1).jpeg",
    "Pictures/download.jpeg",
    "Pictures/ig.jpeg",
    "Pictures/online.jpeg",
    "Pictures/user4.jpeg",
    "Pictures/x.jpeg"
];

var cardSet;
var board = [];
var rows = 4;
var columns = 5;

var car1Selected = null;
var car2Selected = null;

window.onload = function() {
    shuffleCard();
    startGame();
};

function shuffleCard() {
    cardSet = cardList.concat(cardList);
    console.log(cardSet);
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
    const boardElement = document.getElementById("board");

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);

            let card = document.createElement("img");
            card.id = i.toString() + "-" + j.toString();
            card.src = "Pictures/back.jpeg"; // Initially show the back of the card
            card.classList.add("card");
            card.addEventListener("click", selectedCard);
            boardElement.append(card);
        }
        board.push(row);
    }
    console.log(board);
    setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let card = document.getElementById(i.toString() + "-" + j.toString());
            card.src = "Pictures/back.jpeg"; // Initially show the back of the card
        }
    }
}

function selectedCard() {
    // Ensure the src attribute is correctly compared
    if (this.src.includes("back.jpeg")) {
        if (!car1Selected) {
            car1Selected = this;

            let coords = car1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            car1Selected.src = board[r][c]; // Use the full path from board
        } else if (!car2Selected && this !== car1Selected) {
            car2Selected = this;

            let coords = car2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            car2Selected.src = board[r][c];
            setTimeout(update, 1000);
        }
    }
}

function update() {
    if (car1Selected.src !== car2Selected.src) {
        car1Selected.src = "Pictures/back.jpeg";
        car2Selected.src = "Pictures/back.jpeg";
        errors += 1;
        document.getElementById("errors").innerHTML = "Errors: " + errors;
    }

    car1Selected = null;
    car2Selected = null;
}
