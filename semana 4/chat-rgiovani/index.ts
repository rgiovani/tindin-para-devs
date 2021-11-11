import * as dotenv from 'dotenv'
import cors from 'cors'

import * as express from 'express'
import * as socketio from 'socket.io'
import * as http from 'http'

import * as message from './controllers/message'
import * as user from './controllers/user'

import { isLogged } from './libs/middlewareLogin'
import { initIo } from './libs/socket'

dotenv.config()

const app = express.default()
const PORT = 3000

app.use(express.json())
app.use(cors())

app.use(express.static('www'))

app.post('/login', user.login)
app.post('/auth/validate', isLogged, user.checkIfTokenIsValid)

app.get('/chat/messages', isLogged, message.list)
app.post('/chat/messages', isLogged, message.create)


const server = http.createServer(app)
const io = new socketio.Server(server)

initIo(io)

server.listen(3000, function () {
  console.log(`Running at localhost:${PORT}`)
})
