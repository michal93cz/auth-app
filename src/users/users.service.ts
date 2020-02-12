import { Injectable } from '@nestjs/common';

import { IUser } from 'src/app.interface';

@Injectable()
export class UsersService {
    private readonly users: IUser[] = [
        {
            email: 'example@mail.com',
            password: '1234'
        },
        {
            email: 'whatever@mail.com',
            password: 'whatever'
        }
    ];
  
    async findOne(email: string): Promise<IUser | undefined> {
        return this.users.find(user => user.email === email);
    }
}
