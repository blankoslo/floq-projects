import 'whatwg-fetch';

// resolving this lazily because of tests
const baseURL = () => (
  window && window.config && window.config.apiUri
    ? window.config.apiUri :
    'http://192.81.222.35:3001'
);

// resolving this lazily because of tests
const headers = () => ({
  Authorization: `Bearer ${apiToken}`,
  Prefer: 'return=representation', // ask for the updated entity after modifications (e.g. PATCH)
  Accept: 'application/json'
});

const dataHeaders = Object.assign({}, headers, {
  'Content-Type': 'application/json; charset=utf-8'
});

export const getProjects = () =>
fetch(`${baseURL}/projects?select=id,name,billable,customer&order=id.desc`, {
  headers
}).then(response => response.json());

export const updateProject = (id, body) => fetch(`${baseURL}/projects?id=eq.${id}`, {
  method: 'PATCH',
  headers: dataHeaders,
  body: JSON.stringify(body)
}).then(response => response.json());

export const createProject = body => fetch(`${baseURL}/projects`, {
  method: 'POST',
  headers: dataHeaders,
  body: JSON.stringify(body)
}).then(response => response.json());

export const getCustomers = () => fetch(`${baseURL}/customers`, {
  headers
}).then(response => response.json());
