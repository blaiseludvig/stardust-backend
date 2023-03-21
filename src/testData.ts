import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import CreateUserDto from './users/dto/create-user.dto';

export function createRandomUser(): CreateUserDto {
  return {
    email: faker.internet.email(),
    password: bcrypt.hashSync(faker.internet.password(6), 10),
  };
}

export function createRandomUserArray(number: number) {
  return Array.from({ length: number }, () => createRandomUser());
}
