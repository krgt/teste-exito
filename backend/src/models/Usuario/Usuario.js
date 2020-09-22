const { query } = require('../../connectors/mysql')
const queries = require('./queries')

class Usuario {
  static getAll() { return query(queries.joinAllUsuariosClientes()) }
  static create(fields) { return query(queries.insertUsuario(fields)) }
}

module.exports = Usuario