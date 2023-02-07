import { destroyCookie } from "nookies";
import Router from "next/router";

export const useHook = () => {
  const logout = () => {
    destroyCookie(null, "token");
    Router.replace("/login").catch((e) => console.log(e));
  };

  return {
    logout,
  };
};
