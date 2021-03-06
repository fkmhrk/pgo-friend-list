/// <reference path="./IPage.ts" />
import Ractive from "ractive";
import { FlatButton, RaisedButton } from "../views/Button";
import { List, SingleLineListItem } from "../views/List";
import { TextField } from "../views/TextField";

export default class TrainerListPage implements IPage {
  private app: IApplication;
  private ractive!: Ractive;

  constructor(app: IApplication) {
    this.app = app;
  }
  async onCreate() {
    this.app.appBar.setHasBack(true);
    const t = await this.app.fetchTemplate("trainerList.html");
    this.ractive = new Ractive({
      el: "#container",
      template: t,
      components: {
        TextField: TextField,
        List: List,
        SingleLineListItem: SingleLineListItem,
        RaisedButton: RaisedButton,
        FlatButton: FlatButton,
      },
      data: {
        trainers: [],
        generate: (trainers: any[]) => this.generate(trainers),
      },
      on: {
        add: () => this.addTrainer(),
        friendClicked: (e: any, trainer: ITrainer) => {
          this.app.navigate(`/trainers/${trainer.name}`);
        },
        toImport: () => this.app.navigate("/trainer/import"),
        toExport: () => this.app.navigate("/trainer/export"),
      },
    });

    try {
      const trainers = await this.app.models.trainer.getAll();
      this.ractive.set({
        trainers: trainers,
      });
    } catch (e) {
      console.log(e);
    }
  }

  private async addTrainer() {
    const trainers = this.ractive.get("trainers");
    const name = this.ractive.get("name");
    const label = this.ractive.get("label");

    try {
      const newTrainers = await this.app.services.trainer.add(
        trainers,
        name,
        label
      );
      this.ractive.set({
        trainers: newTrainers,
        name: "",
        label: "",
      });
    } catch (e) {
      console.log(e);
    }
  }

  private generate(trainers: any[]): string {
    const checkedTrainers = trainers.filter((f) => f["checked"]);
    const str = checkedTrainers
      .reduce((v, t) => v + "," + t["name"], "")
      .substr(1);
    return str;
  }
}
