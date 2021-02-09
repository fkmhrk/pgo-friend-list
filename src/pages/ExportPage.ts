/// <reference path="./IPage.ts" />
import Ractive from "ractive";
import { RaisedButton } from "../views/Button";
import { TextArea, TextField } from "../views/TextField";

export default class ExportPage implements IPage {
  private app: IApplication;
  private ractive!: Ractive;

  constructor(app: IApplication) {
    this.app = app;
  }
  async onCreate() {
    this.app.appBar.setHasBack(true);
    const t = await this.app.fetchTemplate("export.html");
    this.ractive = new Ractive({
      el: "#container",
      template: t,
      components: {
        TextArea: TextArea,
        RaisedButton: RaisedButton,
      },
      data: {
        data: "",
      },
    });

    try {
      const trainers = await this.app.models.trainer.getAll();
      const trainersObj = trainers.reduce((o: any[], t: ITrainer) => {
        o.push({
          name: t.name,
          label: t.label,
        });
        return o;
      }, <any[]>[]);
      const exportData = {
        version: 1,
        trainers: trainersObj,
      };
      this.ractive.set({
        data: JSON.stringify(exportData),
      });
    } catch (e) {
      console.log(e);
    }
  }
}
