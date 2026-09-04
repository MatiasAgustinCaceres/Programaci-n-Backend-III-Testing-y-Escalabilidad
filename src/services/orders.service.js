import CustomError from '../middlewares/CustomError.js'
import { errorDictionary } from '../middlewares/errorDictionary.js'
import { ordersRepository } from '../repositories/orders.repository.js'
import logger from '../config/logger.js'

export const ordersService = {
  getAllOrders: async (page = 1, limit = 20) => {
    try {
      const orders = await ordersRepository.getAll(page, limit)
      logger.info(`Se obtuvieron ${orders.length} órdenes (page=${page}, limit=${limit})`)
      return orders
    } catch (error) {
      logger.error(`Error al obtener órdenes: ${error.message}`)
      throw CustomError.createError(errorDictionary.DB_ERROR)
    }
  },

  createOrder: async (data) => {
    try {
      const newOrder = await ordersRepository.create(data)
      logger.info(`Orden creada correctamente con id: ${newOrder._id}`)
      return newOrder
    } catch (error) {
      logger.error(`Error al crear orden: ${error.message}`)
      throw CustomError.createError(errorDictionary.DB_ERROR)
    }
  },

  getOrderById: async (id) => {
    try {
      const order = await ordersRepository.getById(id)
      if (!order) {
        logger.warning(`Orden no encontrada con id: ${id}`)
        throw CustomError.createError(errorDictionary.ORDER_NOT_FOUND)
      }
      logger.info(`Orden encontrada con id: ${id}`)
      return order
    } catch (error) {
      if (error instanceof CustomError) throw error
      logger.error(`Error al obtener orden: ${error.message}`)
      throw CustomError.createError(errorDictionary.DB_ERROR)
    }
  }
}
