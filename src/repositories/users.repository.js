import UserModel from '../models/user.model.js'

export const usersRepository = {
  getAll: async (page = 1, limit = 20) => {
    return UserModel.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
  },

  getById: async (id) => UserModel.findById(id),

  create: async (data) => UserModel.create(data),

  createMany: async (dataArray) => UserModel.insertMany(dataArray)
}
