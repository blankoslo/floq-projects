import config from "../Config";

export const BaseAPI = {
  config,
  requestOptions: {
    credentials: "include",
    headers: {
      "Authorization": `Bearer ${config.apiToken}`,
      "Prefer": "return=representation",
      "Accept": "application/json",
      "Content-Type": "application/json; charset=utf-8",
    },
  } as RequestInit,
};
