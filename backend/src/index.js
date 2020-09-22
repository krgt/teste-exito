require('dotenv').config()
const express = require('express')
const routers = require('./routers')
const app = express()
const config = require('./config')

app.use(express.json())
// app.use('/portal', routers.portalRouter)

app.listen(config.webServer.port, () => {
  console.log('Server is up on port ' + config.webServer.port)
})