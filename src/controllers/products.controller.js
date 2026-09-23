import { productsService } from '../services/products.service.js'
import CustomError from '../middlewares/CustomError.js'
import { errorDictionary } from '../middlewares/errorDictionary.js'

export const getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const products = await productsService.getAvailableProducts(Number(page), Number(limit))
    res.status(200).json({ status: 'success', payload: products })
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body

    // Validación de datos requeridos
    if (!name || !price) {
      throw CustomError.createError({
        name: 'INVALID_DATA',
        message: 'Datos incompletos para crear producto',
        statusCode: 400
      })
    }

    const product = await productsService.createProduct(req.body)
    res.status(201).json({ status: 'success', payload: product })
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (req, res, next) => {
  try {
    const product = await productsService.getProductById(req.params.id)

    // Si no existe, lanzamos error controlado
    if (!product) {
      throw CustomError.createError(errorDictionary.PRODUCT_NOT_FOUND)
    }

    res.status(200).json({ status: 'success', payload: product })
  } catch (error) {
    next(error) // El errorHandler devuelve 404 o 500 según corresponda
  }
}