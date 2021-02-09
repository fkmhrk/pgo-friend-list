/// <reference path="./IPage.ts" />
import Ractive from "ractive";
import { RaisedButton } from "../views/Button";
import { TextArea, TextField } from "../views/TextField";

export default class ImportPage implements IPage {
  private app: IApplication;
  private ractive!: Ractive;

  constructor(app: IApplication) {
    this.app = app;
  }
  async onCreate() {
    this.app.appBar.setHasBack(true);
    const t = await this.app.fetchTemplate("import.html");
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
      on: {
        import: () => this.import(),
      },
    });
  }

  async import() {
    const data = this.ractive.get("data") as string;

    let trainers: ITrainer[];
    try {
      trainers = await this.app.services.trainer.parseImportData(data);
    } catch (e) {
      this.app.showMessage(JSON.stringify(e));
      return;
    }
    if (trainers.length == 0) {
      this.app.showMessage("no trainer found");
      return;
    }
    // check
    if (
      !window.confirm(
        `Would you import ${trainers.length} trainers? current data will be cleared`
      )
    ) {
      return;
    }

    try {
      await this.app.services.trainer.execImport(trainers);
      window.history.back();
    } catch (e) {
      this.app.showMessage(JSON.stringify(e));
      return;
    }
  }
}
