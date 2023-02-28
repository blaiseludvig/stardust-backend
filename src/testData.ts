import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { User } from './users/entities/user.entity';

export function createRandomUser(): Partial<User> {
  return {
    email: faker.internet.email(),
    password: bcrypt.hashSync(faker.internet.password(6), 10),
    registartionDate: faker.date.recent(),
  };
}

export function createRandomUserArray(number: number) {
  return Array.from({ length: number }, () => createRandomUser());
}
