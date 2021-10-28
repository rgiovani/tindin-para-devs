import { Request, Response } from 'express'
import * as task from '../services/task'
import { error } from '../libs/bindError'

const list = async (req: Request<any>, res: Response<any>) => {
  try {
    const { _id: userId } = req.user
    const { page, perPage } = req.query
    const tasks = await task.list(Number(page), Number(perPage), userId)
    return res.json(tasks)
  } catch (err: any) {
    return error(res, err)
  }
}

const get = async (req: Request<any>, res: Response<any>) => {
  try {
    const { _id: userId } = req.user

    const taskId = req.params.id
    if (!taskId) return res.status(400).json({ message: 'Informe o campo id!' })

    const taskFounded = await task.get(taskId, userId)
    res.json(taskFounded)
  } catch (err: any) {
    return error(res, err)
  }

}

const create = async (req: Request<any>, res: Response<any>) => {
  try {
    const { _id: userId } = req.user
    const name = req.body.name
    const taskCreated = await task.create({ name }, userId)

    return res.json(taskCreated)
  } catch (err: any) {
    return error(res, err)
  }
}

const update = async (req: Request<any>, res: Response<any>) => {
  try {
    const { _id: userId } = req.user

    const id = req.body.id
    const name = req.body.name

    if (!id) {
      return res.status(400).json({ message: 'Informe o campo id!' })
    }

    const taskUpdated = await task.update({ id, name }, userId)
    return res.json(taskUpdated)
  } catch (err: any) {
    return error(res, err)
  }

}

const remove = async (req: Request<any>, res: Response<any>) => {
  try {
    const { _id: userId } = req.user

    const taskId = req.body.id

    if (!taskId) {
      return res.status(400).json({ message: 'Informe o campo id!' })
    }

    await task.remove(taskId, userId)
    res.json({ success: true })

  } catch (err: any) {
    return error(res, err)
  }
}

export {
  list,
  get,
  create,
  update,
  remove
}
