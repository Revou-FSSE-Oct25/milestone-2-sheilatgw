export let timeLeft = 20;
export function gameHighScore(currentScore) {
    const stored = localStorage.getItem("highScore");
    if (stored === null) {
        return currentScore;
    }
    const storedScoreClicker = Number(stored);
    if (currentScore > storedScoreClicker) {
        return currentScore;
    }
    return storedScoreClicker;
}
export function startTimer(startTime) {
    const state = { ended: false, timeLeft: startTime };
    const timer = setInterval(() => {
        state.timeLeft--;
        if (state.timeLeft <= 0) {
            clearInterval(timer);
            state.ended = true;
        }
    }, 1000);
    return state;
}
export const state = { score: 0, highScore: 0, timeLeft: 20 };
export function clickGame() {
    state.score += 10;
    state.highScore = Math.max(state.score, state.highScore);
    localStorage.setItem("highScore", String(state.highScore));
    return state;
}
export function resetGame() {
    state.score = 0;
    state.timeLeft = 20;
    return state;
}
