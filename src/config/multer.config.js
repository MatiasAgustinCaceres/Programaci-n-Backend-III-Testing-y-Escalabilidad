import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Carpeta base de uploads
const UPLOADS_BASE = path.resolve('uploads')

// Aseguramos que existan las subcarpetas
const ensureFolder = (folder) => {
  const fullPath = path.join(UPLOADS_BASE, folder)
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true })
  }
  return fullPath
}

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Subcarpeta según tipo de documento
    let folder = 'general'
    if (req.body.docType === 'user_document') folder = 'users'
    if (req.body.docType === 'delivery_proof') folder = 'deliveries'
    if (req.body.docType === 'order_invoice') folder = 'orders'

    const fullPath = ensureFolder(folder)
    cb(null, fullPath)
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname
    cb(null, uniqueName)
  }
})

// Validaciones de tipo de archivo
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'application/pdf']
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('INVALID_TYPE'), false)
  }
  cb(null, true)
}

// Configuración final de Multer
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
})