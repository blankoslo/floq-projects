import axios_ from 'axios';

const axios = axios_.create({
  baseURL: config.apiUri,
  timeout: 1000,
  headers: { Authorization: `Bearer ${apiToken}`, Prefer: 'plurality=singular' }
});

export const getProjects = () => axios.get('/projects?select=id,name,customer{*}');
