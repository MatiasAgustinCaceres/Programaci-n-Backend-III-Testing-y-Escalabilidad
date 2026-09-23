import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { config } from '../config/env.config.js'

// Cargar variables de entorno de test
dotenv.config({ path: '.env.test' })

const MONGO_URI = process.env.MONGO_URI || config.mongoUri || 'mongodb://127.0.0.1:27017/shipnow_test'

before(async function () {
  this.timeout(15000)
  if (mongoose.connection.readyState === 0) {
    console.log(' Conectando a MongoDB Test:', MONGO_URI)
    await mongoose.connect(MONGO_URI)
  }
})

after(async function () {
  this.timeout(10000)
  if (mongoose.connection.readyState !== 0) {
    console.log(' Cerrando conexión global de MongoDB...')
    await mongoose.connection.close()
  }
})