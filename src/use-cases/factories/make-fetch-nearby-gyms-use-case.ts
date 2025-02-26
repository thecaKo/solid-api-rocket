import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbyUseCase } from "../fetch-nearby-gyms";
export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymRepository();
  const useCase = new FetchNearbyUseCase(gymsRepository);
  return useCase;
}
