// External libraries
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";
// Internal utilities
import { CheckIn, Prisma } from "generated/prisma/client";
import { CheckInsRepository } from "../check-ins-repository";

/*
 * Mock implementation of CheckInsRepository for unit testing with Vitest,
 * emulating database interactions by storing check-in records in memory.
 */
export class InMemoryCheckInsRepository implements CheckInsRepository {
  public memory: CheckIn[] = [];

  async findById(id: string) {
    const checkIn = this.memory.find((item) => item.id === id);

    if (!checkIn) return null;

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnSameDate = this.memory.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) return null;

    return checkInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.memory
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }

  async countByUserId(userId: string) {
    return this.memory.filter((item) => item.user_id === userId).length;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated: data.validated ? new Date(data.validated) : null,
      created_at: new Date(),
    };

    this.memory.push(checkIn);

    return checkIn;
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.memory.findIndex(
      (item) => item.id === checkIn.id
    );

    if (checkInIndex >= 0) {
      this.memory[checkInIndex] = checkIn;
    }

    return checkIn;
  }
}
