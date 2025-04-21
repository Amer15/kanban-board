export type UserDecoded = {
  id: number;
  iat: number;
  exp: number;
};

export type TokenPayload = {
  id: number;
  email: string;
};

export const taskStatus = ["todo", "in-progress", "done"] as const;
export type TaskStatus = (typeof taskStatus)[number];
