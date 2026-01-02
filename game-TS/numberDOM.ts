import { createGame } from "./number.js";

// Ambil DOM
const container = document.getElementById("container") as HTMLElement;
const buttonPlay = document.getElementById("again") as HTMLButtonElement;
const buttonCheck = document.getElementById("check") as HTMLButtonElement;
const hideNumber = document.getElementById("hide") as HTMLElement;
const messageEl = document.getElementById("message") as HTMLElement;
const inputNumber = document.getElementById("input_num") as HTMLInputElement;
const highScoreEl = document.getElementById("high_score") as HTMLElement;
const scoreEl = document.getElementById("score") as HTMLElement;
const attemptsEl = document.getElementById("attempt") as HTMLElement;
const arlecchino = document.getElementById("arlecchino") as HTMLImageElement;

// Player
let playerName: string = localStorage.getItem("nickname") || "Player";
if (!playerName) {
    const name = prompt("Enter your nickname:")?.trim();
    playerName = name && name !== "" ? name : "Player";
    localStorage.setItem("nickname", playerName);
}
messageEl.textContent = `Good luck, ${playerName}!`;

const storedHighScore = Number(localStorage.getItem("highScore") || 0);
const game = createGame();
highScoreEl.textContent = String(game.getHighScore());

function updateUI(score: number, attempts: number, msg: string) {
    scoreEl.textContent = String(score);
    attemptsEl.textContent = String(attempts);
    messageEl.textContent = msg;

    if (attempts <= 10) {
        attemptsEl.classList.add("text-red-500");
        arlecchino.src = "/media/arlecalm.webp";
    } else {
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

        // Update highscore localStorage
        localStorage.setItem("highScore", String(game.getHighScore()));
        localStorage.setItem("highScoreBy", playerName);
        highScoreEl.textContent = String(game.getHighScore());
    } else if (result.attempts <= 0) {
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
