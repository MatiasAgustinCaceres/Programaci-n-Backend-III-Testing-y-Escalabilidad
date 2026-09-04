import logger from '../config/logger.js'

export const errorHandler = (err, req, res, next) => {
  let status = 500
  if (err && typeof err.statusCode !== 'undefined') {
    const code = Number(err.statusCode)
    if (!isNaN(code) && code >= 100 && code < 600) {
      status = code
    }
  }

  logger.error(`${status} - ${err.name || 'Error'} - ${err.message || 'Error interno'} - ${req.method} ${req.originalUrl}`)

  return res.status(status).json({
    status: 'error',
    message: err.message || 'Ocurrió un error inesperado',
    name: err.name || 'INTERNAL_SERVER_ERROR',
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  })
}
