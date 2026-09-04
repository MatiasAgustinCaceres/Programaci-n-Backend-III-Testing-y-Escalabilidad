import { Router } from 'express'
import { getOrders, createOrder, getOrderById } from '../controllers/orders.controller.js'
import { upload } from '../config/multer.config.js'
import { uploadOrderInvoice } from '../controllers/orderInvoices.controller.js'

const router = Router()

// Endpoints existentes
router.get('/', getOrders)
router.post('/', createOrder)
router.get('/:id', getOrderById)

// Nuevo endpoint: carga de comprobantes/facturas de pedido
// Campo esperado: "file" en multipart/form-data
// Campo adicional: "docType" en el body
router.post('/:id/invoice', upload.single('file'), uploadOrderInvoice)

export default router
