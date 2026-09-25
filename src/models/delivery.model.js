import mongoose from 'mongoose'
import { DELIVERY_PRIORITY } from '../constants/index.js'

const DELIVERY_STATUS = {
  PENDING: 'pendiente',
  IN_PROGRESS: 'en_proceso',
  DELIVERED: 'entregado'
}

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reference: { type: String, required: true }
}, { _id: false })

const deliverySchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  priority: { 
    type: String, 
    enum: Object.values(DELIVERY_PRIORITY), 
    default: DELIVERY_PRIORITY.NORMAL 
  },
  status: { 
    type: String, 
    enum: Object.values(DELIVERY_STATUS), 
    default: DELIVERY_STATUS.PENDING 
  },
  documents: { type: [documentSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Delivery', deliverySchema)
export { DELIVERY_STATUS }