import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { IUser } from '../app.interface';

@Injectable()
export class AuthService {
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService
    ) {}
  
    async validateUser({ email, password }: IUser): Promise<IUser> {
        const user = await this.usersService.findOne(email);

        if (user && user.password === password) {
            return user;
        }

        return null;
    }

    async signIn({ email }: IUser) {
      const payload = { email };

      return {
        authToken: this.jwtService.sign(payload),
      };
    }
}
