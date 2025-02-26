import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";

let gymRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymRepository);
  });

  it("should register a new gym", async () => {
    const { gym } = await sut.execute({
      title: "Gym Dahora",
      description: null,
      phone: null,
      latitude: -27.0,
      longitude: -49.2222222,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
