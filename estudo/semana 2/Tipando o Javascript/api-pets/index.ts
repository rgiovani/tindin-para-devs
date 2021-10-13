import express from 'express'

const app = express()
const PORT = 3000

app.use(express.static('www'))

app.get('/users', (req, res) => {
  res.send('Teste retorno')
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
})
