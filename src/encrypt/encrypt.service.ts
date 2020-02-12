import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as NodeRSA from 'node-rsa';

import { RsaService } from '../rsa/rsa.service';

@Injectable()
export class EncryptService {
    constructor(private readonly rsaService: RsaService) {}

    getEncryptedDoc(email: string) {
        const buffer = readFileSync(process.cwd() + '\\assets\\sample.pdf');
        const publicKey = this.rsaService.getUserPublicKey(email);

        if (publicKey) {
            const key = new NodeRSA(publicKey, 'pkcs8-public');

            return key.encrypt(buffer, 'base64');
        }

        return null;
    }
}
