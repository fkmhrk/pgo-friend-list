/// <reference path="./IRouter.ts" />
/// <reference path="./page.d.ts" />
/// <reference path="./IApplication.ts" />
/// <reference path="./pages/IPage.ts" />

import TopPage from "./pages/TopPage";
import TrainerListPage from "./pages/TrainerListPage";
import WidgetSamplePage from "./pages/WidgetSample";

export default class Router implements IRouter {
  constructor(app: IApplication) {
    page("/", () => {
      this.showPage(new TopPage(app));
    });
    page("/trainers", () => {
      this.showPage(new TrainerListPage(app));
    });
    page("/pgo-friend-list/", () => {
      this.showPage(new TopPage(app));
    });
    page("/pgo-friend-list/trainers", () => {
      this.showPage(new TrainerListPage(app));
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
