import mongoose from 'mongoose'
import { ORDER_STATUS } from '../constants/index.js'

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  status: { type: String, enum: Object.values(ORDER_STATUS), default: ORDER_STATUS.CREATED },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Order', orderSchema)