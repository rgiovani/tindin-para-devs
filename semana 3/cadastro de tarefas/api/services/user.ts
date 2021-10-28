import { connect } from '../libs/mongodb'

import { log } from '../libs/log'

import { sign } from 'jsonwebtoken'
import bcrypt from 'bcrypt';

import { IUser } from "../types/IUser"

import { User } from '../models/UserModel'
import { Log } from '../models/logModel'

const LOG_SIZE = 10

const login = async (user: IUser) => {
  if (!user.email) {
    throw new Error("Informe o campo email!")
  }

  if (!user.password) {
    throw new Error("Informe o campo password!")
  }

  await connect()

  const userRegistered = await User.findOne({ email: user.email })
  if (!userRegistered) {
    throw new Error("Usuario não cadastrado")
  }

  let isPassValid = await bcrypt.compare(user.password, userRegistered.password);

  if (!isPassValid) {
    throw new Error("Senha incorreta!")
  }

  const token = sign({
    _id: userRegistered._id,
    name: userRegistered.name,
    email: userRegistered.email
  }, process.env.JWT_SECRET ?? 'emptyjwt', {})

  return { token }
}

const register = async (user: IUser) => {
  if (!user.name) {
    throw new Error("Informe o campo name!")
  }

  if (!user.email) {
    throw new Error("Informe o campo email!")
  }

  if (!user.password) {
    throw new Error("Informe o campo password!")
  }

  await connect()

  const userRegistered = await User.findOne({ email: user.email })
  if (userRegistered) {
    throw new Error("Usuario já cadastrado")
  }

  const saltRounds = 10
  bcrypt.hash(user.password, saltRounds).then(async function (hash) {
    user.password = hash
    return await User.create(user)
  });

  return true
}

const recoverAccount = async (user: IUser) => {
  if (!user.email) {
    throw new Error("Informe o campo email!")
  }

  if (!user.password) {
    throw new Error("Informe o campo password!")
  }

  await connect()

  const userRegistered = await User.findOne({ email: user.email })

  if (!userRegistered) {
    throw new Error("Usuario não cadastrado")
  }

  const saltRounds = 10
  bcrypt.hash(user.password, saltRounds).then(async function (hash) {
    user.password = hash
    return await User.findByIdAndUpdate(userRegistered.id, user)
  });

  return true
}

const getById = async (_id: string) => {
  await connect()
  return User.findById(_id)
}

const listLog = async (page: number, perPage: number, userId?: string) => {
  page = (page) ? page : 1
  perPage = (perPage) ? perPage : 50

  await connect()
  const maxPages = Math.min(perPage, 100)
  const skip = (+page - 1) * (+maxPages)

  await Log.create({ user: userId, description: 'listagem de logs' })

  const result = await Log.find()
    .populate('user', 'name email')
    .skip(skip)
    .limit(maxPages)

  return await log(undefined, undefined, result)
}

export {
  login,
  register,
  recoverAccount,
  getById,
  listLog
}
