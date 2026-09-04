import { Router } from 'express'
import logger from '../config/logger.js'

const router = Router()

router.get('/test', (req, res) => {
  logger.debug('Mensaje de nivel DEBUG')
  logger.http('Mensaje de nivel HTTP')
  logger.info('Mensaje de nivel INFO')
  logger.warning('Mensaje de nivel WARNING')
  logger.error('Mensaje de nivel ERROR')
  logger.fatal('Mensaje de nivel FATAL')

  res.json({ status: 'success', message: 'Logs generados en todos los niveles' })
})

export default router
