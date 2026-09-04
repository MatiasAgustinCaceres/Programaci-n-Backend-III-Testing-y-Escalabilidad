import { deliveriesService } from '../services/deliveries.service.js'
import CustomError from '../middlewares/CustomError.js'
import { errorDictionary } from '../middlewares/errorDictionary.js'

export const getDeliveries = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const deliveries = await deliveriesService.getAllDeliveries(Number(page), Number(limit))
    res.status(200).json({ status: 'success', payload: deliveries })
  } catch (error) {
    next(error)
  }
}

export const createDelivery = async (req, res, next) => {
  try {
    const delivery = await deliveriesService.createDelivery(req.body)
    res.status(201).json({ status: 'success', payload: delivery })
  } catch (error) {
    next(error)
  }
}

export const updateDeliveryStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const status = req.body.status || req.body.estado

    const validStates = ['pendiente', 'en_proceso', 'entregado']
    if (!validStates.includes(status)) {
      throw CustomError.createError(errorDictionary.INVALID_STATUS)
    }

    const delivery = await deliveriesService.updateDeliveryStatus(id, status)
    res.status(200).json({ status: 'success', payload: delivery })
  } catch (error) {
    next(error)
  }
}
