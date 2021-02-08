import Application from "./Application";
import Models from "./models/Models";
import Router from "./Router";
import Services from "./services/Services";
import XHRClient from "./clients/XHRClient";
import AccessToken from "./models/token/AccessToken";

import "./scss/index.scss";
import { Drawer } from "./views/Drawer";
import { AppBar } from "./views/AppBar";
import { openIndexedDB } from "./models/db/openHelper";

const boot = async () => {
  const db = await openIndexedDB("trainers", 1, (db: IDBDatabase) => {
    db.createObjectStore("trainers", { keyPath: "name" });
  });
  const token = new AccessToken();
  const client = new XHRClient("json");
  const models = new Models(client, token, db);
  const services = new Services(models);
  const app = new Application(
    new XHRClient("text"),
    services,
    models,
    (a: IApplication) => {
      return new Router(a);
    },
    (app: IApplication) => {
      return new Drawer(app);
    },
    (drawer: IDrawer) => {
      return new AppBar(drawer);
    }
  );

  app.start();
};

boot();
