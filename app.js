const overlay = document.querySelector(".overlay");

window.addEventListener("keydown", e => {
    overlay.style.display = "none";
})

let currentScore = 0;
let diceValue = 0;
let targetScore = 20;
let illegalValue = 1;
let gameOver = false;

const rollButton = document.getElementById("rollButton");
const currentScoreDisplay = document.getElementById("score");
const scoreSummaryText = document.getElementById("scoreTally");
const scoreSection = document.getElementById("scoreInfo");
const diceImage = document.getElementById("dice");
const instructionText = document.getElementById("instruction");
const body = document.getElementsByTagName("body")[0];
const diceRollSFX = document.getElementsByTagName("audio")[0];

rollButton.addEventListener("click", () => {
    scoreSection.style.display = "inline";
    if (gameOver) {
        resetDisplay();
    }
    rollDice(); 
    if (diceValue == illegalValue) {
        processLoss();
        return;
    }
    increaseScore();
    if (currentScore >= targetScore) {
        processWin();
        return;
    }
    instructionText.textContent = `Keep rolling to hit ${targetScore}`;
});

const rollDice = () => {
    playDiceAudio();
    diceValue = Math.ceil(Math.random() * 6);
    setDiceImage();
}

const increaseScore = () => {
    currentScore += diceValue;
    updateScoreDisplay();
}

const updateScoreDisplay = () => {
    currentScoreDisplay.textContent = currentScore;
};

const processLoss = () => {
    body.classList.add("lose");
    instructionText.textContent = "You have lost! Try again?";
    scoreSummaryText.textContent = "Better luck next time!"
    rollButton.textContent = "Roll to restart";
    currentScore = 0;
    gameOver = true;
};

const processWin = () => {
    body.classList.add("win");
    instructionText.textContent = "You have won! You're on a roll!";
    scoreSummaryText.textContent = "Lady Luck is on your side!"
    rollButton.textContent = "Roll to Restart";
    currentScore = 0;
    gameOver = true;
};

const setDiceImage = () => {
    diceImage.style.display = "inline";
    diceImage.src=`img/dice${diceValue}.png`; 
}

const playDiceAudio = () => {
    diceRollSFX.pause();
    diceRollSFX.currentTime = 0;
    diceRollSFX.play();
}
const resetDisplay = () => {
    gameOver = false;
    updateScoreDisplay();
    scoreSummaryText.textContent = "Current Score";
    rollButton.textContent = "Roll Dice";  
    body.classList.remove("win", "lose");
}