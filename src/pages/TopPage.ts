/// <reference path="./IPage.ts" />
import Ractive from "ractive";
import { RaisedButton } from "../views/Button";
import { List, SingleLineListItem } from "../views/List";
import { TextField } from "../views/TextField";

export default class TopPage implements IPage {
  private app: IApplication;
  private ractive!: Ractive;

  constructor(app: IApplication) {
    this.app = app;
  }
  async onCreate() {
    this.app.appBar.setHasBack(false);
    const t = await this.app.fetchTemplate("top.html");
    this.ractive = new Ractive({
      el: "#container",
      template: t,
      components: {
        TextField: TextField,
        List: List,
        SingleLineListItem: SingleLineListItem,
        RaisedButton: RaisedButton,
      },
      data: {
        trainers: [],
        generate: (trainers: any[]) => this.generate(trainers),
      },
      on: {
        edit: () => this.app.navigate("/trainers"),
        add: () => this.addTrainer(),
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
