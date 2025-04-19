export type UserDecoded = {
  id: number;
  iat: number;
  exp: number;
};

export const taskStatus = ["todo", "in-progress", "done"] as const;
export type TaskStatus = (typeof taskStatus)[number];
