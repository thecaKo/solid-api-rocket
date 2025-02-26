import { CheckInRepository } from "@/repositories/check-in-repository";
import { CheckIn } from "@prisma/client";

interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number;
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}
  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
