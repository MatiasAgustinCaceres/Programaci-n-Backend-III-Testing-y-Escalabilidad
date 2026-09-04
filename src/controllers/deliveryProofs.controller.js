import Delivery from '../models/delivery.model.js'
import CustomError from '../middlewares/CustomError.js'
import { errorDictionary } from '../middlewares/errorDictionary.js'
import logger from '../config/logger.js'

export const uploadDeliveryProof = async (req, res, next) => {
  try {
    const { id } = req.params
    const { file } = req

    // Validación: archivo requerido
    if (!file) {
      throw CustomError.createError(errorDictionary.FILE_REQUIRED)
    }

    // Validación: tipos permitidos
    const allowedTypes = ['image/png', 'image/jpeg']
    if (!allowedTypes.includes(file.mimetype)) {
      throw CustomError.createError(errorDictionary.INVALID_TYPE)
    }

    // Buscar entrega
    const delivery = await Delivery.findById(id)
    if (!delivery) {
      throw CustomError.createError(errorDictionary.DELIVERY_NOT_FOUND)
    }

    // Guardar comprobante en la entrega
    delivery.proofs = delivery.proofs || []
    delivery.proofs.push({
      docType: req.body.docType,
      originalName: file.originalname,
      mimeType: file.mimetype,
      path: file.path
    })
    await delivery.save()

    logger.info(`Comprobante cargado correctamente para entrega ${id}`)

    // Respuesta exitosa
    return res.status(200).json({
      status: 'success',
      payload: delivery.proofs.at(-1)
    })
  } catch (error) {
    logger.error(
      `${error.name} - ${error.message} - POST /api/deliveries/${req.params.id}/proof`
    )
    next(error)
  }
}
