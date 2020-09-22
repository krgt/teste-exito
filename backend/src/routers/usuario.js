const express = require('express')
const HttpCodes = require('http-status-codes')
const { Usuario, Cliente } = require('../models')
const { startTransaction, commit, rollback } = require('../connectors/mysql')

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
    const usuarioRes = await
      startTransaction()
        .then( () => Cliente.create(req.body.cliente) )
        .then( res => {
          if (!res || !res.insertId) throw "Erro ao criar cliente."
          return Usuario.create({ cliente_id: res.insertId, ...req.body.usuario })
        })
        .then( res => {
          if (!res || !res.insertId) throw "Erro ao criar usuario."
          commit()
          return res
        })

    const usuario = await Usuario.findById(usuarioRes.insertId)
    res.status(HttpCodes.OK).json(usuario)
  } catch (e) {
    console.error(e)
    rollback()
    res.status(HttpCodes.BAD_REQUEST).send()
  }
})

module.exports = router