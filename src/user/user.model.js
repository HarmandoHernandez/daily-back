// @ts-check
const { Schema, model } = require('mongoose')

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  activities: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity',
    default: [],
    required: false
  }]
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Definicion de modelos (Collection) con referencia al esquema
module.exports = model('User', userSchema)
