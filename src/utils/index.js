var currency = require("currency-formatter");
export const allowAccess = (permissions) => {
  let user = window.localStorage.getItem("user");
  if (!user) return false;
  if (!permissions) return true;
  user = { role: "admin" };
  return permissions.includes(user.role);
};
export const money = (value, decimalSeparator) => {
  return currency.format(value, {
    code: "USD",
    decimalDigits: 0,
    precision: 0,
    decimalSeparator: ".",
    //typeof decimalSeparator !== "undefined" ? decimalSeparator : ","
  });
};
export const decimal = (value, decimal = ",") => {
  return currency.format(value, {
    symbol: "",
    decimal,
    precision: 0,
    format: "%v %s", // %s is the symbol and %v is the value
  });
};
