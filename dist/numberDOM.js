var _a;
import { createGame } from "./number.js";
const container = document.getElementById("container");
const buttonPlay = document.getElementById("again");
const buttonCheck = document.getElementById("check");
const hideNumber = document.getElementById("hide");
const messageEl = document.getElementById("message");
const inputNumber = document.getElementById("input_num");
const highScoreEl = document.getElementById("high_score");
const scoreEl = document.getElementById("score");
const attemptsEl = document.getElementById("attempt");
const arlecchino = document.getElementById("arlecchino");
let playerName = localStorage.getItem("nickname") || "Player";
if (!playerName) {
    const name = (_a = prompt("Enter your nickname:")) === null || _a === void 0 ? void 0 : _a.trim();
    playerName = name && name !== "" ? name : "Player";
    localStorage.setItem("nickname", playerName);
}
messageEl.textContent = `Good luck, ${playerName}!`;
const storedHighScore = Number(localStorage.getItem("highScore") || 0);
const game = createGame();
highScoreEl.textContent = String(game.getHighScore());
function updateUI(score, attempts, msg) {
    scoreEl.textContent = String(score);
    attemptsEl.textContent = String(attempts);
    messageEl.textContent = msg;
    if (attempts <= 10) {
        attemptsEl.classList.add("text-red-500");
        arlecchino.src = "/media/arlecalm.webp";
    }
    else {
        attemptsEl.classList.remove("text-red-500");
    }
}
buttonCheck.addEventListener("click", () => {
    const guess = Number(inputNumber.value);
    if (Number.isNaN(guess)) {
        messageEl.textContent = "Please enter a number :(";
        return;
    }
    const result = game.guessNumber(guess);
    updateUI(result.score, result.attempts, result.message);
    if (result.correct) {
        hideNumber.textContent = String(guess);
        hideNumber.style.width = "50%";
        hideNumber.style.transition = "all 0.5s ease-in";
        container.classList.add("bg-stone-200");
        arlecchino.src = "/media/arlesmile.webp";
        localStorage.setItem("highScore", String(game.getHighScore()));
        localStorage.setItem("highScoreBy", playerName);
        highScoreEl.textContent = String(game.getHighScore());
    }
    else if (result.attempts <= 0) {
        container.classList.add("bg-white");
        arlecchino.src = "/media/arlescary.webp";
    }
});
buttonPlay.addEventListener("click", () => {
    const state = game.resetGame();
    updateUI(state.score, state.attempts, "Start guessing......");
    hideNumber.textContent = "?";
    hideNumber.style.width = "";
    inputNumber.value = "";
    container.classList.remove("bg-white", "bg-stone-200");
    arlecchino.src = "/media/arlessh.webp";
});
