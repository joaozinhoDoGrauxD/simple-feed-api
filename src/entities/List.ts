import { Entity, ObjectIdColumn, Column, CreateDateColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("lists")
export class List {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  userId!: string;

  @Column()
  title!: string;

  @Column("array")
  urls!: string[];

  @CreateDateColumn()
  createdAt!: Date;
}