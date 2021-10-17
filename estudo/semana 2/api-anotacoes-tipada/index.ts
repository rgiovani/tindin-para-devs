import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'

import notesRoutes from './routes/notes'
import booksRoutes from './routes/books'
import petsRoutes from './routes/pets'

dotenv.config()

const app = express()
const PORT = 3000

app.use(express.static('www'))
app.use(express.json())
app.use(cors())

notesRoutes(app)
booksRoutes(app)
petsRoutes(app)

app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
});
