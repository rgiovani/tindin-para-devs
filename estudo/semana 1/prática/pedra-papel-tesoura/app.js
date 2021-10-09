const express = require('express');
const cors = require('cors');
const { gameRoutes } = require('./api/routes/gameRoutes');

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

gameRoutes(app);

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
});
