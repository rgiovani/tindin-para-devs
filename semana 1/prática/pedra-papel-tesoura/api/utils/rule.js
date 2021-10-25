function getWinner(userChoose, computerChoose) {
    if (userChoose === computerChoose) {
        return "DRAW";
    } else {
        if (userChoose === "SCISSORS") {
            if (computerChoose === "ROCK")
                return "COMPUTER";
            else
                return "USER";

        } else if (userChoose === "ROCK") {
            if (computerChoose === "SCISSORS")
                return "USER";
            else
                return "COMPUTER";
        } else {
            if (computerChoose === "SCISSORS")
                return "COMPUTER";
            else
                return "USER";
        }
    }
}

module.exports.getWinner = getWinner;