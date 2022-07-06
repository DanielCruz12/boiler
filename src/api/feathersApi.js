import feathers from "@feathersjs/client";
import { URL_BASE, URL_AUTHENTICATION } from "../constants";
const app = feathers();
app.configure(feathers.rest(URL_BASE).fetch(window.fetch.bind(window)));
app.configure(
  feathers.authentication({
    path: URL_AUTHENTICATION,
    entity: "user",
    service: "users",
    cookie: "feathers-jwt",
    storageKey: "feathers-jwt",
    storage: window.localStorage,
  })
);
export default app;
