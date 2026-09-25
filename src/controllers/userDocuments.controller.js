import User from '../models/user.model.js'
import CustomError from '../middlewares/CustomError.js'
import { errorDictionary } from '../middlewares/errorDictionary.js'
import logger from '../config/logger.js'

export const uploadUserDocument = async (req, res, next) => {
  try {
    const { id } = req.params
    const { file } = req

    if (!file) {
      throw CustomError.createError(errorDictionary.FILE_REQUIRED)
    }

    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg']
    if (!allowedTypes.includes(file.mimetype)) {
      throw CustomError.createError(errorDictionary.INVALID_TYPE)
    }

    const user = await User.findById(id)
    if (!user) {
      throw CustomError.createError(errorDictionary.USER_NOT_FOUND)
    }

    const fileName = file.originalname || file.filename
    const fileRef = file.path || `uploads/${file.filename}`

    user.documents = user.documents || []
    user.documents.push({
      name: fileName,
      originalName: fileName,
      reference: fileRef
    })

    await user.save()

    logger.info(`Documento cargado correctamente para usuario ${id}`)

    return res.status(200).json({
      status: 'success',
      payload: user.documents.at(-1)
    })
  } catch (error) {
    logger.error(
      `${error.name || 'Error'} - ${error.message} - POST /api/users/${req.params.id}/documents`
    )
    next(error)
  }
}