import express from 'express'
import notesRoutes from './routes/notesRoutes'

const app = express()
const PORT = 3000

app.use(express.static('www'))
app.use(express.json())

notesRoutes(app)

app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
});
