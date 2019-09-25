declare global {
  interface Window {
    config: { apiUri: string };
    apiToken: string;
  }
}

const API_URL = window.config.apiUri;
const API_TOKEN = window.apiToken;

export const BaseAPI = {
  API_URL,
  API_TOKEN,
  requestOptions: {
    headers: {
      "Authorization": `Bearer ${API_TOKEN}`,
      "Prefer": "return=representation",
      "Accept": "application/json",
      "Content-Type": "application/json; charset=utf-8",
    },
  } as RequestInit,
};
