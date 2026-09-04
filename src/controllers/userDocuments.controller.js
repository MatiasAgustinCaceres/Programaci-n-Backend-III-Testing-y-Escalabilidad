import User from '../models/user.model.js'
import CustomError from '../middlewares/CustomError.js'
import { errorDictionary } from '../middlewares/errorDictionary.js'
import logger from '../config/logger.js'

export const uploadUserDocument = async (req, res, next) => {
  try {
    const { id } = req.params
    const { file } = req

    // Validación: archivo requerido
    if (!file) {
      throw CustomError.createError(errorDictionary.FILE_REQUIRED)
    }

    // Validación: tipos permitidos
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg']
    if (!allowedTypes.includes(file.mimetype)) {
      throw CustomError.createError(errorDictionary.INVALID_TYPE)
    }

    // Buscar usuario
    const user = await User.findById(id)
    if (!user) {
      throw CustomError.createError(errorDictionary.USER_NOT_FOUND)
    }

    // Guardar documento en el usuario
    user.documents = user.documents || []
    user.documents.push({
      docType: req.body.docType,
      originalName: file.originalname,
      mimeType: file.mimetype,
      path: file.path
    })
    await user.save()

    logger.info(`Documento cargado correctamente para usuario ${id}`)

    // Respuesta exitosa
    return res.status(200).json({
      status: 'success',
      payload: user.documents.at(-1)
    })
  } catch (error) {
    logger.error(
      `${error.name} - ${error.message} - POST /api/users/${req.params.id}/documents`
    )
    next(error)
  }
}
