import { FastifyInstance } from 'fastify'
import { login } from '../../controller/users/verifyLogin'

const endpoint: string = '/login'

export async function Login(app: FastifyInstance) {
  app.post(endpoint, login)
}
