import express from 'express'
import usersRouter from './routes/users.router.js'
import ordersRouter from './routes/orders.router.js'
import deliveriesRouter from './routes/deliveries.router.js'
import productsRouter from './routes/products.router.js'
import mocksRouter from './routes/mocks.router.js'
import loggerRouter from './routes/logger.router.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { swaggerUi, swaggerSpecs } from './config/swagger.config.js'
import healthRouter from './routes/health.router.js'

const app = express()
app.use(express.json())

// Rutas principales
app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/deliveries', deliveriesRouter)
app.use('/api/products', productsRouter)
app.use('/api/mocks', mocksRouter)
app.use('/api/logger', loggerRouter)

// Documentación Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

// Endpoint de health check
app.use('/api/health', healthRouter)


// Middleware global de errores SIEMPRE al final
app.use(errorHandler)

export default app
