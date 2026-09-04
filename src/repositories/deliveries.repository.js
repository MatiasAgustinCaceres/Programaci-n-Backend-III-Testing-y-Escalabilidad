import DeliveryModel, { DELIVERY_STATUS } from '../models/delivery.model.js'

export const deliveriesRepository = {
  getAll: async (page = 1, limit = 20) => {
    return DeliveryModel.find()
      .populate('orderId')
      .populate('driverId')
      .skip((page - 1) * limit)
      .limit(Number(limit))
  },

  getById: async (id) => 
    DeliveryModel.findById(id)
      .populate('orderId')
      .populate('driverId'),

  create: async (data) => DeliveryModel.create(data),

  createMany: async (dataArray) => DeliveryModel.insertMany(dataArray),

  updateStatus: async (id, status) => {
    const estadosValidos = Object.values(DELIVERY_STATUS)
    if (!estadosValidos.includes(status)) {
      return null // servicio lanzará INVALID_STATUS (400)
    }

    const updated = await DeliveryModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('orderId').populate('driverId')

    if (!updated) return undefined // servicio lanzará DELIVERY_NOT_FOUND (404)

    return updated
  }
}
