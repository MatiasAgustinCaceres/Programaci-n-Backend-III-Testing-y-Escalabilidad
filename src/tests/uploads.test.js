import dotenv from 'dotenv'
import { expect } from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose'
import path from 'path'
import app from '../app.js'

// Cargar variables de entorno desde .env.test
dotenv.config({ path: '.env.test' })

const requester = supertest(app)

describe('Uploads de archivos', function () {
  this.timeout(10000)

  before(async () => {
    console.log('MONGO_URI:', process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI)
  })

  after(async () => {
    await mongoose.connection.close()
  })

  // ---------- USERS ----------
  describe('POST /api/users/:id/documents', () => {
    let userId

    before(async () => {
      const res = await requester.post('/api/users').send({
        name: 'Test User',
        email: `testuser_${Date.now()}@example.com`
      })
      userId = res.body.payload._id
    })

    it('Carga correcta de documento → 200', async () => {
      const res = await requester
        .post(`/api/users/${userId}/documents`)
        .field('docType', 'dni')
        .attach('file', path.resolve('src/tests/resources/test.pdf'))
      expect(res.status).to.equal(200)
      expect(res.body.payload).to.have.property('originalName')
    })

    it('Falta archivo → 400', async () => {
      const res = await requester
        .post(`/api/users/${userId}/documents`)
        .field('docType', 'dni')
      expect(res.status).to.equal(400)
    })

    it('Usuario inexistente → 404', async () => {
      const fakeId = new mongoose.Types.ObjectId()
      const res = await requester
        .post(`/api/users/${fakeId}/documents`)
        .field('docType', 'dni')
        .attach('file', path.resolve('src/tests/resources/test.pdf'))
      expect(res.status).to.equal(404)
    })
  })

  // ---------- DELIVERIES ----------
  describe('POST /api/deliveries/:id/proof', () => {
    let deliveryId

    before(async () => {
      const res = await requester.post('/api/deliveries').send({
        orderId: new mongoose.Types.ObjectId(),
        driverId: new mongoose.Types.ObjectId(),
        status: 'pendiente'
      })
      deliveryId = res.body.payload._id
    })

    it('Carga correcta de comprobante → 200', async () => {
      const res = await requester
        .post(`/api/deliveries/${deliveryId}/proof`)
        .field('docType', 'comprobante_entrega')
        .attach('file', path.resolve('src/tests/resources/test.png'))
      expect(res.status).to.equal(200)
      expect(res.body.payload).to.have.property('mimeType')
    })

    it('Falta archivo → 400', async () => {
      const res = await requester
        .post(`/api/deliveries/${deliveryId}/proof`)
        .field('docType', 'comprobante_entrega')
      expect(res.status).to.equal(400)
    })

    it('Entrega inexistente → 404', async () => {
      const fakeId = new mongoose.Types.ObjectId()
      const res = await requester
        .post(`/api/deliveries/${fakeId}/proof`)
        .field('docType', 'comprobante_entrega')
        .attach('file', path.resolve('src/tests/resources/test.png'))
      expect(res.status).to.equal(404)
    })
  })

  // ---------- ORDERS ----------
  describe('POST /api/orders/:id/invoice', () => {
    let orderId

    before(async () => {
      const res = await requester.post('/api/orders').send({
        customerId: new mongoose.Types.ObjectId(),
        productId: new mongoose.Types.ObjectId(),
        status: 'created',
        quantity: 1,
        totalPrice: 100
      })
      orderId = res.body.payload?._id
    })

    it('Falta archivo → 400', async () => {
      const res = await requester
        .post(`/api/orders/${orderId}/invoice`)
        .field('docType', 'factura')
      expect(res.status).to.equal(400)
    })

    it('Pedido inexistente → 404', async () => {
      const fakeId = new mongoose.Types.ObjectId()
      const res = await requester
        .post(`/api/orders/${fakeId}/invoice`)
        .field('docType', 'factura')
        .attach('file', path.resolve('src/tests/resources/test.pdf'))
      expect(res.status).to.equal(404)
    })
  })
})