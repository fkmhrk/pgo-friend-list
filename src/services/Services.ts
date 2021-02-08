/// <reference path="./IServices.ts" />
/// <reference path="../models/IModels.ts" />

import AccountService from "./account/AccountService";

export default class Services implements IServices {
    account: IAccountService;
    constructor(models: IModels) {
        this.account = new AccountService(models.account);
    }
}
