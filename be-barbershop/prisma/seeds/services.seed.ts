import { Service } from "../../generated/prisma/client";
import { prisma } from "../../src/lib/prisma";

export async function serviceSeeders(): Promise<Service[]> {
  await prisma.service.createMany({
    data: [
      {
        name: "Haircut",
        price: Number(50000),
        duration: 30,
      },
      {
        name: "Coloring",
        price: Number(100000),
        duration: 60,
      },
      {
        name: "Haircut & Coloring",
        price: Number(150000),
        duration: 90,
      },
    ],
  });

  return prisma.service.findMany();
}
