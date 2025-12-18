const container = document.getElementById("container");
const buttonPlay = document.getElementById("again");
const buttonCheck = document.getElementById("check");
const hideNumber = document.getElementById("hide");
const message = document.getElementById("message");
const inputNumber = document.getElementById("input_num");
const highScoreEl = document.getElementById("high_score");
const scoreEl = document.getElementById("score");
const attemptsLeft = document.getElementById("attempt");

if (!container || !buttonPlay || !buttonCheck || !hideNumber || !message || !inputNumber || !highScoreEl || !scoreEl || !attemptsLeft) {
    throw new Error("Error banh DOM nya ga ketemu");
}

const input = inputNumber as HTMLInputElement;
const playButton = buttonPlay as HTMLButtonElement;
const checkButton = buttonCheck as HTMLButtonElement;
const leftAttempts = attemptsLeft as HTMLElement;
const arlecchino = document.getElementById("arlecchino") as HTMLImageElement;


let secretNumber = Math.trunc(Math.random() * 100 + 1);
let score = 100;
let highScore = 0;
let attempts = 20;

let playerName: string = localStorage.getItem("nickname") || "Player";
if (!playerName) {
    const name = prompt("Enter your nickname:")?.trim();
    playerName = name && name !== "" ? name : "Player";
    localStorage.setItem("nickname", playerName);
}
message.textContent = `Good luck, ${playerName}!`;


const storedHighScore = localStorage.getItem("highScore");
if (storedHighScore) {
    highScore = Number(storedHighScore);
    highScoreEl.textContent = storedHighScore;
}

function updateAttempts(attempts: number) {
    leftAttempts.textContent = String(attempts);

    if (attempts <=10){
        leftAttempts.classList.add("text-red-500");
        arlecchino.src = "/media/arlecalm.webp";
    }
    else {
        leftAttempts.classList.remove("text-red-500");
    }

}

buttonCheck.addEventListener('click',()=>{
    const guess: number = Number(input.value);

    if (Number.isNaN(guess)){
        message.textContent = "Please enter the number :(";
        return;
    }

    if (guess != secretNumber){
        if (score > 1){ 
            score -= 5;
            scoreEl.textContent = String(score);
            attempts--;
            updateAttempts(attempts);
            message.textContent = guess > secretNumber ? "Too High!" : "Too Low!";
        }
        else {
            message.textContent = "You've lost the game :(";
            scoreEl.textContent = "0";
            container.classList.add("bg-white");
            attempts = 0;
            updateAttempts(attempts);
            arlecchino.src = "/media/arlescary.webp";
        }
    }
    else {
        hideNumber.textContent = String(secretNumber);
        hideNumber.style.width = "50%";
        hideNumber.style.transition = "all 0.5s ease-in";
        container.classList.add("bg-stone-200");
        message.textContent = "Congratulations! You've won the game :)";
        arlecchino.src = "/media/arlesmile.webp"

        if (score > highScore){
            highScore = score;
            highScoreEl.textContent = String(highScore);
            localStorage.setItem("highScore", String(highScore));
            localStorage.setItem("highScoreBy", playerName);
        }
    }
})

playButton.addEventListener("click", () => {
    score = 100;
    attempts = 20;
    secretNumber = Math.trunc(Math.random() * 100 + 1);

    scoreEl.textContent = String(score);
    updateAttempts(attempts);
    message.textContent = "Start guessing......";
    hideNumber.textContent = "?";
    input.value = "";
    container.classList.remove("bg-white", "bg-stone-200");
    arlecchino.src = "/media/arlessh.webp";
});



 



