import mongoose, { Schema } from 'mongoose'

const taskSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isChecked: {
    type: Boolean,
    required: true
  }
})

const Task = mongoose.model('tasks', taskSchema)

export { Task }
