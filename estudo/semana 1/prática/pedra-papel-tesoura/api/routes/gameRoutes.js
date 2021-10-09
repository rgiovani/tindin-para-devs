function gameRoutes(app) {

    app.get('/game', (req, res) => {
        res.json('Pedra, Papel ou Tesoura?');
    });
}

module.exports.gameRoutes = gameRoutes;