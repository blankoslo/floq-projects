import { TokenData } from "../types/TokenData";
import { IsValidTokenData } from "./DataCheckers";

const getConfig = (): TokenData => {
  // Import local tokenData if dev env
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const tokenData = require("./tokenData.dev.local.json");
    return tokenData;
  }

  if (IsValidTokenData(window)) {
    const config = window as TokenData;
    return config;
  }

  throw new Error("No TokenData config found");
};

export default getConfig();
