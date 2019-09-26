import { TokenData } from "../types/TokenData";
import { IsValidTokenData } from "./DataCheckers";
import tokenData from "./tokenData.dev.local.json";

const getConfig = (): TokenData => {
  // Import local tokenData if dev env
  if (process.env.NODE_ENV !== "production") {
    return tokenData;
  }

  if (IsValidTokenData(window)) {
    const config = window as TokenData;
    return config;
  }

  throw new Error("No TokenData config found");
};

export default getConfig();
