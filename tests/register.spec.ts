// External libraries
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
// Internal utilities
import { RegisterService } from "@/services/register-service";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";

let mockRepository: InMemoryUsersRepository;
let sut: RegisterService;

describe("Register Service", () => {
  beforeEach(() => {
    mockRepository = new InMemoryUsersRepository();
    sut = new RegisterService(mockRepository);
  })
    
  it("should successfully register a new user", async () => {
    

    const { user } = await sut.register({
      name: "Usuário Vitest",
      email: "test@vitest.com",
      password: "toBeHashed123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash password upon registration", async () => {
    const { user } = await sut.register({
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
    const email = "test@vitest.com";

    await sut.register({
      name: "Usuário Vitest",
      email,
      password: "87654321",
    });

    await expect(() =>
      sut.register({
        name: "Usuário Vitest",
        email,
        password: "12345678",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
