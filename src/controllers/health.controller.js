export const healthController = (req, res) => {
  res.json({
    status: 'ok',
    env: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
}
