import { Entity, ObjectIdColumn, Column, CreateDateColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("bookmarks")
export class Bookmark {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  userId!: string;

  @Column()
  title!: string;

  @Column("array")
  items!: Record<string, any>[];

  @CreateDateColumn()
  createdAt!: Date;
}