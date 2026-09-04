import CustomError from '../middlewares/CustomError.js'
import { errorDictionary } from '../middlewares/errorDictionary.js'
import { productsRepository } from '../repositories/products.repository.js'
import logger from '../config/logger.js'

export const productsService = {
  getAvailableProducts: async () => {
    try {
      const products = await productsRepository.getAll()
      logger.info(`Se obtuvieron ${products.length} productos`)
      return products
    } catch (error) {
      logger.error(`Error al obtener productos: ${error.message}`)
      throw CustomError.createError(errorDictionary.DB_ERROR)
    }
  },

  createProduct: async (data) => {
    try {
      const newProduct = await productsRepository.create(data)
      logger.info(`Producto creado correctamente con id: ${newProduct._id}`)
      return newProduct
    } catch (error) {
      logger.error(`Error al crear producto: ${error.message}`)
      throw CustomError.createError(errorDictionary.DB_ERROR)
    }
  },

  getProductById: async (id) => {
    try {
      const product = await productsRepository.getById(id)
      if (!product) {
        logger.warning(`Producto no encontrado con id: ${id}`)
        throw CustomError.createError(errorDictionary.PRODUCT_NOT_FOUND) // 404
      }
      logger.info(`Producto encontrado con id: ${id}`)
      return product
    } catch (error) {
      // Si ya es un CustomError, lo relanzamos tal cual
      if (error instanceof CustomError) throw error

      logger.error(`Error al obtener producto: ${error.message}`)
      throw CustomError.createError(errorDictionary.DB_ERROR)
    }
  }
}
