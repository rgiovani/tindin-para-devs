import mongoose from "mongoose"
import { Log } from "../models/logModel"

const limit = 10

const log = async (userId?: string, message?: string, array?: Array<any>) => {
  if (userId) {
    await Log.create({ user: userId, description: message })
  }

  if (!array) {
    array = await Log.find()
  }

  const collectionSize = array.length

  if (collectionSize > limit) {
    await Log.findByIdAndRemove(array[0]['_id'].toString())
    return await Log?.find()
  }
  return array
}

export {
  log
}
