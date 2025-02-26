import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymUseCase } from "../search-gym";
export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymRepository();
  const useCase = new SearchGymUseCase(gymsRepository);
  return useCase;
}
