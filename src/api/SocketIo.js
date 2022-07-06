import feathers from "@feathersjs/client";
import { URL_BASE, URL_AUTHENTICATION } from "../constants";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
const socket = io(URL_BASE);
const app = feathers();
app.configure(
  socketio(socket, {
    timeout: 60000,
  })
);
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
app.io.on("connect", () => {
  socket.on("log-actions created", (task) => {
    /*  openNotification({
           message: "Nueva Reservación",
           description: `${task.status}`
         }) 
         alert('New task updated' + JSON.stringify(task))
         */
  });
  /* socket.on("messages created", () => {
        alert("CREATED!")
    }) */
});
export default app;
