import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'

import usersRoutes from './routes/user'

dotenv.config()

const app = express()
const PORT = 3000

app.use(express.static('www'))
app.use(express.json())
app.use(cors())

usersRoutes(app)

app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
});
