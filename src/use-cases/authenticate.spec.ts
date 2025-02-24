import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentials } from "./errors/invalid-credentials-error";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Fulano",
      email: "Fulano@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "Fulano@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "Fulano@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "Fulano",
      email: "Fulano@gmail.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "Fulano@gmail.com",
        password: "12345678",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials);
  });
});
