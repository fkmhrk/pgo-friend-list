/// <reference path="./IRouter.ts" />
/// <reference path="./IApplication.ts" />
/// <reference path="./pages/IPage.ts" />

import TopPage from "./pages/TopPage";
import page from "page";
import TrainerListPage from "./pages/TrainerListPage";
import WidgetSamplePage from "./pages/WidgetSample";
import EditTrainerPage from "./pages/EditTrainerPage";
import ExportPage from "./pages/ExportPage";
import ImportPage from "./pages/ImportPage";

export default class Router implements IRouter {
  constructor(app: IApplication) {
    const addRoute = (path: string, func: PageJS.Callback) => {
      page(path, func);
      page(`/pgo-friend-list${path}`, func);
    };
    addRoute("/", () => {
      this.showPage(new TopPage(app));
    });
    addRoute("/trainers", () => {
      this.showPage(new TrainerListPage(app));
    });
    addRoute("/trainers/:name", (ctx: PageJS.Context) => {
      this.showPage(new EditTrainerPage(app, ctx.params.name));
    });
    addRoute("/trainer/export", () => {
      this.showPage(new ExportPage(app));
    });
    addRoute("/trainer/import", () => {
      this.showPage(new ImportPage(app));
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
