import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReqUser } from 'src/users/user.decorator';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { EntityNotFoundFilter } from './exceptions/note-not-found.filter';
import { createRandomNote } from './god';
import { NotesService } from './notes.service';

@UseFilters(new EntityNotFoundFilter())
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAllByUser(@ReqUser() user: ReqUser) {
    return this.notesService.findAllByUser(user);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.notesService.findById(id);
  }

  @Post()
  create(@ReqUser() user: ReqUser, @Body() dto: CreateNoteDto) {
    return this.notesService.create(user, dto);
  }

  @Post('/god')
  god(@ReqUser() user: ReqUser) {
    return this.notesService.create(user, createRandomNote());
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete('bin/:id')
  bin(@Param('id') id: string) {
    return this.notesService.bin(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
