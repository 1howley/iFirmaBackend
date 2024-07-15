const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { create } = require('./controller/users/create')
const { login } = require('./controller/users/verifyLogin')

const app = express()

app.use(cors({ origin: '*' }))
app.use(bodyParser.json())

// Definir rotas
app.post('/v1/register', create)
app.post('/v1/login', login)

app.listen(3000, '0.0.0.0', () => {
  console.log('HTTP Server Up')
})
