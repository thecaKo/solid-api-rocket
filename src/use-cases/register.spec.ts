import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, describe, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { UserAlredyExistsError } from "./errors/user-alredy-exists-error";

describe("Register Use Case", () => {
  it("should register a new user", async () => {
    const userRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(userRepository);

    const { user } = await registerUseCase.execute({
      name: "Fulano",
      email: "Fulano@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const userRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(userRepository);

    const { user } = await registerUseCase.execute({
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
    const userRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(userRepository);

    await registerUseCase.execute({
      name: "Fulano",
      email: "Fulano@gmail.com",
      password: "123456",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "Fulano",
        email: "Fulano@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlredyExistsError);
  });
});
