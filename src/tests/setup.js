import dotenv from 'dotenv'
import mongoose from 'mongoose'

// 1. Cargar las variables de entorno de test PRIMERO
dotenv.config({ path: '.env.test' })

// 2. Importar la configuración DESPUÉS de haber cargado el .env.test
import { config } from '../config/env.config.js'

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