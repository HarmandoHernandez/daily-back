const mongoose = require('mongoose')

const { MONGO_DB_URI } = process.env

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI)
    console.warn('Database Connected')
  } catch (error) {
    console.error(error)
    throw new Error('Error a la hora de inicializad Base de Datos.')
  }
}

module.exports = {
  dbConnection
}
