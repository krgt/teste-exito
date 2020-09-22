const express = require('express')
const HttpCodes = require('http-status-codes')
const { Usuario, Cliente } = require('../models')

const router = new express.Router()

// router.get('/usuarios', async (req, res) => {
//   try {
//     const usuarios = await Usuario.getAll()
//     res.status(HttpCodes.OK).json(usuarios)
//   } catch (e) {
//     console.error(e)
//     res.status(HttpCodes.BAD_REQUEST).send()
//   }
// })

// router.post('/usuario', async (req, res) => {
//   try {
//     const document = await ged.fetchDocument(req.query.codigo)
//     res.status(HttpCodes.OK).json({ success: true, data: document })
//   } catch (e) {
//     console.error(e)
//     res.status(HttpCodes.BAD_REQUEST).send()
//   }
// })

module.exports = router