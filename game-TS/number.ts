export type GameState = {
    secretNumber: number;
    score: number;
    attempts: number;
    highScore: number;
};

export function createGame(gameKey: string = "numberGuess") {
    const highScoreKey = `${gameKey}_highScore`;
    const highScoreByKey = `${gameKey}_highScoreBy`;
    const nicknameKey = `${gameKey}_nickname`;

    let highScore = Number(localStorage.getItem(highScoreKey) || 0);

    let secretNumber = Math.trunc(Math.random() * 100 + 1);
    let score = 100;
    let attempts = 20;

    // Ambil atau minta nickname
    let playerName: string = localStorage.getItem(nicknameKey) || "Player";
    if (!playerName) {
        const name = prompt("Enter your nickname:")?.trim();
        playerName = name && name !== "" ? name : "Player";
        localStorage.setItem(nicknameKey, playerName);
    }

    function guessNumber(num: number) {
    if (attempts <= 0) {
        // Kalau attempts sudah habis
        return { message: "You've lost the game :(", correct: false, score: 0, attempts: 0 };
    }

    if (num !== secretNumber) {
        score -= 5;
        attempts--; // kurangi attempts setiap kali salah

        if (attempts <= 0 || score <= 0) {
            score = 0;
            attempts = 0;
            return { message: "You've lost the game :(", correct: false, score, attempts };
        }

        return { message: num > secretNumber ? "Too High!" : "Too Low!", correct: false, score, attempts };
    } else {
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

    return {guessNumber, resetGame, getHighScore, getPlayerName,
        getState: () => ({ secretNumber, score, attempts, highScore, playerName }),
    };
}




 



