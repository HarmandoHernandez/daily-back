const mongoose = require('mongoose')

const MONGO_DB_URI = process.env.MONGO_DB_URI

const connect = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI)
    console.warn('Database Connected')
  } catch (error) {
    console.error(error)
    throw new Error('Fatal error to connecting Database!')
  }
}

module.exports = {
  connect
}