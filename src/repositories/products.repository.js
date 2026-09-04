import ProductModel from '../models/product.model.js'

export const productsRepository = {
  getAll: async () => ProductModel.find(),
  getById: async (id) => ProductModel.findById(id),
  create: async (data) => ProductModel.create(data),
  createMany: async (dataArray) => ProductModel.insertMany(dataArray)
}