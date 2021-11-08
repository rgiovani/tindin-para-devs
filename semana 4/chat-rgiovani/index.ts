import * as dotenv from 'dotenv'
import cors from 'cors'

import * as express from 'express'
import * as socketio from 'socket.io'
import * as http from 'http'

import * as note from './controllers/note'

dotenv.config()

const app = express.default()
const PORT = 3000

app.use(express.json())
app.use(cors())

app.use(express.static('www'))

app.get('/notes', note.list)
app.get('/notes/:id', note.get)
app.post('/notes', note.create)
app.put('/notes', note.update)
app.delete('/notes', note.remove)

const server = http.createServer(app)
const io = new socketio.Server(server)

io.on('connection', (socket: any) => {
  console.log('[connection]:', socket.client.id)

  socket.on('message', (data: any) => {
    console.log('message:', data)
    io.emit('message', data)
  })

  socket.on('disconnect', () => {
    console.log('[disconnection]:', socket.client.id)
  })
})

server.listen(3000, function () {
  console.log(`Running at localhost:${PORT}`)
})
