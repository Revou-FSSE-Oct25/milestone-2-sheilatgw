import { game, resetGame } from "./rockPaperScissor.js";
const playAgain = document.getElementById("replay");
const mizukiScore = document.getElementById("mizukiScore");
const yaeMikoScore = document.getElementById("yaeMikoScore");
const resultStatus = document.getElementById("result");
const yumeMizuki = document.getElementById("mizuki");
const yaeMiko = document.getElementById("yaeMiko");
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorButton = document.getElementById("scissor");
function updateDOM(result) {
    mizukiScore.textContent = String(result.mizukiPoint);
    yaeMikoScore.textContent = String(result.yaeMikoPoint);
    if (result.tie) {
        resultStatus.textContent = "IT'S A TIE!";
        return;
    }
    if (result.mizukiWin) {
        yumeMizuki.src = "/media/mizukirw.webp";
        yaeMiko.src = "/media/yaerl.webp";
        resultStatus.textContent = result.gameOver ? "🎉 MIZUKI WIN THE GAME!" : "Mizuki Win This Round!";
    }
    else {
        yumeMizuki.src = "/media/mizukirl.webp";
        yaeMiko.src = "/media/yaerw.webp";
        resultStatus.textContent = result.gameOver ? "💀 YAE MIKO WIN THE GAME!" : "Yae Miko Win This Round!";
    }
    if (result.gameOver) {
        if (result.mizukiWin) {
            yumeMizuki.src = "/media/mizukiwin.webp";
            yaeMiko.src = "/media/yaelose.webp";
        }
        else {
            yumeMizuki.src = "/media/mizukilose.webp";
            yaeMiko.src = "/media/yaewin.webp";
        }
    }
}
rockButton.addEventListener("click", () => {
    const result = game("rock");
    if (result)
        updateDOM(result);
});
paperButton.addEventListener("click", () => {
    const result = game("paper");
    if (result)
        updateDOM(result);
});
scissorButton.addEventListener("click", () => {
    const result = game("scissor");
    if (result)
        updateDOM(result);
});
playAgain.addEventListener("click", () => {
    const newState = resetGame();
    mizukiScore.textContent = "0";
    yaeMikoScore.textContent = "0";
    resultStatus.textContent = "";
    yumeMizuki.src = "/media/mizuki.webp";
    yaeMiko.src = "/media/yae.webp";
});
