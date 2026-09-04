import OrderModel from '../models/order.model.js'

export const ordersRepository = {
  getAll: async (page = 1, limit = 20) => {
    return OrderModel.find()
      .populate('customerId')
      .populate('productId')
      .skip((page - 1) * limit)
      .limit(Number(limit))
  },

  getById: async (id) => 
    OrderModel.findById(id)
      .populate('customerId')
      .populate('productId'),

  create: async (data) => OrderModel.create(data),

  createMany: async (dataArray) => OrderModel.insertMany(dataArray)
}
