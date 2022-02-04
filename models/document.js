const Schema = require("validate");

const Document = new Schema({
  titulo: {
  type: String
  },
  documento: { //Documento texto plano en formato MD
  type: String
  },
  autor: {
  usuario: {
  type: String
  },
  nombre: {
  type: String
  }
  },
  modificado_por:{
  usuario: {
  type: String
  },
  nombre: {
  type: String
  }
  },
  fecha_creacion: { //Fecha del frente
  type: String
  },
  fecha_modificacion:{ //Fecha del frente
    type: String
    },
    historial_cambiios: [{
    documento: { //Documento texto plano en formato MD
    type: String
    },
    fecha: { //Fecha del frente
    type: String
    },
    fecha_server: { //Fecha del servidor
    type: Date
    },
    autor_cambio: {
    usuario: {
    type: String
    },
    nombre: {
    type: String
    }
    }
    }]
})

module.exports=Document