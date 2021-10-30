import { Request, Response } from 'express'
import * as userService from '../services/user'
import { error } from '../libs/bindError'

const login = async (req: Request<any>, res: Response<any>) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const userLogged = await userService.login({ email, password })
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

const recoverAccount = async (req: Request<any>, res: Response<any>) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const userUpdated = await userService.recoverAccount({ email, password })
    return res.json(userUpdated)
  } catch (err: any) {
    return error(res, err)
  }
}

const checkIfTokenIsValid = async (req: Request<any>, res: Response<any>) => {
  try {
    const { _id: userId } = req.user
    const userIsValid = await userService.isTokenValid(userId)

    return res.json((userIsValid) ? true : false)
  } catch (err: any) {
    return error(res, err)
  }
}

export {
  login,
  register,
  recoverAccount,
  checkIfTokenIsValid
}
