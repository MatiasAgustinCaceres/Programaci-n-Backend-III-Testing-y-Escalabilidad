import Order from '../models/order.model.js'
import CustomError from '../middlewares/CustomError.js'
import { errorDictionary } from '../middlewares/errorDictionary.js'
import logger from '../config/logger.js'

export const uploadOrderInvoice = async (req, res, next) => {
  try {
    const { id } = req.params
    const { file } = req

    // Validación: archivo requerido
    if (!file) {
      throw CustomError.createError(errorDictionary.FILE_REQUIRED)
    }

    // Validación: tipos permitidos (solo PDF)
    const allowedTypes = ['application/pdf']
    if (!allowedTypes.includes(file.mimetype)) {
      throw CustomError.createError(errorDictionary.INVALID_TYPE)
    }

    // Buscar pedido
    const order = await Order.findById(id)
    if (!order) {
      throw CustomError.createError(errorDictionary.ORDER_NOT_FOUND)
    }

    // Guardar factura en el pedido
    order.invoices = order.invoices || []
    order.invoices.push({
      docType: req.body.docType,
      originalName: file.originalname,
      mimeType: file.mimetype,
      path: file.path
    })
    await order.save()

    logger.info(`Factura cargada correctamente para pedido ${id}`)

    // Respuesta exitosa
    return res.status(200).json({
      status: 'success',
      payload: order.invoices.at(-1)
    })
  } catch (error) {
    logger.error(
      `${error.name} - ${error.message} - POST /api/orders/${req.params.id}/invoice`
    )
    next(error)
  }
}
