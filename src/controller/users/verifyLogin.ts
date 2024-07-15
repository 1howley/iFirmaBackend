import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

const prisma = new PrismaClient();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(24),
});

export async function login(request: FastifyRequest, reply: FastifyReply) {
  try {
    const payload = loginSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      return reply.status(401).send({
        message: "Invalid email or password.",
      });
    }

    const isPasswordValid = payload.password == user.password

    if (!isPasswordValid) {
      return reply.status(401).send({
        message: "Invalid email or password.",
      });
    }

    // Supondo que você gere um token JWT ou algo similar
    // const token = generateToken(user);

    return reply.status(200).send({
      message: "Login successful.",
      // token: token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: error.issues[0].message,
      });
    }

    return reply.status(500).send({
      message: "Internal server error.",
    });
  }
}
