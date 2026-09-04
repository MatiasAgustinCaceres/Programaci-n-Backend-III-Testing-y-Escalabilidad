import dotenv from 'dotenv'

// Selecciona archivo según NODE_ENV
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
dotenv.config({ path: envFile })

// Variables críticas que deben existir
const requiredEnvVars = ['PORT', 'MONGODB_URI', 'JWT_SECRET', 'NODE_ENV']

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Falta configurar la variable de entorno: ${envVar}`)
  }
})

export const config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL || 'info',
  externalServiceUrl: process.env.EXTERNAL_SERVICE_URL || ''
}
