const { PrismaClient } = require('@prisma/client')
const { z } = require('zod')

const prisma = new PrismaClient()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(24),
})

async function login(req, res) {
  try {
    const payload = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email
      }
    })

    if (!user || user.password !== payload.password) {
      return res.status(401).send({
        message: "Invalid email or password."
      })
    }

    return res.status(200).send({
      message: "Login successful.",
      user
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

module.exports = { login }
