import { userClothingTable } from "@/db/models/user_clothing";
import { userTable } from "@/db/models/users";
import { InferSelectModel } from "drizzle-orm";

export const userColumns: Partial<
  Record<keyof InferSelectModel<typeof userTable>, boolean>
> = {
  id: true,
  name: true,
  username: true,
  email: true,
  profile_picture: true,
  is_stylist: true,
};

export const userClothingColumns: Partial<
  Record<keyof InferSelectModel<typeof userClothingTable>, boolean>
> = {
  id: true,
  clothing_image: true,
  user_clothing_category_id: true,
};
