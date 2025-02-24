import { randomUUID } from "crypto";
import { CheckInRepository } from "../check-in-repository";
import { Prisma, CheckIn } from "@prisma/client";

export class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, data: Date) {
    const checkInOnSameDate = this.items.find(
      (checkIn) => checkIn.user_id === userId,
    );

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
