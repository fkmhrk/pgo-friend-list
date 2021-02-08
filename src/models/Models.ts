/// <reference path="./IModels.ts" />

import AccessToken from "./token/AccessToken";
import AccountRepository from "./account/AccountRepository";
import TrainerRepository from "./trainer/TrainerRepository";

export default class Models implements IModels {
  account: IAccountRepository;
  trainer: ITrainerRepository;

  constructor(client: HTTPClient, token: AccessToken, db: IDBDatabase) {
    this.account = new AccountRepository(client, token);
    this.trainer = new TrainerRepository(db);
  }
}
