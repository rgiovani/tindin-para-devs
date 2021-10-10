const { getWinner } = require("../utils/rule");

function gameRoutes(app) {
    let playCounter = 1;
    const OPTIONS = ['PAPER', 'SCISSORS', 'ROCK'];
    const log = {
        userPoints: 0,
        computerPoints: 0,
        rounds: []
    }

    app.get('/game/:userChoose', (req, res) => {
        const userChoose = req.params.userChoose;
        let computerChoose;

        if (OPTIONS.includes(userChoose?.toUpperCase())) {
            if (log.userPoints > 2 || log.computerPoints > 2) {
                log.rounds = [];
                log.userPoints = 0;
                log.computerPoints = 0;
                playCounter = 1;
            }

            const randomNumber = Math.floor(Math.random() * 10);

            if (randomNumber < 3)
                computerChoose = OPTIONS[0];
            else if (randomNumber > 3 && randomNumber < 6)
                computerChoose = OPTIONS[1];
            else
                computerChoose = OPTIONS[2];

            const winner = getWinner(userChoose?.toUpperCase(), computerChoose);

            if (winner === 'USER')
                log.userPoints++;
            else if (winner === 'COMPUTER')
                log.computerPoints++;

            log.rounds.push({
                play: playCounter++,
                userChoose: userChoose.toUpperCase(),
                computerChoose,
                winner: winner
            });

            if (log.rounds.length > 0 && log.rounds.length > 4)
                log.rounds.splice(0, 1);

            res.json(log)
        } else {
            res.json({ message: "userChoose is invalid or undefined" })
        }

    });
}

module.exports.gameRoutes = gameRoutes;