import { PrismaClient } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const prisma = new PrismaClient()

const payloadSchema = z.object({
  username: z.string().min(4).max(24),
  password: z.string().min(1).max(24),
  confirmPassword: z.string().min(1).max(24),
  email: z.string().email(),
})

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const payload = payloadSchema.parse(request.body)

    const userExist = await prisma.User.findUnique({
      where: {
        email: payload.email
      }
    })

    if(userExist) {
      return reply.status(409).send({
        message: "User already exist."
      })
    }

    if(payload.password != payload.confirmPassword) {
      return reply.status(402).send({
        message: "Please make sure that the passwords are the same."
      })
    }

    //hashpasword

    const userCreated = await prisma.user.create(payload)

    return reply.status(201).send({
      message: "User created successfully.",
      user: userCreated
    })

  } catch(error: unknown) {
    if(error instanceof z.ZodError) {
      return reply.status(400).send({
        message: error.issues[0].message
      })
    }
    //return global error
  }
}
