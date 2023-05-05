import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Note {
  @PrimaryColumn()
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
  isArchived!: boolean;

  @Column('date', { nullable: true, default: null })
  dateArchived!: Date | null;

  @Column('boolean', { default: false })
  isBinned!: boolean;

  @Column('date', { nullable: true, default: null })
  dateBinned!: Date | null;

  @CreateDateColumn()
  dateCreated!: Date;

  @UpdateDateColumn()
  dateUpdated!: Date;
}
