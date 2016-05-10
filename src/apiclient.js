import axios_ from 'axios';

const axios = axios_.create({
  baseURL: 'https://api-dev.floq.no',
  timeout: 1000,
  headers: { Authorization: `Bearer ${apiToken}` }
});

export const getProjects = () => axios.get('/projects?select=id,name,customer{*}');
