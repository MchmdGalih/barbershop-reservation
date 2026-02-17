import { PrismaClient } from "../generated/prisma/client";
import { barberSeeders } from "./seeds/barbers.seed";
import { citySeeders } from "./seeds/cities.seed";
import { OutletSeeders } from "./seeds/outlets.seed";
import { roleSeeders } from "./seeds/roles.seed";
import { serviceSeeders } from "./seeds/services.seed";
import { userSeeders } from "./seeds/users.seed";

const prisma = new PrismaClient();

async function main() {
  const roles = await roleSeeders();
  const users = await userSeeders(roles);
  const cities = await citySeeders();
  const outlets = await OutletSeeders(cities);
  const barbers = await barberSeeders(outlets);
  const services = await serviceSeeders();
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
