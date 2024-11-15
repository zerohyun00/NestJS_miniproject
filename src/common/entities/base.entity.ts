import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

export abstract class PartialBaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
