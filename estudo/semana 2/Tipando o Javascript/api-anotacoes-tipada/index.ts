import express from 'express'
import cors from 'cors'

import notesRoutes from './routes/notesRoutes'
import bookRoutes from './routes/bookRoutes'

const app = express()
const PORT = 3000

app.use(express.static('www'))
app.use(express.json())
app.use(cors())

notesRoutes(app)
bookRoutes(app)

app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
});
