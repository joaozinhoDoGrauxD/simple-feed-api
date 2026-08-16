import { DataSource } from "typeorm";
import {Resolver} from "node:dns"
import { User } from "../entities/User";
import { List } from "../entities/List";
import { Bookmark } from "../entities/Bookmark";

const resolver = new Resolver()

resolver.setServers(['1.1.1.1', '8.8.8.8'])

const setupDBName = () : string => {
    if(process.env.BUN_ENV === 'production'){
      return 'db_production'
    } else {
      return 'db_development'
    }
}

const dbName = setupDBName()

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGO_URI,
  database: dbName,
  synchronize: true,
  logging: true,
  entities: [User, List, Bookmark],
});