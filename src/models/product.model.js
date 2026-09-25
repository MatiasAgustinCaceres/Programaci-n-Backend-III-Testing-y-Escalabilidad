import mongoose from 'mongoose'
import { PRODUCT_STATUS } from '../constants/index.js'

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reference: { type: String, required: true }
}, { _id: false })

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: Object.values(PRODUCT_STATUS), default: PRODUCT_STATUS.AVAILABLE },
  documents: { type: [documentSchema], default: [] }
})

export default mongoose.model('Product', productSchema)