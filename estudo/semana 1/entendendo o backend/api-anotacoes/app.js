const express = require('express');
const cors = require('cors');
const { noteRoutes } = require('./routes/notesRoutes');
const { bookRoutes } = require('./routes/bookRoutes');

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

noteRoutes(app);
bookRoutes(app);

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
});