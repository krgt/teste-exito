const { query } = require('../../connectors/mysql')
const { ValidationError } = require('../../exceptions')

class Model {
  static _fieldValidators = {}

  static async create(fields) {
    this.validateFields(fields)
    const res = await query(this._queries.insert(fields))

    if (!res || !res.insertId)
      throw this._errorMsg

    return res.insertId
  }

  static validateFields(fieldValues) {
    if (this._fieldValidators)
    Object.keys(fieldValues).forEach( key => {
      const value = fieldValues[key] 
      const validator = this._fieldValidators[key]

      if (!value || !validator)
        return
      if (!validator.validate(value))
        throw new ValidationError(validator.errorMsg)
    })
  }
}

module.exports = Model