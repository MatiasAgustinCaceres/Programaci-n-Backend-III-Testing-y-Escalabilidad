import { Router } from 'express'
import { getDeliveries, createDelivery, updateDeliveryStatus } from '../controllers/deliveries.controller.js'
import { upload } from '../config/multer.config.js'
import { uploadDeliveryProof } from '../controllers/deliveryProofs.controller.js'

const router = Router()

// Endpoints existentes
router.get('/', getDeliveries)
router.post('/', createDelivery)
router.put('/:id/status', updateDeliveryStatus)

// Nuevo endpoint: carga de comprobantes de entrega
// Campo esperado: "file" en multipart/form-data
// Campo adicional: "docType" en el body
router.post('/:id/proof', upload.single('file'), uploadDeliveryProof)

export default router
