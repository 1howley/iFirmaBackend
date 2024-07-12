import { FastifyInstance } from 'fastify'
import { create } from '../controller/users/create'

const endpoint: string = '/users'

export async function users(app: FastifyInstance) {
  app.post(endpoint, create)
}
