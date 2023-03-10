import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { DataSource, EntityNotFoundError } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

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
    return await this.notesRepository.findOneByOrFail({ noteId });
  }
  update(noteId: string, updateNoteDto: UpdateNoteDto) {
    return this.notesRepository.update(noteId, updateNoteDto);
  }

  async remove(noteId: string) {
    return this.notesRepository.remove(await this.findById(noteId));
  }
}
