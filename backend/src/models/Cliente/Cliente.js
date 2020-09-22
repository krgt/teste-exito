const { query } = require('../../connectors/mysql')
const queries = require('./queries')

class Usuario {
  static create(fields) { return query(queries.insertCliente(fields)) }
}

module.exports = Usuario