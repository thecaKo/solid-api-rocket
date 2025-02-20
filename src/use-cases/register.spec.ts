import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { UserAlredyExistsError } from "./errors/user-alredy-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should register a new user", async () => {
    const { user } = await sut.execute({
      name: "Fulano",
      email: "Fulano@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "Fulano",
      email: "Fulano@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    await sut.execute({
      name: "Fulano",
      email: "Fulano@gmail.com",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "Fulano",
        email: "Fulano@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlredyExistsError);
  });
});
