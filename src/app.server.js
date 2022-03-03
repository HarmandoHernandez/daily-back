// @ts-check
const express = require('express')
const cors = require('cors')
const path = require('path')
// eslint-disable-next-line no-unused-vars
const Route = require('./shared/models/route.model')
// eslint-disable-next-line no-unused-vars
const Database = require('./app.db')

class Server {
  /**
   * Create instance of server
   * @param {string} port
   * @param {Route[]} router
   * @param {Database} database
   */
  constructor (port, router, database) {
    this.app = express()
    this.port = port
    this.router = router
    this.database = database
    this.connectDB()
    this.middlewares()
    this.publicView()
  }

  async connectDB () {
    await this.database.connect()
  }

  middlewares () {
    this.app.use(cors())
    this.app.use(express.json())
    // Routes
    this.router.forEach(route => {
      this.app.use(route.path, route.routes)
    })
  }

  /**
   * Start server listening
   */
  active () {
    this.app.listen(this.port, () => {
      console.log('Server listening:', this.port)
    })
  }

  publicView () {
    // Public directory with statics
    this.app.use(express.static('public'))
    // Acces to frontend routes without #
    this.app.get('*', (_, res) => {
      res.sendFile(path.resolve(__dirname, './../public/index.html'))
    })
  }
}

module.exports = Server
