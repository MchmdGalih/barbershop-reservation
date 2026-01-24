import { AppErrors } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

interface RoleInput {
  name: string;
}

const createRoleService = async (payload: RoleInput) => {
  const existingRole = await prisma.role.findFirst({
    where: {
      name: {
        equals: payload.name,
        mode: "insensitive",
      },
    },
  });

  if (existingRole) throw new AppErrors(403, "Role already exists");

  const role = await prisma.role.create({
    data: {
      name: payload.name,
    },
  });

  return role;
};

const getRoleService = async () => {
  const role = await prisma.role.findMany();

  if (!role) throw new AppErrors(404, "Role not found");

  return role;
};

const getRoleByIdService = async (id: string) => {
  const role = await prisma.role.findUnique({
    where: {
      id,
    },
  });

  if (!role) {
    throw new AppErrors(404, "Role not found!");
  }

  return role;
};

const updateRoleService = async (id: string, payload: RoleInput) => {
  return prisma.role.update({
    where: {
      id,
    },
    data: {
      name: payload.name,
    },
  });
};

const deleteRoleService = async (id: string) => {
  return prisma.role.delete({
    where: {
      id,
    },
  });
};

export {
  createRoleService,
  getRoleService,
  getRoleByIdService,
  updateRoleService,
  deleteRoleService,
};
