// External libraries
import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
// Internal utilities
import { RegisterService } from "@/services/register-service";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";

describe("Register Service", () => {
  it("should successfully register a new user", async () => {
    const mockRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(mockRepository);

    const { user } = await registerService.register({
      name: "Usuário Vitest",
      email: "test@vitest.com",
      password: "toBeHashed123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash password upon registration", async () => {
    const mockRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(mockRepository);

    const { user } = await registerService.register({
      name: "Usuário Vitest",
      email: "test@vitest.com",
      password: "toBeHashed123",
    });

    const isHashedCorrectly = await compare(
      "toBeHashed123",
      user.password_hash
    );

    expect(isHashedCorrectly).toBe(true);
  });

  it("should prevent duplicate email registration", async () => {
    const mockRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(mockRepository);

    const email = "test@vitest.com";

    await registerService.register({
      name: "Usuário Vitest",
      email,
      password: "87654321",
    });

    await expect(() =>
      registerService.register({
        name: "Usuário Vitest",
        email,
        password: "12345678",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
