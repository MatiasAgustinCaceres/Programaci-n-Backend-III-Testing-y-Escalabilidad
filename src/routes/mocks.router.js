import { Router } from 'express'
import { 
  getMockUsers, seedMockUsers, 
  getMockProducts, seedMockProducts,
  getMockOrders, seedMockOrders,
  getMockDeliveries, seedMockDeliveries
} from '../controllers/mocks.controller.js'

const router = Router()

// Users
router.get('/users', getMockUsers)
router.post('/seed/users', seedMockUsers)

// Products
router.get('/products', getMockProducts)
router.post('/seed/products', seedMockProducts)

// Orders
router.get('/orders', getMockOrders)
router.post('/seed/orders', seedMockOrders)

// Deliveries
router.get('/deliveries', getMockDeliveries)
router.post('/seed/deliveries', seedMockDeliveries)

export default router
