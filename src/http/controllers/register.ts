import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlredyExistsError } from "@/use-cases/errors/user-alredy-exists-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUserRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);
    await registerUseCase.execute({ name, email, password });
  } catch (err) {
    if (err instanceof UserAlredyExistsError) {
      return reply.status(409).send();
    }
    throw err;
  }

  return reply.status(201).send();
}
