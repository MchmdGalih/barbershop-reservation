import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import { UserInput, UserUpdateInput } from "../../types/user";
import { AppErrors } from "../../errors/AppError";

const getAllUserService = async () => {
  const user = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: {
        select: {
          name: true,
        },
      },
    },
  });

  return user;
};

const getUserByIdService = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!user) throw new AppErrors(401, "User not found!");

  return user;
};

const createUserService = async (payload: UserInput) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingUser) throw new AppErrors(403, "User already exists");

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: {
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
      role: {
        connect: {
          id: payload.roleId,
        },
      },
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: {
        select: {
          name: true,
        },
      },
    },
  });

  return user;
};

const updateUserService = async (id: string, payload: UserUpdateInput) => {
  const { roleId, ...userData } = payload;
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...userData,
      ...(roleId && {
        role: {
          connect: {
            id: roleId,
          },
        },
      }),
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: {
        select: {
          name: true,
        },
      },
    },
  });
  return updatedUser;
};
const deleteUserService = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

export {
  getAllUserService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
};
