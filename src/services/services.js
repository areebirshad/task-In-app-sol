import Axios from "axios";

const { default: config } = require("../config/config");

export function getTodos(url) {
  return Axios.get(`${config.BASE_URL}/${url}`);
}
