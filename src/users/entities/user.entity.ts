import { Note } from 'src/notes/entities/note.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId!: number;

  @Column()
  email!: string;

  @Column()
  password?: string;

  @CreateDateColumn()
  registartionDate!: Date;

  @OneToMany(() => Note, (note) => note.user)
  notes!: Note[];
}
