// Definicion de esquemas
const { Schema, model } = require('mongoose')

const activitySchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

// Configurar el formato de respuesta
activitySchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Definicion de modelos (Collection) con referencia al esquema
const Activity = model('Activity', activitySchema)

module.exports = Activity
