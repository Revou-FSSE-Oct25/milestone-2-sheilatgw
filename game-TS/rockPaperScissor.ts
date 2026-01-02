
export const choices = ["rock", "paper", "scissor"];
export const state = {mizukiPoint: 0, yaeMikoPoint: 0, gameOver: false};

export function game(mizukiChoice : string){
    if (state.gameOver) return null;
    
    const yaeMikoChoice = choices[Math.floor(Math.random() * 3)];

    if (yaeMikoChoice === '1'){
        return 
    }

    if (mizukiChoice === yaeMikoChoice){
        return {tie: true, mizukiPoint: state.mizukiPoint, 
            yaeMikoPoint: state.yaeMikoPoint, gameOver: state.gameOver, 
            mizukiChoice, yaeMikoChoice};
    }

    let mizukiWin = false;
    switch (mizukiChoice) {
        case "rock":
            mizukiWin = yaeMikoChoice === "scissor";
        break;
        case "paper":
            mizukiWin = yaeMikoChoice === "rock";
        break;
        case "scissor":
            mizukiWin = yaeMikoChoice === "paper";
        break;
    }

    if (mizukiWin) state.mizukiPoint++;
    else state.yaeMikoPoint++;

    if (state.mizukiPoint === 3) state.gameOver = true;
  if (state.yaeMikoPoint === 3) state.gameOver = true;

  return {mizukiWin, mizukiPoint: state.mizukiPoint,
    yaeMikoPoint: state.yaeMikoPoint, gameOver: state.gameOver,
    mizukiChoice, yaeMikoChoice,};
}

export function resetGame() {
  state.mizukiPoint = 0;
  state.yaeMikoPoint = 0;
  state.gameOver = false;
  return state;
}