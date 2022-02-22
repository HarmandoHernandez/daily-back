require('dotenv').config()
const Server = require('./app.server')
const Route = require('./shared/models/route.model')
const Database = require('./app.db')

// Params
const port = process.env.PORT
const database = new Database()
const router = [
  new Route('/api/auth', require('./auth/auth.router'))
]

// Create server
const server = new Server(port, router, database)
server.active()
