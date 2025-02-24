import { CheckInRepository } from "@/repositories/check-in-repository";
import { CheckIn } from "@prisma/client";

interface CheckInUseCaseRequest {
  gymId: string;
  userId: string;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}
  async execute({
    gymId,
    userId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkOnSameDay) {
      throw new Error();
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
