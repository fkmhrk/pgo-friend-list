/// <reference path="./IRouter.ts" />
/// <reference path="./IApplication.ts" />
/// <reference path="./pages/IPage.ts" />

import TopPage from "./pages/TopPage";
import page from "page";
import TrainerListPage from "./pages/TrainerListPage";
import WidgetSamplePage from "./pages/WidgetSample";
import EditTrainerPage from "./pages/EditTrainerPage";
import ExportPage from "./pages/ExportPage";

export default class Router implements IRouter {
  constructor(app: IApplication) {
    page("/", () => {
      this.showPage(new TopPage(app));
    });
    page("/trainers", () => {
      this.showPage(new TrainerListPage(app));
    });
    page("/trainers/:name", (ctx: PageJS.Context) => {
      this.showPage(new EditTrainerPage(app, ctx.params.name));
    });
    page("/trainer/export", () => {
      this.showPage(new ExportPage(app));
    });

    page("/pgo-friend-list/", () => {
      this.showPage(new TopPage(app));
    });
    page("/pgo-friend-list/trainers", () => {
      this.showPage(new TrainerListPage(app));
    });
    page("/pgo-friend-list/trainers/:name", (ctx: PageJS.Context) => {
      this.showPage(new EditTrainerPage(app, ctx.params.name));
    });
    page("/pgo-friend-list/trainer/export", () => {
      this.showPage(new ExportPage(app));
    });

    page("/sample", () => {
      this.showPage(new WidgetSamplePage(app));
    });
  }

  start(): void {
    page();
  }

  navigate(path: string): void {
    page(path);
  }

  redirect(path: string): void {
    page.redirect(path);
  }

  private showPage(next: IPage) {
    next.onCreate();
  }
}
