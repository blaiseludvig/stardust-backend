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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  PickType,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import UserAccountInfoDto from 'src/users/dto/user-account-info.dto';
import { ReqUser } from 'src/users/user.decorator';
import { CreateNoteDto } from './dto/create-note.dto';
import NoteDto from './dto/note-dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { EntityNotFoundFilter } from './exceptions/note-not-found.filter';
import { createRandomNote } from './god';
import { NotesService } from './notes.service';

@ApiTags('Notes')
@ApiBearerAuth()
@UseFilters(new EntityNotFoundFilter())
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiOkResponse({
    description: 'Returns an **array** containing all notes',
    type: NoteDto,
    isArray: true,
  })
  @Get()
  findAllByUser(@ReqUser() user: UserAccountInfoDto) {
    return this.notesService.findAllByUser(user);
  }

  @ApiOkResponse({
    description: 'Returns a single note',
    type: NoteDto,
  })
  @ApiParam({
    name: 'id',
    type: PickType(NoteDto, ['noteId'] as const),
  })
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.notesService.findById(id);
  }

  @ApiCreatedResponse({
    description: 'Returns the newly created note on success',
    type: NoteDto,
  })
  @Post()
  create(@ReqUser() user: UserAccountInfoDto, @Body() dto: CreateNoteDto) {
    return this.notesService.create(user, dto);
  }

  @ApiCreatedResponse({
    description: "Returns god's message on a note",
    type: NoteDto,
  })
  @Post('/god')
  god(@ReqUser() user: UserAccountInfoDto) {
    return this.notesService.create(user, createRandomNote());
  }

  @ApiOkResponse({
    description: 'Returns the updated note on success',
    type: NoteDto,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    this.notesService.update(id, updateNoteDto);
    return this.notesService.findById(id);
  }

  @ApiOkResponse({ description: 'Returns 200 on successful archival' })
  @Patch('archive/:id')
  archive(@Param('id') id: string) {
    this.notesService.archive(id);
    return null;
  }

  @ApiOkResponse({ description: 'Returns 200 on successful unarchival' })
  @Patch('unarchive/:id')
  unarchive(@Param('id') id: string) {
    this.notesService.unarchive(id);
    return null;
  }

  @ApiOkResponse({ description: 'Returns 200 on successful bin' })
  @Patch('bin/:id')
  bin(@Param('id') id: string) {
    this.notesService.bin(id);
    return null;
  }

  @ApiOkResponse({ description: 'Returns 200 on successful unbin' })
  @Patch('unbin/:id')
  unbin(@Param('id') id: string) {
    this.notesService.unbin(id);
    return null;
  }

  @ApiOkResponse({ description: 'Returns 200 on successful deletion' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.notesService.remove(id);
    return null;
  }
}
