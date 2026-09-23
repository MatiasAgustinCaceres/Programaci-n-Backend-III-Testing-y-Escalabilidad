import { expect } from 'chai'
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'

describe('Deliveries API', () => {
  beforeEach(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.collection('deliveries').deleteMany({})
    }
  })

  it('PUT /api/deliveries/:id/status debe actualizar status válido', async () => {
    const orderId = new mongoose.Types.ObjectId()
    const driverId = new mongoose.Types.ObjectId()

    const created = await request(app)
      .post('/api/deliveries')
      .send({ orderId, driverId, status: 'pendiente' })

    const res = await request(app)
      .put(`/api/deliveries/${created.body.payload._id}/status`)
      .send({ status: 'entregado' })

    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('status', 'success')
    expect(res.body.payload).to.have.property('status', 'entregado')
  })

  it('PUT /api/deliveries/:id/status con status inválido debe devolver 400', async () => {
    const orderId = new mongoose.Types.ObjectId()
    const driverId = new mongoose.Types.ObjectId()

    const created = await request(app)
      .post('/api/deliveries')
      .send({ orderId, driverId, status: 'pendiente' })

    const res = await request(app)
      .put(`/api/deliveries/${created.body.payload._id}/status`)
      .send({ status: 'invalido' })

    expect(res.status).to.equal(400)
    expect(res.body).to.have.property('status', 'error')
  })
})