import { usersService } from '../services/users.service.js'
import CustomError from '../middlewares/CustomError.js'
import { errorDictionary } from '../middlewares/errorDictionary.js'

export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const users = await usersService.getAllUsers(Number(page), Number(limit))
    res.status(200).json({ status: 'success', payload: users })
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body

    if (!name || !email) {
      throw CustomError.createError({
        name: 'INVALID_DATA',
        message: 'Datos incompletos para crear usuario',
        statusCode: 400
      })
    }

    const user = await usersService.createUser(req.body)
    res.status(201).json({ status: 'success', payload: user })
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.id)
    if (!user) {
      throw CustomError.createError(errorDictionary.USER_NOT_FOUND)
    }
    res.status(200).json({ status: 'success', payload: user })
  } catch (error) {
    next(error)
  }
}
