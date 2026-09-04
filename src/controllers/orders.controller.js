import { ordersService } from '../services/orders.service.js'
import CustomError from '../middlewares/CustomError.js'
import { errorDictionary } from '../middlewares/errorDictionary.js'

export const getOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const orders = await ordersService.getAllOrders(Number(page), Number(limit))
    res.status(200).json({ status: 'success', payload: orders })
  } catch (error) {
    next(error)
  }
}

export const createOrder = async (req, res, next) => {
  try {
    const { customerId, productId, cantidad } = req.body
    if (!customerId || !productId || !cantidad) {
      throw CustomError.createError({
        name: 'INVALID_DATA',
        message: 'Datos incompletos',
        statusCode: 400
      })
    }

    const order = await ordersService.createOrder(req.body)
    res.status(201).json({ status: 'success', payload: order })
  } catch (error) {
    next(error)
  }
}

export const getOrderById = async (req, res, next) => {
  try {
    const order = await ordersService.getOrderById(req.params.id)
    if (!order) {
      throw CustomError.createError(errorDictionary.ORDER_NOT_FOUND)
    }
    res.status(200).json({ status: 'success', payload: order })
  } catch (error) {
    next(error)
  }
}
