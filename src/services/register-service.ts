// External libraries
import { hash } from "bcryptjs";
// Internal utilities
import { prisma } from "@/lib/prisma";

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerService({
  name,
  email,
  password,
}: RegisterServiceRequest) {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (userWithSameEmail) {
    throw new Error("Email address already being used.")
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
}
