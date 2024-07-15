import fastify from 'fastify'
import { RegisterUsers } from './routes/login/registerUsers'
import { Login } from './routes/login/login'

const app = fastify()

app.register(RegisterUsers, { prefix: 'v1' })
app.register(Login, { prefix: 'v1', origin: 'http://192.168.0.109:4200' })

app.listen({
  host: '0.0.0.0',
  port: 3000
}, () => {
  console.log('HTTP Server Up')
})

