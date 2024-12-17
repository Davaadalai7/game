
const main = document.getElementById("main");

// Card values
const cardValues = [
    "1",
    "1",
    "2",
    "2",
    "3",
    "3",
    "4",
    "4",
    "5",
    "5",
    "6",
    "6",
    "7",
    "7",
    "8",
    "8",
];

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle cards
shuffle(cardValues);


// Create cards
cardValues.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.innerHTML = '<span class="hidden">' + value + "</span>";
    main.appendChild(card);
});

// Timer variables
let timer = 0;
let timerInterval;
const timerDisplay = document.getElementById("timer");

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = `Time: ${timer}s`;
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Handle card logic
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Flip card function
function flipCard(event) {
    if (lockBoard) return;
    const clickedCard = event.target;

    if (clickedCard === firstCard) return;
    clickedCard.classList.add("flipped");
    clickedCard.querySelector("span").classList.remove("hidden");

    if (!firstCard) {
        firstCard = clickedCard;
        if (!timerInterval) startTimer(); // Start timer if it's not already running
    } else {
        secondCard = clickedCard;
        checkForMatch();
    }
}
let count = 0;
// Check if two cards match
function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;
    if(isMatch) {disableCard(); count++; console.log(count);checkGameOver();} else{unflipCard();}
}

// Disable matched cards
function disableCard() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

// Unflip cards if they don't match
function unflipCard() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        firstCard.querySelector("span").classList.add("hidden");
        secondCard.classList.remove("flipped");
        secondCard.querySelector("span").classList.add("hidden");
        resetBoard();
    }, 1000);
}

// Reset the board
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
// Check if all cards are matched
function checkGameOver() {
    const allCards = document.querySelectorAll(".card");
    const matchedCards = document.querySelectorAll(".flipped");
    if (/*allCards.length === matchedCards.length*/ count == 8) {
        alert(`You won! Time: ${timer}s`);
        stopTimer();
    }
}

// Event listener for each card
document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", flipCard);
});


function resetGame() {
    
    main.innerHTML = ''; 
    shuffle(cardValues); 
    cardValues.forEach((value) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = value;
        card.innerHTML = '<span class="hidden">' + value + "</span>";
        main.appendChild(card);
    });

    timer = 0;
    timerDisplay.textContent = "Time: 0s";
    clearInterval(timerInterval);
    timerInterval = null;
}
