const userRoutes = require('./src/routes/UserRoute');

const PORT = 3333;

const express = require('express');
const cors = require('cors');
const app = express();

userRoutes(app);

app.use(cors());
app.use(express.json());
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
});