import {timeLeft, gameHighScore, startTimer, state, clickGame, resetGame} from "./clicker.js"

const buttonClick = document.getElementById("button") as HTMLButtonElement;
const playGameButton = document.getElementById("replay") as HTMLButtonElement;
const scoreClickerEl = document.getElementById("score") as HTMLElement;
const highScoreClickerEl = document.getElementById("high-score") as HTMLElement;
const timerEl = document.getElementById("timer") as HTMLElement;
const uikaMisumi = document.getElementById("uika") as HTMLImageElement;

let timerStarted = false;

buttonClick.addEventListener("click", () => {
    if (!timerStarted) {
    const timerState = startTimer(20); 
    timerStarted = true;

    const domInterval = setInterval(() => {
        timerEl.textContent = String(timerState.timeLeft);

        if (timerState.ended) {
            clearInterval(domInterval);
            buttonClick.disabled = true;
            alert(`Waktu habis! Skormu: ${state.score}`);
        }
    }, 100);
}
    
  const result = clickGame(); 
  scoreClickerEl.textContent = String(result.score);

  if(result.score > result.highScore){
    highScoreClickerEl.textContent = String(result.highScore);
  }
  
  if (result.score >= 1000) {
    uikaMisumi.src = "/media/doloris.webp";
  } else if (result.score >= 500) {
    uikaMisumi.src = "/media/dolorisu.webp";
  }
});

const storedHighScore = localStorage.getItem("highScore");
highScoreClickerEl.textContent = storedHighScore || "0";

playGameButton.addEventListener("click", () => {
    const newState = resetGame();

    scoreClickerEl.textContent = String(newState.score);
    timerEl.textContent = String(newState.timeLeft);
    uikaMisumi.src = "/media/hatsune.webp";
    buttonClick.disabled = false;
    timerStarted = false;
    const storedHighScore = localStorage.getItem("highScore");
    highScoreClickerEl.textContent = storedHighScore || "0";
});

