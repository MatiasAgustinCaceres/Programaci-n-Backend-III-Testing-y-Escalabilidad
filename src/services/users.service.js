import CustomError from '../middlewares/CustomError.js'
import { errorDictionary } from '../middlewares/errorDictionary.js'
import { usersRepository } from '../repositories/users.repository.js'
import logger from '../config/logger.js'

export const usersService = {
  getAllUsers: async (page = 1, limit = 20) => {
    try {
      const users = await usersRepository.getAll(page, limit)
      logger.info(`Se obtuvieron ${users.length} usuarios (page=${page}, limit=${limit})`)
      return users
    } catch (error) {
      logger.error(`Error al obtener usuarios: ${error.message}`)
      throw CustomError.createError(errorDictionary.DB_ERROR)
    }
  },

  createUser: async (data) => {
    try {
      const newUser = await usersRepository.create(data)
      logger.info(`Usuario creado correctamente con id: ${newUser._id}`)
      return newUser
    } catch (error) {
      logger.error(`Error al crear usuario: ${error.message}`)
      throw CustomError.createError(errorDictionary.DB_ERROR)
    }
  },

  getUserById: async (id) => {
    try {
      const user = await usersRepository.getById(id)
      if (!user) {
        logger.warning(`Usuario no encontrado con id: ${id}`)
        throw CustomError.createError(errorDictionary.USER_NOT_FOUND)
      }
      logger.info(`Usuario encontrado con id: ${id}`)
      return user
    } catch (error) {
      if (error instanceof CustomError) throw error
      logger.error(`Error al obtener usuario: ${error.message}`)
      throw CustomError.createError(errorDictionary.DB_ERROR)
    }
  }
}
