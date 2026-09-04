import { faker } from '@faker-js/faker'
import { USER_ROLES, ORDER_STATUS, DELIVERY_PRIORITY, PRODUCT_STATUS } from '../constants/index.js'
import { usersRepository } from '../repositories/users.repository.js'
import { productsRepository } from '../repositories/products.repository.js'
import { ordersRepository } from '../repositories/orders.repository.js'
import { deliveriesRepository } from '../repositories/deliveries.repository.js'
import CustomError from '../middlewares/CustomError.js'
import { errorDictionary } from '../middlewares/errorDictionary.js'

export const mocksService = {
  generateUsers: (qty = 1) => {
    if (qty <= 0) {
      throw CustomError.createError(errorDictionary.INVALID_QTY)
    }
    return Array.from({ length: qty }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: faker.helpers.arrayElement(Object.values(USER_ROLES))
    }))
  },

  generateProducts: (qty = 1) => {
    if (qty <= 0) {
      throw CustomError.createError(errorDictionary.INVALID_QTY)
    }
    return Array.from({ length: qty }).map(() => ({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      status: PRODUCT_STATUS.AVAILABLE
    }))
  },

  generateOrders: (qty = 1, users = [], products = []) => {
    if (qty <= 0 || users.length === 0 || products.length === 0) {
      throw CustomError.createError(errorDictionary.INVALID_QTY)
    }
    return Array.from({ length: qty }).map(() => ({
      customerId: faker.helpers.arrayElement(users)._id,
      productId: faker.helpers.arrayElement(products)._id,
      status: faker.helpers.arrayElement(Object.values(ORDER_STATUS))
    }))
  },

  generateDeliveries: (qty = 1, orders = [], drivers = []) => {
    if (qty <= 0 || orders.length === 0 || drivers.length === 0) {
      throw CustomError.createError(errorDictionary.INVALID_QTY)
    }
    return Array.from({ length: qty }).map(() => ({
      orderId: faker.helpers.arrayElement(orders)._id,
      driverId: faker.helpers.arrayElement(drivers)._id,
      priority: faker.helpers.arrayElement(Object.values(DELIVERY_PRIORITY)),
      status: ORDER_STATUS.PENDING
    }))
  },

  seedUsers: async (qty = 1) => {
    const users = mocksService.generateUsers(qty)
    return usersRepository.createMany(users)
  },

  seedProducts: async (qty = 1) => {
    const products = mocksService.generateProducts(qty)
    return productsRepository.createMany(products)
  },

  seedOrders: async (qty = 1) => {
    const users = await usersRepository.getAll()
    const products = await productsRepository.getAll()
    const orders = mocksService.generateOrders(qty, users, products)
    return ordersRepository.createMany(orders)
  },

  seedDeliveries: async (qty = 1) => {
    const orders = await ordersRepository.getAll()
    const drivers = (await usersRepository.getAll()).filter(u => u.role === USER_ROLES.DRIVER)
    const deliveries = mocksService.generateDeliveries(qty, orders, drivers)
    return deliveriesRepository.createMany(deliveries)
  }
}
