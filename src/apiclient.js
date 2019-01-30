const baseURL =
  typeof window !== 'undefined' && window.config && window.config.apiUri
    ? window.config.apiUri : 'https://api-dev.floq.no';

const apiToken =
  typeof window !== 'undefined' && window.apiToken
    ? window.apiToken : 'dev-secret-shhh';

const headers = {
  Authorization: `Bearer ${apiToken}`,
  Prefer: 'return=representation', // ask for the updated entity after modifications (e.g. PATCH)
  Accept: 'application/json'
};

const dataHeaders = Object.assign({}, headers, {
  'Content-Type': 'application/json; charset=utf-8'
});

export const getProjects = () =>
  fetch(`${baseURL}/projects?select=id,name,billable,customer,responsible,active&order=id.desc`, {
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

export const createCustomer = body => fetch(`${baseURL}/customers`, {
  method: 'POST',
  headers: dataHeaders,
  body: JSON.stringify(body)
}).then(response => response.json());

export const getEmployees = () =>
  fetch(`${baseURL}/employees?select=id,first_name,last_name`, {
    headers
  }).then(response => response.json());
