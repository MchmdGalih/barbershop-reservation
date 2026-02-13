import { PrismaClient } from "../generated/prisma/client";
import { roleSeeders } from "./seeds/roles.seed";
import { userSeeders } from "./seeds/users.seed";

const prisma = new PrismaClient();

async function main() {
  const roles = await roleSeeders();
  const users = await userSeeders(roles);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: Error) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
