// External libraries
import { randomUUID } from "node:crypto";
// Internal utilities
import { Prisma, User } from "generated/prisma/client";
import { UsersRepository } from "../users-repository";

/*
 * Mock implementation of UsersRepository for unit testing with Vitest,  
 * emulating database interactions by storing user records in memory.
 */
export class InMemoryUsersRepository implements UsersRepository {
  public memory: User[] = [];

  async findById(id: string) {
    const user = this.memory.find((item) => item.id === id);

    if (!user) return null;

    return user;
  }

  async findByEmail(email: string) {
    const user = this.memory.find((item) => item.email === email);

    if (!user) return null;

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.memory.push(user);
    return user;
  }
}
