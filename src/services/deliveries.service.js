import CustomError from '../middlewares/CustomError.js'
import { errorDictionary } from '../middlewares/errorDictionary.js'
import { deliveriesRepository } from '../repositories/deliveries.repository.js'
import logger from '../config/logger.js'

export const deliveriesService = {
  getAllDeliveries: async (page = 1, limit = 20) => {
    try {
      const deliveries = await deliveriesRepository.getAll(page, limit)
      logger.info(`Se obtuvieron ${deliveries.length} entregas (page=${page}, limit=${limit})`)
      return deliveries
    } catch (error) {
      logger.error(`Error al obtener entregas: ${error.message}`)
      throw CustomError.createError(errorDictionary.DB_ERROR)
    }
  },

  createDelivery: async (data) => {
    try {
      const newDelivery = await deliveriesRepository.create(data)
      logger.info(`Entrega creada correctamente con id: ${newDelivery._id}`)
      return newDelivery
    } catch (error) {
      logger.error(`Error al crear entrega: ${error.message}`)
      throw CustomError.createError(errorDictionary.DB_ERROR)
    }
  },

  updateDeliveryStatus: async (id, status) => {
    const updated = await deliveriesRepository.updateStatus(id, status)

    if (updated === null) {
      logger.warning(`Estado inválido para entrega con id: ${id}`)
      throw CustomError.createError(errorDictionary.INVALID_STATUS)
    }

    if (updated === undefined) {
      logger.warning(`Entrega no encontrada con id: ${id}`)
      throw CustomError.createError(errorDictionary.DELIVERY_NOT_FOUND)
    }

    logger.info(`Entrega ${id} actualizada a estado: ${status}`)
    return updated
  }
}
