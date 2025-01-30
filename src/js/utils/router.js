import Utils from "./utils";
import Config from "../config/config";

const PUBLIC_ROUTES = ["/login", "/register"];

const urlRoutes = {
  404: {
    template: "not-found",
  },
  "": {
    template: "dashboard-page",
  },
  "/": {
    template: "dashboard-page",
  },
  "/add": {
    template: "add-story-page",
  },
  "/about": {
    template: "about-page",
  },
  "/login": {
    template: "login-page",
  },
  "/register": {
    template: "register-page",
  },
};

const checkAuth = (path) => {
  const token = Utils.getUserToken(Config.USER_TOKEN_KEY);

  if (!token && !PUBLIC_ROUTES.includes(path)) {
    window.location.hash = "#/login";
    return false;
  }

  if (token && PUBLIC_ROUTES.includes(path)) {
    window.location.hash = "#/";
    return false;
  }

  return true;
};

const locationHandler = async () => {
  const path = window.location.hash.replace("#", "");

  if (!checkAuth(path)) return;

  const route = urlRoutes[path] || urlRoutes[404];
  const html = route.template;

  const main = document.querySelector("#content");
  main.innerHTML = `<${html}></${html}>`;
};

export const router = () => {
  window.addEventListener("hashchange", locationHandler);
  window.addEventListener("load", locationHandler);
};
