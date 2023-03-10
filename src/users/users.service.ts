import { DataSource, EntityNotFoundError } from 'typeorm';
import { Injectable } from '@nestjs/common';
import UpdateUserDto from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import CreateUserDto from './dto/create-user.dto';
import { UserDeletedException } from './exceptions/user-deleted.exception';

@Injectable()
export class UsersService {
  constructor(private readonly dataSource: DataSource) {}

  userRepository = this.dataSource.getRepository(User);

  create(user: CreateUserDto) {
    return this.userRepository.save({
      email: user.email,
      password: bcrypt.hashSync(user.password, 10),
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  async findById(userId: number) {
    try {
      return await this.userRepository.findOneByOrFail({ userId });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        // since Nest automatically throws if the token is invalid, the only
        // case where this happens is when the user account is deleted
        throw new UserDeletedException();
      }

      throw error;
    }
  }

  findByEmail(email: string) {
    return this.userRepository.findOneByOrFail({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.userRepository.remove(await this.findById(id));
  }
}
