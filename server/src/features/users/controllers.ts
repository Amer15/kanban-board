import { validateSchema } from "@/utils/validation";
import { Request, Response } from "express";
import { registerUserSchema, loginUserSchema } from "./validators";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { userTable } from "@/db/models/user";
import { eq } from "drizzle-orm";
import { CustomError } from "@/utils/custom_error";
import jwt from "jsonwebtoken";
import env from "@/env";

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await db.query.userTable.findMany({
    columns: {
      password: false,
    },
  });

  res.status(200).json({
    message: "successfully fetched users",
    users,
  });
};

export const register = async (req: Request, res: Response) => {
  const payload = validateSchema(registerUserSchema, req.body);
  const { password, ...otherData } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  const userExist = await db.query.userTable.findFirst({
    where: eq(userTable.email, otherData.email),
  });

  if (userExist) {
    throw new CustomError(
      "account already exist with this email",
      400
    );
  }

  await db.insert(userTable).values({
    password: hashedPassword,
    ...otherData,
  });

  res.status(201).json({
    message: "registration successfull, please signin",
  });
};

export const login = async (req: Request, res: Response) => {
  const payload = validateSchema(loginUserSchema, req.body);
  const { email, password } = payload;

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.email, email),
  });

  if (!user) {
    throw new CustomError("no account found, please register", 400);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new CustomError("invalid credentials", 400);
  }

  const tokenPayload: { id: number; email: string } = {
    id: user.id,
    email: user.email,
  };

  const access_token = jwt.sign(tokenPayload, env.JWT_SECRET_KEY, {
    expiresIn: env.TOKEN_LIFE as jwt.SignOptions["expiresIn"],
  });

  const refresh_token = jwt.sign(tokenPayload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_LIFE as jwt.SignOptions["expiresIn"],
  });

  const { password: userPass, ...otherUserData } = user;

  res.status(201).json({
    message: "login successfull",
    access_token,
    refresh_token,
    user: otherUserData,
  });
};
