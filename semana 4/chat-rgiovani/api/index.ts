import * as dotenv from 'dotenv'
import cors from 'cors'

import * as express from 'express'
import * as socketio from 'socket.io'
import * as http from 'http'

import * as message from './controllers/message'
import * as user from './controllers/user'
import { isLogged } from './libs/middlewareLogin'
import { initIo } from './libs/socket'
import uploads from './upload'

dotenv.config()

const app = express.default()
const PORT = 3000

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(__dirname + '/uploads'));
app.post('/login', user.login)
app.post('/register', user.register)
app.post('/auth/validate', isLogged, user.checkIfTokenIsValid)

app.get('/chat/messages', isLogged, message.list)
app.post('/chat/messages', isLogged, message.create)

app.post('/chat/upload/img', isLogged, uploads.single('image-file'), message.uploadImage)

const server = http.createServer(app)
const io = new socketio.Server(server, {
  cors: {
    origin: '*'
  }
})

initIo(io)

server.listen(3000, function () {
  console.log(`Running at localhost:${PORT}`)
})
