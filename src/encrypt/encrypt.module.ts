import { Module } from '@nestjs/common';
import { EncryptService } from './encrypt.service';
import { RsaModule } from '../rsa/rsa.module';

@Module({
  imports: [RsaModule],
  providers: [EncryptService],
  exports: [EncryptService]
})
export class EncryptModule {}
