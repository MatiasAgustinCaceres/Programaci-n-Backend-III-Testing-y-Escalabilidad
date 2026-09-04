export const errorDictionary = {
  USER_NOT_FOUND: {
    name: 'USER_NOT_FOUND',
    message: 'Usuario no encontrado',
    statusCode: 404
  },
  PRODUCT_NOT_FOUND: {
    name: 'PRODUCT_NOT_FOUND',
    message: 'Producto no encontrado',
    statusCode: 404
  },
  ORDER_NOT_FOUND: {
    name: 'ORDER_NOT_FOUND',
    message: 'Orden no encontrada',
    statusCode: 404
  },
  DELIVERY_NOT_FOUND: {
    name: 'DELIVERY_NOT_FOUND',
    message: 'Entrega no encontrada',
    statusCode: 404
  },
  INVALID_STATUS: {
    name: 'INVALID_STATUS',
    message: 'Estado inválido',
    statusCode: 400
  },
  INVALID_QTY: {
    name: 'INVALID_QTY',
    message: 'Cantidad inválida',
    statusCode: 400
  },
  FILE_REQUIRED: {
    name: 'FILE_REQUIRED',
    message: 'Se requiere un archivo',
    statusCode: 400
  },
  INVALID_TYPE: {
    name: 'INVALID_TYPE',
    message: 'Tipo de archivo inválido',
    statusCode: 400
  },
  DB_ERROR: {
    name: 'DB_ERROR',
    message: 'Error al interactuar con la base de datos',
    statusCode: 500
  }
}