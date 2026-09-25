import mongoose from 'mongoose'

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reference: { type: String, required: true },
  originalName: { type: String } // Se agrega este campo para que Mongoose no lo elimine
}, { _id: true })

const userSchema = new mongoose.Schema({
  // ... resto de tus campos de usuario
  documents: {
    type: [documentSchema],
    default: []
  }
})

const User = mongoose.model('User', userSchema)
export default User