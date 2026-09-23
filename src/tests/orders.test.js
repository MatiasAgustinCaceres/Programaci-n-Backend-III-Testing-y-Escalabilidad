import { expect } from 'chai'
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'

describe('Orders API', () => {
  beforeEach(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.collection('orders').deleteMany({})
    }
  })

  it('POST /api/orders debe crear un pedido válido', async () => {
    const customerId = new mongoose.Types.ObjectId()
    const productId = new mongoose.Types.ObjectId()

    const res = await request(app)
      .post('/api/orders')
      .send({ customerId, productId, cantidad: 2 })

    expect(res.status).to.equal(201)
    expect(res.body).to.have.property('status', 'success')
    expect(res.body.payload).to.have.property('_id')
    expect(res.body.payload).to.have.property('customerId')
    expect(res.body.payload).to.have.property('productId')
  })

  it('GET /api/orders/:id con ID inexistente debe devolver 404', async () => {
    const fakeId = new mongoose.Types.ObjectId()
    const res = await request(app).get(`/api/orders/${fakeId}`)
    expect(res.status).to.equal(404)
    expect(res.body).to.have.property('status', 'error')
    expect(res.body).to.have.property('message')
  })
})