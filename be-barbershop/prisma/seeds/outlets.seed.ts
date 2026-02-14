import { City, Outlet } from "../../generated/prisma/client";
import { prisma } from "../../src/lib/prisma";
import { faker } from "@faker-js/faker";

export async function OutletSeeders(cities: City[]): Promise<Outlet[]> {
  const getCityId = (name: string) => {
    return cities.find((city) => city.name === name)?.id;
  };

  const outlets = [
    {
      name: "Bandung",
      address: "Jl. Asia Afrika No. 10",
      city: "Bandung",
    },
    {
      name: "Jakarta Selatan",
      address: "Jl. Kemang Raya No. 5",
      city: "Jakarta",
    },
    {
      name: "Outlet Jakarta Barat",
      address: "Jl. Daan Mogot No. 20",
      city: "Jakarta",
    },
    {
      name: "Outlet Surabaya Kota",
      address: "Jl. Tunjungan No. 1",
      city: "Surabaya",
    },
    {
      name: "Outlet Malang Utara",
      address: "Jl. Soekarno Hatta No. 15",
      city: "Malang",
    },
  ];

  await prisma.outlet.createMany({
    data: outlets.map((outlet) => ({
      name: outlet.name,
      address: outlet.address,
      cityId: getCityId(outlet.city),
      outlet_image: faker.image.urlPicsumPhotos(),
      public_id: faker.string.uuid(),
    })),
    skipDuplicates: true,
  });

  const allOutlet = await prisma.outlet.findMany({
    where: { name: { in: outlets.map((outlet) => outlet.name) } },
  });

  return allOutlet;
}
