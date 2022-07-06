import { socket, api } from "../api/";
export const getService = (service) => api.service(service);
/* export const getSocket = (service) => socket.service(service); */
export const reAuthenticate = api.reAuthenticate;
export const Logout = api.logout;
/* export const disconnect = socket.close;
export const connect = socket.connect; */
export const authenticate = ({
  strategy = "local",
  email,
  password,
  ...rest
}) => {
  return api.authenticate({
    hostApp: "DONEC",
    strategy,
    email,
    password,
    ...rest,
  });
};
export { socket };
