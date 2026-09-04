import { expect } from 'chai'
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'
import { config } from '../config/env.config.js'

describe('Products API', () => {
  before(async () => {
    await mongoose.connect(config.mongoUri)
  })

  beforeEach(async () => {
    await mongoose.connection.collection('products').deleteMany({})
  })

  after(async () => {
    await mongoose.connection.close()
  })

  it('GET /api/products debe devolver lista de productos', async () => {
    const res = await request(app).get('/api/products')
    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('status', 'success')
    expect(res.body.payload).to.be.an('array')
  })

  it('GET /api/products/:id con ID inexistente debe devolver 404', async () => {
    const fakeId = new mongoose.Types.ObjectId() // ID válido pero no existente
    const res = await request(app).get(`/api/products/${fakeId}`)
    expect(res.status).to.equal(404)
    expect(res.body).to.have.property('status', 'error')
    expect(res.body).to.have.property('message')
  })
})
