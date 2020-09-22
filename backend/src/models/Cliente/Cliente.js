const Model = require('../Model/Model')
const queries = require('./queries')
const validator = require('validator')
const { cnpj } = require('cpf-cnpj-validator')

class Cliente extends Model {
  static _queries = queries
  static _createError = "Erro ao criar cliente."
  static _fieldValidators = {
    cnpj: {
      validate: value => cnpj.isValid(value),
      errorMsg: "CNPJ inválido"
    },
    cep: {
      validate: value => /[0-9]{8}/.test(value),
      errorMsg: "CEP inválido."
    }
  }
}

module.exports = Cliente 