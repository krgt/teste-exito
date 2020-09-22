const Model = require('../Model/Model')
const { query } = require('../../connectors/mysql')
const queries = require('./queries')
const validator = require('validator')

class Usuario extends Model {
  static _queries = queries
  static _createError = "Erro ao criar usuario."
  static _fieldValidators = {
    email: {
      validate: value => validator.isEmail(value),
      errorMsg: "Email inválido."
    },
    telefone: {
      validate: value => /[0-9]{11,}/.test(value),
      errorMsg: "Telefone inválido."
    },
    senha: {
      validate: value => value.length >= 9,
      errorMsg: "Senha inválida."
    }
  }

  static getAll() { return query(queries.joinAllUsuariosClientes()) }

  static async findById(id) {
    const res = await query(queries.selectById(id))

    if (res.length < 1)
      throw "Usuario nao encontrado"

    return res[0]
  }
}

module.exports = Usuario