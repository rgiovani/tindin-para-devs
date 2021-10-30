import { connect } from '../libs/mongodb'

import { ITask } from "../types/ITask"
import { Task } from '../models/taskModel'

import { log } from "../libs/log"


const list = async (page: number, perPage: number, userId?: string) => {
  page = (page) ? page : 1
  perPage = (perPage) ? perPage : 50

  await connect()

  const maxPages = Math.min(perPage, 100)
  const skip = (+page - 1) * (+maxPages)
  const result = await Task.find({ user: userId }).skip(skip).limit(maxPages)

  await log(userId, 'Listagem de tarefas')

  return result
}

const get = async (id: string, userId?: string) => {
  if (!id) {
    throw new Error("Informe o campo id!")
  }

  await connect()

  const task = await Task.findById(id)
  if (!task) {
    throw new Error("Nenhuma tarefa encontrada com esse ID")
  }
  await log(userId, 'Listagem de tarefa por ID')
  return task
}

const create = async (task: ITask, userId?: string) => {
  if (!task.name) {
    throw new Error("Informe o campo name!")
  }

  task.user = userId
  task.isChecked = false

  await connect()

  await Task.create(task)
  await log(userId, 'Criação de tarefa')

  return true
}

const update = async (task: ITask, userId?: string) => {
  if (!task.id) {
    throw new Error("Informe o campo id!")
  }

  if (!task.name) {
    throw new Error("Informe o campo name!")
  }

  task.isChecked = (task.isChecked) ? task.isChecked : false

  await connect()

  const taskFounded = await Task.findByIdAndUpdate(task.id, task)

  if (!taskFounded) {
    throw new Error("Nenhuma tarefa encontrada com o id informado!")
  }

  await log(userId, 'Alteração de tarefa')

  return true
}

const remove = async (id: string, userId?: string) => {
  if (!id) {
    throw new Error("Informe o campo id!")
  }

  await connect()

  const task = await Task.findByIdAndRemove(id)
  if (!task) {
    throw new Error("Nenhuma tarefa encontrada com o id informado!")
  }

  await log(userId, 'Exclusão de tarefa')

  return true
}

export {
  list,
  get,
  create,
  update,
  remove
}
