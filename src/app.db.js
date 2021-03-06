// @ts-check
const mongoose = require('mongoose')

const MONGO_DB_URI = process.env.MONGO_DB_URI

class Database {
  /**
   * Try connection with Mongo DataBase
   */
  async connect () {
    try {
      await mongoose.connect(MONGO_DB_URI)
      console.warn('DATABASE: CONNECTED')
    } catch (error) {
      console.error(error)
      throw new Error('DATABASE: ERROR')
    }
  }
}

module.exports = Database
