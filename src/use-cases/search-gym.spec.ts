import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { SearchGymUseCase } from "./search-gym";

let gymRepository: InMemoryGymsRepository;
let sut: SearchGymUseCase;

describe("Search Gym Use Case", () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCase(gymRepository);
  });

  it("should be able to search an gym by title ", async () => {
    await gymRepository.create({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -27.9999999,
      longitude: -27.9999999,
    });

    await gymRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: -27.9999999,
      longitude: -27.9999999,
    });

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
    ]);
  });

  it("should be able to fetch paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      });
    }
    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 2,
    });
    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym 21" }),
      expect.objectContaining({ title: "JavaScript Gym 22" }),
    ]);
  });
});
