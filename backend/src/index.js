require('dotenv').config()
const express = require('express')
const routers = require('./routers')
const models = require('./models')
const app = express()
const config = require('./config')

app.use(express.json())
app.use(routers.usuarioRouter)

app.listen(config.webServer.port, () => {
  console.log('Servidor rodando na porta ' + config.webServer.port)
})