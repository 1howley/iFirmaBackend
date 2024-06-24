import fastify from 'fastify'
import { users } from './routes/users'

const app = fastify()

app.register(users, { prefix: 'v1' })

app.listen({
  host: '0.0.0.0',
  port: 3000
}, () => {
  console.log('HTTP Server Up')
})

