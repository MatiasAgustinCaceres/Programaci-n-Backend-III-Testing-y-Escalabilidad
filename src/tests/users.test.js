import { expect } from 'chai'
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'

describe('Users API', () => {
  beforeEach(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.collection('users').deleteMany({})
    }
  })

  it('GET /api/users debe devolver lista de usuarios', async () => {
    const res = await request(app).get('/api/users')
    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('status', 'success')

    const users = Array.isArray(res.body.payload)
      ? res.body.payload
      : res.body.payload.docs

    expect(users).to.be.an('array')
  })

  it('GET /api/users/:id con ID inexistente debe devolver 404', async () => {
    const fakeId = new mongoose.Types.ObjectId()
    const res = await request(app).get(`/api/users/${fakeId}`)
    expect(res.status).to.equal(404)
    expect(res.body).to.have.property('status', 'error')
    expect(res.body).to.have.property('message')
  })
})