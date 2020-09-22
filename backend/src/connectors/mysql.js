const config = require('../config')
const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit : 10,
  ...config.database
})

module.exports = {
  pool
}