import { Role, User } from "../../generated/prisma/client";
import { prisma } from "../../src/lib/prisma";
import bcrypt from "bcrypt";

export async function userSeeders(roles: Role[]): Promise<User[]> {
  const hashedPassword = await bcrypt.hash("@password1", 10);
  const roleAdmin = roles.find((role) => role.name === "admin");
  const roleUser = roles.find((role) => role.name === "user");

  if (!roleAdmin || !roleUser) throw new Error("Role not found");

  await prisma.user.createMany({
    data: [
      {
        username: "admin",
        email: "admin1@gmail.com",
        password: hashedPassword,
        roleId: roleAdmin.id,
      },
      {
        username: "user",
        email: "user1@gmail.com",
        password: hashedPassword,
        roleId: roleUser.id,
      },
    ],
    skipDuplicates: true,
  });

  return prisma.user.findMany({
    include: {
      role: true,
    },
  });
}
