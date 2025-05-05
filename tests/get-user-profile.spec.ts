// External libraries
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
// Internal utilities
import { GetUserProfileService } from "@/services/get-user-profile-service";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

let mockRepository: InMemoryUsersRepository;
let sut: GetUserProfileService;

describe("Get User Profile Service", () => {
  beforeEach(() => {
    mockRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileService(mockRepository);
  })

  it("should successfully get user profile", async () => {
    const existingUser = await mockRepository.create({
      name: "Usuário Vitest Existente",
      email: "test@vitest.com",
      password_hash: await hash("HashedPassword", 6),
    });

    const { user } = await sut.getUserProfile({
      userId: existingUser.id,
    });

    expect(user.name).toEqual("Usuário Vitest Existente");
  });

  it("should reject displaying user profile with an invalid ID", async () => {
    await expect(() =>
      sut.getUserProfile({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
