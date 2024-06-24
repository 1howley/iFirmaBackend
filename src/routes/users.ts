import { FastifyInstance } from 'fastify'

const endpoint: string = '/users'

export async function users(app: FastifyInstance) {
  app.get(endpoint, (request, reply) => {
    return reply.status(200).send({ "hello": "api" })
  })
}
