import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    // we can safelay disable this, because Nest automatically rejects
    // the request if it doesn't contain a password
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (user && bcrypt.compareSync(password, user.password!)) {
      // strip password property before returning
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      const validatedUser: Omit<User, 'password'> = result;

      return validatedUser;
    } else {
      return null;
    }
  }

  async createJWT(user: Omit<User, 'password'>) {
    const payload = { sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
