const PUBLIC_BASE_URL = "https://storage.googleapis.com/floq-test/projects";

export const getUrl = (relativeUrl: string): string => {
  if (process.env.NODE_ENV !== "production") {
    return relativeUrl;
  }
  return `${PUBLIC_BASE_URL}${relativeUrl}`;
};
