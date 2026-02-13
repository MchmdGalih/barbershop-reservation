import { Role } from "../../generated/prisma/client";
import { prisma } from "../../src/lib/prisma";

export async function roleSeeders(): Promise<Role[]> {
  await prisma.role.createMany({
    data: [
      {
        name: "admin",
      },
      {
        name: "user",
      },
    ],
    skipDuplicates: true,
  });
  return prisma.role.findMany();
}
