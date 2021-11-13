import { Request, Response } from 'express'
import * as userService from '../services/users'
import { error } from '../libs/bindError'

const login = async (req: Request<any>, res: Response<any>) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const socketId = req.body.socketId
    const userLogged = await userService.login({ email, password }, socketId)
    return res.json(userLogged)
  } catch (err: any) {
    return error(res, err)
  }
}

const register = async (req: Request<any>, res: Response<any>) => {
  try {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    const newUser = await userService.register({ name, email, password })
    return res.json(newUser)
  } catch (err: any) {
    return error(res, err)
  }
}

const checkIfTokenIsValid = async (req: Request<any>, res: Response<any>) => {
  try {
    const { _id: userId } = req.user
    const socketId = req.body.socketId

    let user
    if (userId)
      user = await userService.isTokenValid(userId, socketId, req.body.socketsOnline)

    return res.json((user) ? { username: user.name, isValid: true, usersOnline: user.usersOnline } : { username: 'unknown user', isValid: false })
  } catch (err: any) {
    return error(res, err)
  }
}

export {
  login,
  register,
  checkIfTokenIsValid
}
