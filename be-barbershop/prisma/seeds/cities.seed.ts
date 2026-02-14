import { City } from "../../generated/prisma/client";
import { prisma } from "../../src/lib/prisma";

export async function citySeeders(): Promise<City[]> {
  await prisma.city.createMany({
    data: [
      {
        name: "Bandung",
      },
      {
        name: "Jakarta",
      },
      {
        name: "Surabaya",
      },
      {
        name: "Malang",
      },
    ],
    skipDuplicates: true,
  });

  return prisma.city.findMany();
}
