import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'

import usersRoutes from './routes/user'
import lessonsRoutes from './routes/lesson'

dotenv.config()

const app = express()
const PORT = 3000

app.use(express.static('www'))
app.use(express.json())
app.use(cors())

usersRoutes(app)
lessonsRoutes(app)

app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
});
