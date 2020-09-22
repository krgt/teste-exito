require('dotenv').config()
const express = require('express')
const routers = require('./routers')
const models = require('./models')
const app = express()
const config = require('./config')
const { startTransaction, commit, rollback } = require('./connectors/mysql')

startTransaction().then( res => console.log(res))
models.Cliente.create({
  cnpj: '0',
  nome_fantasia: 'nme',
  razao_social: 'razao',
  cep: 'cep',
  endereco: 'endr',
  complemento: 'compl',
  bairro: 'bairr',
  cidade: 'cidade',
  uf: 'br'
})
  .then( res => {
    if (!res.insertId) throw 'Erro ao criar cliente.'

    models.Usuario.create({
      cliente_id: res.insertId,
      nome: 'pele',
      sobrenome: 'arantes',
      telefone: '222',
      email: 'pele@oi.com',
      senha: '1000'
    })

  })
  .catch( err => {
    rollback().then( res => console.log(res) )
    console.error(err)
  })

models.Usuario.getAll()
  .then(res => console.log('oe', res))

app.use(express.json())
app.use('/cliente', routers.clienteRouter)

app.listen(config.webServer.port, () => {
  console.log('Server is up on port ' + config.webServer.port)
})