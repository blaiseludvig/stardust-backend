import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  noteId!: string;

  @ManyToOne(() => User, (user) => user.notes)
  user!: User;

  @Column('text')
  title!: string;

  @Column('text')
  type!: string;

  @Column('text')
  content!: string;

  @Column('boolean', { default: false })
  isDeleted!: boolean;

  @CreateDateColumn()
  dateCreated!: Date;

  @UpdateDateColumn()
  dateUpdated!: Date;
}
