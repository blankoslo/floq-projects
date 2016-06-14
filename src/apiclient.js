import 'whatwg-fetch';

const baseURL = config.apiUri;

const headers = {
  Authorization: `Bearer ${apiToken}`,
  Prefer: 'return=representation', // ask for the updated entity after modifications (e.g. PATCH)
  Accept: 'application/json'
};

const dataHeaders = Object.assign({}, headers, {
  'Content-Type': 'application/json; charset=utf-8'
});

export const getProjects = () =>
fetch(`${baseURL}/projects?select=id,name,customer&order=id.desc`, {
  headers
});

export const updateProject = (id, body) => fetch(`${baseURL}/projects?id=eq.${id}`, {
  method: 'PATCH',
  headers: dataHeaders,
  body: JSON.stringify(body)
});

export const createProject = body => fetch(`${baseURL}/projects`, {
  method: 'POST',
  headers: dataHeaders,
  body: JSON.stringify(body)
});

export const getCustomers = () => fetch(`${baseURL}/customers`, {
  headers
});
