import { expect } from 'chai'
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'

describe('Products API', () => {
  beforeEach(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.collection('products').deleteMany({})
    }
  })

  it('GET /api/products debe devolver lista de productos', async () => {
    const res = await request(app).get('/api/products')
    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('status', 'success')

    const products = Array.isArray(res.body.payload)
      ? res.body.payload
      : res.body.payload.docs

    expect(products).to.be.an('array')
  })

  it('GET /api/products/:id con ID inexistente debe devolver 404', async () => {
    const fakeId = new mongoose.Types.ObjectId()
    const res = await request(app).get(`/api/products/${fakeId}`)
    expect(res.status).to.equal(404)
    expect(res.body).to.have.property('status', 'error')
    expect(res.body).to.have.property('message')
  })
})