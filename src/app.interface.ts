export interface IUser {
    email: string;
    password: string;
}

export interface IAuthToken {
    authToken: string;
}

export interface IKeyPair {
    publicKey: string,
    privateKey: string
}
