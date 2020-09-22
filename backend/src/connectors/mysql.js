const config = require('../config')
const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit : 10,
  ...config.database
})

const query = (queryString) => new Promise( (resolve, reject) =>
  pool.query(queryString,
    (error, results, fields) => {
      if (error) reject(error)
      resolve(results)
  })
)

const startTransaction = () => query('START TRANSACTION;')
const commit = () => query('COMMIT;')
const rollback = () => query('ROLLBACK;')

module.exports = {
  query,
  startTransaction,
  commit,
  rollback
}