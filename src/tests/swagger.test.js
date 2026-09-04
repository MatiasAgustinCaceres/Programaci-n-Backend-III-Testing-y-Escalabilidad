import { expect } from 'chai'
import request from 'supertest'
import app from '../app.js'

describe('Swagger Docs', () => {
  it('GET /api/docs/ debe responder 200', async () => {
    const res = await request(app).get('/api/docs/')
    expect(res.status).to.equal(200)
    expect(res.text).to.include('Swagger UI')
  })
})
