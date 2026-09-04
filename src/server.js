import mongoose from 'mongoose'
import app from './app.js'
import { config } from './config/env.config.js'
import logger from './config/logger.js'

// Conexión a MongoDB y levantamiento del servidor
mongoose.connect(config.mongoUri)
  .then(() => {
    logger.info('Conexión a MongoDB establecida')
    app.listen(config.port, () => {
      logger.info(`Servidor ShipNow escuchando en puerto ${config.port} en modo ${config.nodeEnv}`)
    })
  })
  .catch(err => {
    logger.fatal(`Error al conectar con MongoDB: ${err.message}`)
  })
