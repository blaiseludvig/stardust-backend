import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import UpdateUserDto from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import CreateUserDto from './dto/create-user.dto';

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

  findById(userId: number) {
    return this.userRepository.findOneBy({ userId });
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.userRepository.remove(await this.findById(id));
  }
}
