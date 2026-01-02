import {choices, state, game, resetGame } from "./rockPaperScissor.js";

const playAgain = document.getElementById("replay") as HTMLButtonElement;
const mizukiScore = document.getElementById("mizukiScore") as HTMLElement;
const yaeMikoScore = document.getElementById("yaeMikoScore") as HTMLElement;
const resultStatus = document.getElementById("result") as HTMLElement;
const yumeMizuki = document.getElementById("mizuki") as HTMLImageElement;
const yaeMiko = document.getElementById("yaeMiko") as HTMLImageElement;
const rockButton = document.getElementById("rock") as HTMLButtonElement;
const paperButton = document.getElementById("paper") as HTMLButtonElement;
const scissorButton = document.getElementById("scissor") as HTMLButtonElement;

function updateDOM(result: any) {
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
  } else {
    yumeMizuki.src = "/media/mizukirl.webp";
    yaeMiko.src = "/media/yaerw.webp";
    resultStatus.textContent = result.gameOver ? "💀 YAE MIKO WIN THE GAME!" : "Yae Miko Win This Round!";
  }

  if (result.gameOver) {
    if (result.mizukiWin) {
      yumeMizuki.src = "/media/mizukiwin.webp";
      yaeMiko.src = "/media/yaelose.webp";
    } else {
      yumeMizuki.src = "/media/mizukilose.webp";
      yaeMiko.src = "/media/yaewin.webp";
    }
  }
}

rockButton.addEventListener("click", () => {
  const result = game("rock");
  if (result) updateDOM(result);
});

paperButton.addEventListener("click", () => {
  const result = game("paper");
  if (result) updateDOM(result);
});

scissorButton.addEventListener("click", () => {
  const result = game("scissor");
  if (result) updateDOM(result);
});

playAgain.addEventListener("click", () => {
  const newState = resetGame();
  mizukiScore.textContent = "0";
  yaeMikoScore.textContent = "0";
  resultStatus.textContent = "";
  yumeMizuki.src = "/media/mizuki.webp";
  yaeMiko.src = "/media/yae.webp";
});