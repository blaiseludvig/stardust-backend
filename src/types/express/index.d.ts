import { User } from 'src/users/entities/user.entity';

declare global {
  declare namespace Express {
    interface Request {
      user: Omit<User, 'password'>;
    }
  }
}
