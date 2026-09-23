import ProductModel from '../models/product.model.js'

export const productsRepository = {
  getAll: async (page = 1, limit = 20) => {
    return ProductModel.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
  },

  getById: async (id) => ProductModel.findById(id),

  create: async (data) => ProductModel.create(data),

  createMany: async (dataArray) => ProductModel.insertMany(dataArray)
}