const { PrismaClient } = require('@prisma/client')
const { z } = require('zod')

const prisma = new PrismaClient()

const payloadSchema = z.object({
  username: z.string().min(4).max(24),
  password: z.string().min(1).max(24),
  confirmPassword: z.string().min(1).max(24),
  email: z.string().email(),
})

async function create(req, res) {
  try {
    const payload = payloadSchema.parse(req.body)

    const userExist = await prisma.user.findUnique({
      where: {
        email: payload.email
      }
    })

    if(userExist) {
      return res.status(409).send({
        message: "User already exists."
      })
    }

    if(payload.password !== payload.confirmPassword) {
      return res.status(402).send({
        message: "Please make sure that the passwords are the same."
      })
    }

    // Hash password logic here

    const userCreated = await prisma.user.create({
      data: {
        username: payload.username,
        email: payload.email,
        password: payload.password
      }
    })

    return res.status(201).send({
      message: "User created successfully.",
      user: userCreated
    })

  } catch(error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({
        message: error.issues[0].message
      })
    }

    return res.status(400).send({
      message: error.message
    })
  }
}

module.exports = { create }
