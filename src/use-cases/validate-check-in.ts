import { CheckInRepository } from "@/repositories/check-in-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CheckIn } from "@prisma/client";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}
interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}
export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInRepository) {}
  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);
    if (!checkIn) {
      throw new ResourceNotFoundError();
    }
    checkIn.validated_at = new Date();
    await this.checkInsRepository.save(checkIn);
    return {
      checkIn,
    };
  }
}
