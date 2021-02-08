/// <reference path="./IServices.ts" />
/// <reference path="../models/IModels.ts" />

import AccountService from "./account/AccountService";
import TrainserService from "./trainer/TrainserService";

export default class Services implements IServices {
  account: IAccountService;
  trainer: ITrainserService;
  constructor(models: IModels) {
    this.account = new AccountService(models.account);
    this.trainer = new TrainserService(models.trainer);
  }
}
