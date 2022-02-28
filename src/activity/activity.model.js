// @ts-check

// Definicion de esquemas
const { Schema, model } = require('mongoose')

const activitySchema = new Schema({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  durationTime: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

// Configurar el formato de respuesta
activitySchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.user
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Definicion de modelos (Collection) con referencia al esquema
const Activity = model('Activity', activitySchema)

module.exports = Activity
