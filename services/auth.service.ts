import { prisma } from "@/lib/prisma";
import { hashPassword, comparePassword } from "@/lib/bcrypt";
import { generateToken } from "@/lib/jwt";

import { RegisterInput } from "@/validations/auth";
import { LoginInput } from "@/validations/auth-login";

export async function registerAccount(
  data: RegisterInput
) {
  const exist = await prisma.accounts.findUnique({
    where: {
      email: data.email,
    },
  });

  if (exist) {
    throw new Error("EMAIL_EXISTS");
  }

  const password = await hashPassword(data.password);

  return prisma.accounts.create({
    data: {
      email: data.email,
      password,
      role: "PARTICIPANT",
    },
  });
}

export async function loginAccount(
  data: LoginInput
) {
  const account = await prisma.accounts.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!account) {
    throw new Error("INVALID_CREDENTIAL");
  }

  const match = await comparePassword(
    data.password,
    account.password
  );

  if (!match) {
    throw new Error("INVALID_CREDENTIAL");
  }

  const token = generateToken({
    account_id: account.account_id.toString(),
    email: account.email,
    role: account.role,
  });

  return {
    account,
    token,
  };
}