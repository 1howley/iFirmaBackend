import { FastifyInstance } from 'fastify'
import { create } from '../../controller/users/create'

const endpoint: string = '/register'

export async function RegisterUsers(app: FastifyInstance) {
  app.post(endpoint, create)
}
