const choices = ["rock", "paper", "scissor"];
const playAgain = document.getElementById("replay") as HTMLButtonElement;
const mizukiScore = document.getElementById("mizukiScore") as HTMLElement;
const yaeMikoScore = document.getElementById("yaeMikoScore") as HTMLElement;
const resultStatus = document.getElementById("result") as HTMLElement;
const yumeMizuki = document.getElementById("mizuki") as HTMLImageElement;
const yaeMiko = document.getElementById("yaeMiko") as HTMLImageElement;

let mizukiPoint = 0;
let yaeMikoPoint = 0;
let gameOver = false;

const rockButton = document.getElementById("rock") as HTMLButtonElement;
const paperButton = document.getElementById("paper") as HTMLButtonElement;
const scissorButton = document.getElementById("scissor") as HTMLButtonElement;


function game(mizukiChoice : string){
    if (gameOver) return;

    const yaeMikoChoice = choices[Math.floor(Math.random() * 3)];

    if (mizukiChoice === yaeMikoChoice){
        resultStatus.textContent = "IT'S A TIE!";
        return;
    }

    let mizukiWin = false;

    switch (mizukiChoice){
        case "rock" :
            mizukiWin = yaeMikoChoice === "scissor";
            break;
        case "paper" :
            mizukiWin = yaeMikoChoice === "rock";
            break;
        case "scissor" :
            mizukiWin = yaeMikoChoice === "paper";
            break;
    }

    if (mizukiWin){
        mizukiPoint++;
        mizukiScore.textContent = String(mizukiPoint);
        yumeMizuki.src = "/media/mizukirw.webp";
        yaeMiko.src = "/media/yaerl.webp";
        resultStatus.textContent = "Mizuki Win This Round!";
    }
    else{
        yaeMikoPoint++;
        yaeMikoScore.textContent = String(yaeMikoPoint);
        yumeMizuki.src = "/media/mizukirl.webp";
        yaeMiko.src = "/media/yaerw.webp";
        resultStatus.textContent = "Yae Miko Win This Round!";
    }

    if (mizukiPoint === 3){
        resultStatus.textContent = "🎉 MIZUKI WIN THE GAME!";
        gameOver = true;
        yumeMizuki.src = "/media/mizukiwin.webp";
        yaeMiko.src = "/media/yaelose.webp";
    }
    else if (yaeMikoPoint === 3){
        resultStatus.textContent = "💀 YAE MIKO WIN THE GAME!";
        gameOver = true;
        yumeMizuki.src = "/media/mizukilose.webp";
        yaeMiko.src = "/media/yaewin.webp";
    }
}

rockButton.addEventListener("click", () => game("rock"));
paperButton.addEventListener("click", () => game("paper"));
scissorButton.addEventListener("click", () => game("scissor"));

playAgain.addEventListener("click", () => {
    mizukiPoint = 0;
    yaeMikoPoint = 0;
    gameOver = false;
    yumeMizuki.src = "/media/mizuki.webp"
    yaeMiko.src = "/media/yae.webp"
    mizukiScore.textContent = "0";
    yaeMikoScore.textContent = "0";
    resultStatus.textContent = "CHOOSE YOUR MOVE, MIZUKI!";
});
