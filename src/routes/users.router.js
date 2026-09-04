import { Router } from 'express'
import { getUsers, createUser, getUserById } from '../controllers/users.controller.js'
import { upload } from '../config/multer.config.js'
import { uploadUserDocument } from '../controllers/userDocuments.controller.js'

const router = Router()

// Endpoints existentes
router.get('/', getUsers)
router.post('/', createUser)
router.get('/:id', getUserById)

// Nuevo endpoint: carga de documentos de usuario
// Campo esperado: "file" en multipart/form-data
// Campo adicional: "docType" en el body
router.post('/:id/documents', upload.single('file'), uploadUserDocument)

export default router
