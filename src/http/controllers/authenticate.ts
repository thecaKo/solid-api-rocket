import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { InvalidCredentials } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    await authenticateUseCase.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentials) {
      return reply.status(400).send();
    }
    throw err;
  }

  return reply.status(200).send();
}
