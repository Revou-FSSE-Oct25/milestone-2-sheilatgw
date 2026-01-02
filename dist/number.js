export function createGame(gameKey = "numberGuess") {
    var _a;
    const highScoreKey = `${gameKey}_highScore`;
    const highScoreByKey = `${gameKey}_highScoreBy`;
    const nicknameKey = `${gameKey}_nickname`;
    let highScore = Number(localStorage.getItem(highScoreKey) || 0);
    let secretNumber = Math.trunc(Math.random() * 100 + 1);
    let score = 100;
    let attempts = 20;
    let playerName = localStorage.getItem(nicknameKey) || "Player";
    if (!playerName) {
        const name = (_a = prompt("Enter your nickname:")) === null || _a === void 0 ? void 0 : _a.trim();
        playerName = name && name !== "" ? name : "Player";
        localStorage.setItem(nicknameKey, playerName);
    }
    function guessNumber(num) {
        if (attempts <= 0) {
            return { message: "You've lost the game :(", correct: false, score: 0, attempts: 0 };
        }
        if (num !== secretNumber) {
            score -= 5;
            attempts--;
            if (attempts <= 0 || score <= 0) {
                score = 0;
                attempts = 0;
                return { message: "You've lost the game :(", correct: false, score, attempts };
            }
            return { message: num > secretNumber ? "Too High!" : "Too Low!", correct: false, score, attempts };
        }
        else {
            if (score > highScore) {
                highScore = score;
                localStorage.setItem(highScoreKey, String(highScore));
                localStorage.setItem(highScoreByKey, playerName);
            }
            return { message: `Congratulations ${playerName}! You've won the game :)`, correct: true, score, attempts, highScore };
        }
    }
    function resetGame() {
        score = 100;
        attempts = 20;
        secretNumber = Math.trunc(Math.random() * 100 + 1);
        return { score, attempts };
    }
    function getHighScore() {
        return highScore;
    }
    function getPlayerName() {
        return playerName;
    }
    return { guessNumber, resetGame, getHighScore, getPlayerName,
        getState: () => ({ secretNumber, score, attempts, highScore, playerName }),
    };
}
