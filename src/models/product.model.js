import mongoose from 'mongoose'
import { PRODUCT_STATUS } from '../constants/index.js'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: Object.values(PRODUCT_STATUS), default: PRODUCT_STATUS.AVAILABLE }
})

export default mongoose.model('Product', productSchema)
