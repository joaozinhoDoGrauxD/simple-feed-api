import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { List } from "../entities/List";
import { Bookmark } from "../entities/Bookmark";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGO_URI,
  synchronize: true,
  logging: true,
  entities: [User, List, Bookmark],
});