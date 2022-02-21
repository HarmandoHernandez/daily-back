require('dotenv').config()
const Server = require('./app.server')
const Route = require('./shared/models/route.model')

// Params
const port = process.env.PORT
const router = [
  new Route('/api/auth', require('./auth/auth.router'))
]

// Create server
const server = new Server(port, router)
server.active()
