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

  @Column('text', { default: '' })
  title!: string;

  @Column('text', { default: 'text' })
  type!: string;

  @Column('text', { default: '' })
  content!: string;

  @Column('boolean', { default: false })
  isDeleted!: boolean;

  @Column('date', { nullable: true, default: null })
  dateDeleted!: Date;

  @CreateDateColumn()
  dateCreated!: Date;

  @UpdateDateColumn()
  dateUpdated!: Date;
}
