export type ColumnType = {
  type: "todo" | "in-progress" | "done";
  title: "Todo" | "In Progress" | "Done";
};

export type ColumnProps = {
  column: ColumnType;
};

export type Task = {
  id: number;
  title: string;
  description: string | null;
  task_status: "todo" | "in-progress" | "done";
  user: User;
};

export type TaskCardProps = {
  task: Task;
};

export type TaskUser = {
  id: number;
  full_name: string;
  email: string;
};

export type User = {
  id: number;
  full_name: string;
  email: string;
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

export type UserStoreProps = {
  is_auth: boolean;
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
  setUser: (payload: User) => void;
  removeUser: () => void;
  updateUser: (payload: User) => void;
  updateAccessToken: (payload: string) => void;
  updateRefreshToken: (payload: string) => void;
  updateTokens: (payload: AuthTokens) => void;
};

export type AuthData = AuthTokens & {
  user: User;
};
