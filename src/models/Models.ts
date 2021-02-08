/// <reference path="./IModels.ts" />

import AccessToken from "./token/AccessToken";
import AccountRepository from "./account/AccountRepository";

export default class Models implements IModels {
    account: IAccountRepository;

    constructor(client: HTTPClient, token: AccessToken) {
        this.account = new AccountRepository(client, token);
    }
}
