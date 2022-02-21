const express = require('express')
const cors = require('cors')
const path = require('path')

const { connect } = require('./app.db')

class Server {
  constructor (port, router) {
    this.app = express()
    this.port = port
    this.router = router
    this.connectDB()
    this.middlewares()
    this.publicView()
  }

  async connectDB () {
    await connect()
  }

  middlewares () {
    this.app.use(cors())
    this.app.use(express.json())
    // Public directory with statics
    this.app.use(express.static('public'))
    // Routes
    this.router.forEach(route => {
      this.app.use(route.path, route.routes)
    })
  }

  active () {
    this.app.listen(this.port, () => {
      console.log('Server listening:', this.port)
    })
  }

  // Acces to frontend routes without #
  publicView () {
    this.app.get('*', (_, res) => {
      res.sendFile(path.resolve(__dirname, './../public/index.html'))
    })
  }
}

module.exports = Server
