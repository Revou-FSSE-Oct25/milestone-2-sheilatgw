export {}
const buttonClick = document.getElementById("button") as HTMLButtonElement;
const playButton = document.getElementById("replay") as HTMLButtonElement;
const scoreEl = document.getElementById("score") as HTMLElement;
const highScoreEl = document.getElementById("high-score") as HTMLElement;
const timerEl = document.getElementById("timer") as HTMLElement;
const uikaMisumi = document.getElementById("uika") as HTMLImageElement;

console.log(buttonClick);


let score = 0;
let timeLeft = 20;
let highScore = 0;
let timeStarted = false;
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
    if (!timeStarted) {
        startTimer();          
        timeStarted = true;
    }
    score+=10;
    scoreEl.textContent = String(score);
    if (score >=1000){
        uikaMisumi.src = "/media/doloris.webp";
    }
    else if (score >=500){
        uikaMisumi.src = "/media/dolorisu.webp";
    }

    if (score > highScore) {
        highScore = score;
        highScoreEl.textContent = String(highScore);
        localStorage.setItem("highScore", String(highScore));
        localStorage.setItem("highScoreBy", playerName!);
    }
});

playButton.addEventListener("click", () => {
    clearInterval(timer);
    score = 0;
    timeLeft = 20;
    timeStarted = false;
    timerEl.textContent = "20"
    scoreEl.textContent = "0";
    scoreEl.textContent = String(score);
    uikaMisumi.src = "/media/hatsune.webp";
    buttonClick.disabled = false;
});



