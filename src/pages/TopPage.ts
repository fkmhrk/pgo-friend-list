/// <reference path="./IPage.ts" />
import Ractive from "ractive";

export default class TopPage implements IPage {
    private app: IApplication;
    private ractive!: Ractive;

    constructor(app: IApplication) {
        this.app = app;
    }
    async onCreate() {
        const t = await this.app.fetchTemplate("top.html");
        this.ractive = new Ractive({
            el: "#container",
            template: t,
        });
    }
}
