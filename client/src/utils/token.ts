import decode from "jwt-decode";
import { MapperUser } from "../state";

const tokenUtil = {
  login: (token: string) => localStorage.setItem("id_token", token),
  logout: () => {
    console.log("Logging Out")
    console.log(localStorage.getItem("id_token"));
    localStorage.removeItem("id_token");
  },
  getToken: () => {
    const idToken = localStorage.getItem("id_token");
    if (idToken) {
      const isExpired = tokenUtil.isExpired(idToken);
      if (isExpired) {
        tokenUtil.logout();
      }
      return tokenUtil.decode(idToken);
    }
    return null;
  },
  decode: (token: string): {
    data: MapperUser;
    exp: number;
    iat: number;
  } => decode(token),
  isExpired: (token: string) => {
    const decoded = decode(token) as {
      data: MapperUser;
      exp: number;
      iat: number;
    };
    return decoded.exp * 1000 < Date.now();
  },
};

export default tokenUtil;
