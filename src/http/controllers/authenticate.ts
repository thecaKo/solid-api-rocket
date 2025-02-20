import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { InvalidCredentials } from "@/use-cases/errors/invalid-credentials-error";
import { AuthenticateUseCase } from "@/use-cases/authenticate";

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
    const prismaUsersRepository = new PrismaUserRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);
    await authenticateUseCase.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentials) {
      return reply.status(400).send();
    }
    throw err;
  }

  return reply.status(200).send();
}
