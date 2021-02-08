/// <reference path="./IPage.ts" />
import Ractive from "ractive";
import { RaisedButton } from "../views/Button";
import { List, SingleLineListItem } from "../views/List";
import { TextField } from "../views/TextField";

export default class EditTrainerPage implements IPage {
  private ractive!: Ractive;

  constructor(private app: IApplication, private name: string) {}
  async onCreate() {
    const t = await this.app.fetchTemplate("editTrainer.html");
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
        loading: true,
      },
      on: {
        updateLabel: () => this.updateLabel(),
        deleteTrainer: () => this.deleteTrainer(),
      },
    });

    try {
      const trainer = await this.app.models.trainer.getByName(this.name);
      this.ractive.set({
        label: trainer.label,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  private async updateLabel() {
    const label = this.ractive.get("label");

    try {
      await this.app.services.trainer.updateLabel(this.name, label);
      this.app.showMessage("Label Updated!");
    } catch (e) {
      console.log(e);
    }
  }

  private async deleteTrainer() {
    if (!window.confirm("Would you delete this trainer?")) return;

    try {
      await this.app.services.trainer.deleteTrainer(this.name);
      window.history.back();
    } catch (e) {
      console.log(e);
    }
  }
}
