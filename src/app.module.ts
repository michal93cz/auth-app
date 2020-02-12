import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RsaModule } from './rsa/rsa.module';
import { EncryptModule } from './encrypt/encrypt.module';

@Module({
  imports: [ AuthModule, UsersModule, RsaModule, EncryptModule ],
  controllers: [ AppController ]
})
export class AppModule {}
