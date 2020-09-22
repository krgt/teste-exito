const express = require('express')
const HttpCodes = require('http-status-codes')
const { Usuario, Cliente } = require('../models')
const { startTransaction, commit, rollback } = require('../connectors/mysql')
const { ValidationError } = require('../exceptions')

const router = new express.Router()

router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.getAll()
    res.status(HttpCodes.OK).json(usuarios)
  } catch (e) {
    console.error(e)
    res.status(HttpCodes.BAD_REQUEST).send()
  }
})

router.post('/usuario', async (req, res) => {
  try {
    const usuario = await
      startTransaction()
        .then( () => Cliente.create(req.body.cliente) )
        .then( cliente_id => Usuario.create({ cliente_id, ...req.body.usuario }) )
        .then( usuario_id => Usuario.findById(usuario_id) )
    commit()
    res.status(HttpCodes.OK).json(usuario)
  } catch (err) {
    let response = {}
    if (err instanceof ValidationError)
      response.msg = err.message
    
    rollback()
    console.error(err.message)
    res.status(HttpCodes.BAD_REQUEST).send(response)
  }
})

module.exports = router