import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/check-ins-repository";
import { CheckInUseCase } from "./check-in";

let checkInRepository: InMemoryCheckInRepository;
let sut: CheckInUseCase;

describe("Check In Use Case", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository();
    sut = new CheckInUseCase(checkInRepository);
  });

  it("should be able to check in", async () => {
    const checkIn = await checkInRepository.create({
      gym_id: "gym-id-01",
      user_id: "user-id-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
