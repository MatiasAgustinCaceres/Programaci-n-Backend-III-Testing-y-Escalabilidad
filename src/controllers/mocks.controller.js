import CustomError from '../middlewares/CustomError.js'
import { errorDictionary } from '../middlewares/errorDictionary.js'
import { mocksService } from '../services/mocks.service.js'
import { usersRepository } from '../repositories/users.repository.js'
import { productsRepository } from '../repositories/products.repository.js'
import { ordersRepository } from '../repositories/orders.repository.js'
import logger from '../config/logger.js'

// -------------------- USERS --------------------
export const getMockUsers = (req, res, next) => {
  try {
    const qty = parseInt(req.query.qty) || 1
    if (qty <= 0) {
      logger.warning(`Cantidad inválida de usuarios mock: ${qty}`)
      throw CustomError.createError(errorDictionary.INVALID_QTY)
    }
    const users = mocksService.generateUsers(qty)
    logger.info(`Generados ${qty} usuarios mock`)
    res.json({ status: 'success', payload: users })
  } catch (error) {
    next(error)
  }
}

export const seedMockUsers = async (req, res, next) => {
  try {
    const qty = parseInt(req.query.qty) || 1
    if (qty <= 0) {
      logger.warning(`Cantidad inválida de usuarios para seed: ${qty}`)
      throw CustomError.createError(errorDictionary.INVALID_QTY)
    }
    const inserted = await mocksService.seedUsers(qty)
    logger.info(`Insertados ${inserted.length} usuarios mock en DB`)
    res.json({ status: 'success', insertados: inserted.length, coleccion: 'usuarios' })
  } catch (error) {
    next(error)
  }
}

// -------------------- PRODUCTS --------------------
export const getMockProducts = (req, res, next) => {
  try {
    const qty = parseInt(req.query.qty) || 1
    if (qty <= 0) {
      logger.warning(`Cantidad inválida de productos mock: ${qty}`)
      throw CustomError.createError(errorDictionary.INVALID_QTY)
    }
    const products = mocksService.generateProducts(qty)
    logger.info(`Generados ${qty} productos mock`)
    res.json({ status: 'success', payload: products })
  } catch (error) {
    next(error)
  }
}

export const seedMockProducts = async (req, res, next) => {
  try {
    const qty = parseInt(req.query.qty) || 1
    if (qty <= 0) {
      logger.warning(`Cantidad inválida de productos para seed: ${qty}`)
      throw CustomError.createError(errorDictionary.INVALID_QTY)
    }
    const inserted = await mocksService.seedProducts(qty)
    logger.info(`Insertados ${inserted.length} productos mock en DB`)
    res.json({ status: 'success', insertados: inserted.length, coleccion: 'productos' })
  } catch (error) {
    next(error)
  }
}

// -------------------- ORDERS --------------------
export const getMockOrders = async (req, res, next) => {
  try {
    const qty = parseInt(req.query.qty) || 1
    if (qty <= 0) {
      logger.warning(`Cantidad inválida de órdenes mock: ${qty}`)
      throw CustomError.createError(errorDictionary.INVALID_QTY)
    }
    const users = await usersRepository.getAll()
    const products = await productsRepository.getAll()
    const orders = mocksService.generateOrders(qty, users, products)
    logger.info(`Generadas ${qty} órdenes mock`)
    res.json({ status: 'success', payload: orders })
  } catch (error) {
    next(error)
  }
}

export const seedMockOrders = async (req, res, next) => {
  try {
    const qty = parseInt(req.query.qty) || 1
    if (qty <= 0) {
      logger.warning(`Cantidad inválida de órdenes para seed: ${qty}`)
      throw CustomError.createError(errorDictionary.INVALID_QTY)
    }
    const inserted = await mocksService.seedOrders(qty)
    logger.info(`Insertadas ${inserted.length} órdenes mock en DB`)
    res.json({ status: 'success', insertados: inserted.length, coleccion: 'orders' })
  } catch (error) {
    next(error)
  }
}

// -------------------- DELIVERIES --------------------
export const getMockDeliveries = async (req, res, next) => {
  try {
    const qty = parseInt(req.query.qty) || 1
    if (qty <= 0) {
      logger.warning(`Cantidad inválida de entregas mock: ${qty}`)
      throw CustomError.createError(errorDictionary.INVALID_QTY)
    }
    const orders = await ordersRepository.getAll()
    const drivers = (await usersRepository.getAll()).filter(u => u.role === 'driver')
    const deliveries = mocksService.generateDeliveries(qty, orders, drivers)
    logger.info(`Generadas ${qty} entregas mock`)
    res.json({ status: 'success', payload: deliveries })
  } catch (error) {
    next(error)
  }
}

export const seedMockDeliveries = async (req, res, next) => {
  try {
    const qty = parseInt(req.query.qty) || 1
    if (qty <= 0) {
      logger.warning(`Cantidad inválida de entregas para seed: ${qty}`)
      throw CustomError.createError(errorDictionary.INVALID_QTY)
    }
    const inserted = await mocksService.seedDeliveries(qty)
    logger.info(`Insertadas ${inserted.length} entregas mock en DB`)
    res.json({ status: 'success', insertados: inserted.length, coleccion: 'deliveries' })
  } catch (error) {
    next(error)
  }
}