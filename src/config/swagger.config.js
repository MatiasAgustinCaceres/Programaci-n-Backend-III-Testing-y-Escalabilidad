import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ShipNow API',
      version: '1.0.0',
      description: 'API backend para gestión de usuarios, pedidos, entregas, productos y mocks. Incluye logger de validación.',
    },
    servers: [
      { url: 'http://localhost:8080', description: 'Servidor local' }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            nombre: { type: 'string' },
            email: { type: 'string' },
            rol: { type: 'string' }
          }
        },
        Order: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            usuarioId: { type: 'string' },
            items: {
              type: 'array',
              items: { $ref: '#/components/schemas/Item' }
            },
            estado: {
              type: 'string',
              enum: ['pendiente', 'confirmado', 'enviado']
            }
          }
        },
        Delivery: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            pedidoId: { type: 'string' },
            estado: {
              type: 'string',
              enum: ['pendiente', 'en_proceso', 'entregado']
            }
          }
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            nombre: { type: 'string' },
            descripcion: { type: 'string' },
            precio: { type: 'number' },
            stock: { type: 'integer' }
          }
        },
        Item: {
          type: 'object',
          properties: {
            productoId: { type: 'string' },
            cantidad: { type: 'integer' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            message: { type: 'string', example: 'descripción del error' }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'success' },
            message: { type: 'string', example: 'operación realizada correctamente' }
          }
        }
      }
    }
  },
  apis: ['./src/docs/*.yaml']
}

export const swaggerSpecs = swaggerJsdoc(swaggerOptions)
export { swaggerUi }
