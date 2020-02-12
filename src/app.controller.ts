import { Controller, Post, Request, Get, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth/auth.service';
import { RsaService } from './rsa/rsa.service';
import { EncryptService } from './encrypt/encrypt.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly rsaService: RsaService,
    private readonly encryptService: EncryptService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('api/sign-in')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('api/generate-key-pair')
  async generateKeyPair(@Request() { user: { email }}) {
    this.rsaService.generateNewKeyForUser(email);
    const keyPair = this.rsaService.getUserKeyPair(email);

    if (keyPair) { 
      return {
        privKey: keyPair.privateKey,
        pubKey: keyPair.publicKey
      };
    }
 
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('api/encrypt')
  async encrypt(@Request() { user: { email }}) {
    const result = this.encryptService.getEncryptedDoc(email);

    if (result) {
      return result
    }
 
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
  }
}
