import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { LoginInput, RegisterInput } from "../../types/auth";
import { createToken } from "../../utils/jwt";
import { AppErrors } from "../../errors/AppError";

const registerService = async (payload: RegisterInput) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingUser) throw new AppErrors(403, "User already exists");

  const defaultRole = await prisma.role.findFirst({
    where: {
      name: {
        equals: "user",
        mode: "insensitive",
      },
    },
  });

  if (!defaultRole) throw new AppErrors(404, "Default role not found");

  const user = await prisma.user.create({
    data: {
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
      role: {
        connect: {
          id: defaultRole.id,
        },
      },
    },
    omit: {
      password: true,
    },
  });

  return user;
};

const loginService = async (payload: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
      role: true,
    },
  });

  const isValidPassword = await bcrypt.compare(
    payload.password,
    user?.password ?? "",
  );

  if (!user || !isValidPassword) {
    throw new AppErrors(400, "Invalid email or password ");
  }

  const payloadToken = {
    id: user.id,
    email: user.email,
    role: user.role?.name,
  };

  const token = createToken(payloadToken);

  const { password: _, ...dataUserPublic } = user;

  return {
    user: dataUserPublic,
    token,
  };
};

export { registerService, loginService };
