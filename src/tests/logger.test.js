import { expect } from 'chai'
import request from 'supertest'
import app from '../app.js'

describe('Logger API', () => {
  it('GET /api/logger/test debe responder correctamente', async () => {
    const res = await request(app).get('/api/logger/test')
    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('status', 'success')
    expect(res.body).to.have.property('message', 'Logs generados en todos los niveles')
  })
})
