import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import * as task from './controllers/task'
import * as user from './controllers/user'
import * as log from './controllers/log'

import { isLogged } from './libs/middlewareLogin'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 3000

app.use(express.static('www'))

app.post('/login', user.login)
app.post('/register', user.register)
app.post('/recover', user.recoverAccount)

app.get('/auth/validate', isLogged, user.checkIfTokenIsValid)

app.get('/tasks', isLogged, task.list)
app.get('/tasks/:id', isLogged, task.get)
app.post('/tasks', isLogged, task.create)
app.put('/tasks', isLogged, task.update)
app.delete('/tasks', isLogged, task.remove)

app.get('/logs', isLogged, log.list)

app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
})
