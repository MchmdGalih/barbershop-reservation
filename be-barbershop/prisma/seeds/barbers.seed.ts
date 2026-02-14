import { Barber, Outlet } from "../../generated/prisma/client";
import { faker } from "@faker-js/faker";
import { prisma } from "../../src/lib/prisma";
export async function barberSeeders(outlets: Outlet[]): Promise<Barber[]> {
  for (const outlet of outlets) {
    const barbers = Array.from({ length: 5 }).map(() => ({
      name_barber: faker.person.firstName(),
      image: faker.image.avatar(),
      public_id: faker.string.uuid(),
      outletId: outlet.id,
    }));

    await prisma.barber.createMany({
      data: barbers,
      skipDuplicates: true,
    });
  }

  return prisma.barber.findMany();
}
