const gameBoard = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");
const attemptsDisplay = document.getElementById("attempts");
const historyList = document.getElementById("history");
const congratulations = document.getElementById("congratulations");

let attempts = 0;
let flippedCards = [];
let matchedPairs = 0;

// Imagens do jogo
const images = [
    "Tenis de mesa.jpg",
    "Badminton.jpg",
    "Tenis.jpg",
];

// Gera as cartas aleatoriamente
const generateCards = () => {
    const cardImages = [...images, ...images]; // Duas de cada
    cardImages.sort(() => Math.random() - 0.5); // Embaralha
    gameBoard.innerHTML = ""; // Limpa o tabuleiro
    cardImages.forEach((image, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = index;
        card.dataset.image = image;

        const img = document.createElement("img");
        img.src = image;
        card.appendChild(img);

        gameBoard.appendChild(card);
    });
};

// Verifica se as cartas viradas são iguais
const checkMatch = () => {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.image === card2.dataset.image;

    if (isMatch) {
        matchedPairs++;
        if (matchedPairs === images.length) {
            congratulations.style.display = "block";
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }, 1000);
    }

    flippedCards = [];
};

// Lida com o clique nas cartas
const handleCardClick = (event) => {
    const card = event.target.closest(".card");
    if (!card || card.classList.contains("flipped") || flippedCards.length === 2) {
        return;
    }

    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        attempts++;
        attemptsDisplay.textContent = attempts;

        // Armazena no histórico
        const attemptLog = document.createElement("li");
        attemptLog.textContent = `Jogada ${attempts}: ${flippedCards[0].dataset.image} vs ${flippedCards[1].dataset.image}`;
        historyList.appendChild(attemptLog);

        checkMatch();
    }
};

// Reinicia o jogo
const restartGame = () => {
    attempts = 0;
    matchedPairs = 0;
    flippedCards = [];
    attemptsDisplay.textContent = "0";
    congratulations.style.display = "none";
    historyList.innerHTML = "";
    generateCards();
};

// Configura eventos
gameBoard.addEventListener("click", handleCardClick);
restartBtn.addEventListener("click", restartGame);

// Inicializa o jogo
generateCards();


