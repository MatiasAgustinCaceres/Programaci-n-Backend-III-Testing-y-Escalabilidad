import winston from 'winston'
import path from 'path'
import 'winston-daily-rotate-file'

// Definición de niveles personalizados
const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal: 'bold red',
    error: 'red',
    warning: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue'
  }
}

// Formato base de log
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}] ${message}`
  })
)

// Transportes
const transports = [
  // Consola
  new winston.transports.Console({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}] ${message}`
      })
    )
  }),

  // Archivo de errores
  new winston.transports.DailyRotateFile({
    filename: path.join('logs', 'error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    maxFiles: '14d',
    zippedArchive: true,
    format: logFormat
  }),

  // Archivo combinado
  new winston.transports.DailyRotateFile({
    filename: path.join('logs', 'combined-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    level: 'info',
    maxFiles: '14d',
    zippedArchive: true,
    format: logFormat
  })
]

// Creación del logger
const logger = winston.createLogger({
  levels: customLevels.levels,
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  transports
})

// Aplicar colores personalizados
winston.addColors(customLevels.colors)

export default logger
