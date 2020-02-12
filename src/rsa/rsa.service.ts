import { Injectable } from '@nestjs/common';
import { generateKeyPairSync } from 'crypto';

import { IKeyPair } from 'src/app.interface';

@Injectable()
export class RsaService {
    private usersKeyPair = {};

    generateNewKeyForUser(email: string): void {
        const keyPair = this.generateKeyPair();
        this.addKeyPair(email, keyPair);
    }

    getUserKeyPair(email: string): IKeyPair {
        return this.usersKeyPair[email];
    }

    getUserPublicKey(email: string): string {
        const keyPair = this.getUserKeyPair(email);

        return keyPair ? this.getUserKeyPair(email).publicKey : undefined;
    }

    private generateKeyPair(): IKeyPair {
        return generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: 'top secret'
            }
        });
    }

    private addKeyPair(email: string, keyPair: IKeyPair): void {
        this.usersKeyPair = {
            ...this.usersKeyPair,
            [ email ]: {
                ...keyPair
            }
        }
    }
}
