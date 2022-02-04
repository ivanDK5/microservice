const Schema =require('validate')
const User = new Schema({
    user: {
    type: String,
    required:true,
    },
    pass: {
    type: String,
    required:true
    },
    salt:{
      type:String,
    },
    hash:{
      type:String
    },
    nombre: {
    type: String
    },
    ultimo_inicio_sesion: {
    type: Date
    },
    tipo: {
    type: String,
    enum: ["desarrollo", "implementacion", "administrador", "usuario"]
    },
    maximo_tiempo_sesion_inactiva: {
    type: Number,
    size: {
    length: 2
    }
  }
  })

  module.exports=User


