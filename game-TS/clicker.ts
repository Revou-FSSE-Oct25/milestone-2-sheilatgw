window.addEventListener("DOMContentLoaded", () => {
const buttonClick = document.getElementById("button") as HTMLButtonElement;
const playButton = document.getElementById("replay") as HTMLButtonElement;
const scoreEl = document.getElementById("score") as HTMLElement;
const highScoreEl = document.getElementById("high-score") as HTMLElement;
const timerEl = document.getElementById("timer") as HTMLElement;
const uikaMisumi = document.getElementById("uika") as HTMLImageElement;

let score = 0;
let timeLeft = 30;
let highScore = 0;
let timer: number;

let playerName: string = localStorage.getItem("nickname") || "Player";
if (!playerName) {
    const name = prompt("Enter your nickname:")?.trim();
    playerName = name && name !== "" ? name : "Player";
    localStorage.setItem("nickname", playerName);
}

const storedHighScore = localStorage.getItem("highScore");
if (storedHighScore) {
    highScore = Number(storedHighScore);
    highScoreEl.textContent = storedHighScore;
}

function startTimer() {
    clearInterval(timer); 
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = String(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            buttonClick.disabled = true;
            alert(`Waktu habis! Skormu: ${score}`);
        }
    }, 1000);
}

buttonClick.addEventListener('click',()=>{
    score+=10;
    scoreEl.textContent = String(score);
    if (score >=500){
        uikaMisumi.src = "/media/dolorisu.webp";
    }
    else if (score >=1000){
        uikaMisumi.src = "/media/doloris.webp"; 
    }

    if (score > highScore) {
        highScore = score;
        highScoreEl.textContent = String(highScore);
        localStorage.setItem("highScore", String(highScore));
        localStorage.setItem("highScoreBy", playerName!);
    }
});

playButton.addEventListener("click", () => {
    score = 0;
    timeLeft = 30;
    scoreEl.textContent = String(score);
    uikaMisumi.src = "/media/hatsune.webp";
    buttonClick.disabled = false;
    startTimer();
});

startTimer();
});

