// External libraries
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
// Internal utilities
import { AuthenticateService } from "@/services/authenticate-service";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";

let mockRepository: InMemoryUsersRepository;
let sut: AuthenticateService;

describe("Authenticate Service", () => {
  beforeEach(() => {
    mockRepository = new InMemoryUsersRepository();
    sut = new AuthenticateService(mockRepository);
  })

  it("should successfully authenticate", async () => {
    await mockRepository.create({
      name: "Usuário Vitest",
      email: "test@vitest.com",
      password_hash: await hash("HashedPassword", 6),
    });

    const { user } = await sut.authenticate({
      email: "test@vitest.com",
      password: "HashedPassword",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should reject authentication with an invalid email", async () => {
    await expect(() =>
      sut.authenticate({
        email: "test@vitest.com",
        password: "HashedPassword",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should reject authentication with an incorrect password", async () => {
    await mockRepository.create({
      name: "Usuário Vitest",
      email: "test@vitest.com",
      password_hash: await hash("RightPassword", 6),
    });

    await expect(() =>
      sut.authenticate({
        email: "test@vitest.com",
        password: "WrongPassword",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
