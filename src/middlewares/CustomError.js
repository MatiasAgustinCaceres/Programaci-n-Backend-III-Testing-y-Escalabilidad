export default class CustomError extends Error {
  constructor(message, statusCode, name = 'CustomError') {
    super(message)
    this.name = name
    this.statusCode = Number(statusCode) // fuerza a número
  }

  static createError({ name = 'Error', message, statusCode = 500 }) {
    return new CustomError(message, statusCode, name) // ✅ orden correcto
  }
}