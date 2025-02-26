import { CheckInRepository } from "@/repositories/check-in-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchUserHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserHistoryUseCase {
  constructor(private checkInRepository: CheckInRepository) {}
  async execute({
    userId,
    page,
  }: FetchUserHistoryUseCaseRequest): Promise<FetchUserHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(
      userId,
      page,
    );

    return { checkIns };
  }
}
