import { expect } from 'chai'
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'
import { config } from '../config/env.config.js'

describe('Mocks API', () => {
  before(async () => {
    await mongoose.connect(config.mongoUri)
  })

  beforeEach(async () => {
    await mongoose.connection.collection('users').deleteMany({})
    await mongoose.connection.collection('orders').deleteMany({})
    await mongoose.connection.collection('products').deleteMany({})
    await mongoose.connection.collection('deliveries').deleteMany({})
  })

  after(async () => {
    await mongoose.connection.close()
  })

  it('GET /api/mocks/users debe devolver usuarios mock', async () => {
    const res = await request(app).get('/api/mocks/users?qty=1')
    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('status', 'success')
    expect(res.body.payload).to.be.an('array')
  })

  it('GET /api/mocks/orders con cantidad inválida debe devolver 400', async () => {
    const res = await request(app).get('/api/mocks/orders?qty=0')
    expect(res.status).to.equal(400)
    expect(res.body).to.have.property('status', 'error')
  })

  it('GET /api/mocks/products debe devolver productos mock', async () => {
    const res = await request(app).get('/api/mocks/products?qty=2')
    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('status', 'success')
    expect(res.body.payload).to.be.an('array')
  })

  it('GET /api/mocks/deliveries con cantidad inválida debe devolver 400', async () => {
    const res = await request(app).get('/api/mocks/deliveries?qty=0')
    expect(res.status).to.equal(400)
    expect(res.body).to.have.property('status', 'error')
  })
})
