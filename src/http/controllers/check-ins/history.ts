import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";
import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-use-fetch-check-ins-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchCheckInHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await fetchCheckInHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  });

  return reply.status(200).send([checkIns]);
}
