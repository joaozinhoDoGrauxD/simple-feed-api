import { Entity, ObjectIdColumn, Column, CreateDateColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("users")
export class User {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  role!: string

  @CreateDateColumn()
  createdAt!: Date;
}