import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { DataSource, EntityNotFoundError } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { NoteNotFoundException } from './exceptions/note-not-found.exception';

@Injectable()
export class NotesService {
  constructor(private readonly dataSource: DataSource) {}

  notesRepository = this.dataSource.getRepository(Note);

  create(user: User, createNoteDto: CreateNoteDto) {
    return this.notesRepository.save({
      user,
      ...createNoteDto,
    } as Note);
  }

  findAll() {
    return this.notesRepository.find();
  }

  findAllByUser(user: User) {
    return this.notesRepository.find({
      where: {
        user: {
          userId: user.userId,
        },
      },
    });
  }

  async findById(noteId: string) {
    try {
      return await this.notesRepository.findOneByOrFail({ noteId });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NoteNotFoundException();
      }

      throw error;
    }
  }

  update(noteId: string, updateNoteDto: UpdateNoteDto) {
    return this.notesRepository.update(noteId, updateNoteDto);
  }

  archive(noteId: string) {
    return this.notesRepository.update(noteId, {
      isArchived: true,
      dateArchived: new Date().toISOString(),
    });
  }

  bin(noteId: string) {
    return this.notesRepository.update(noteId, {
      isDeleted: true,
      dateDeleted: new Date().toISOString(),
    });
  }

  async remove(noteId: string) {
    return this.notesRepository.remove(await this.findById(noteId));
  }
}
