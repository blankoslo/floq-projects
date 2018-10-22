import * as Immutable from 'immutable';
import * as api from '../apiclient';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const SELECT_PROJECT = 'SELECT_PROJECT';
export const FETCH_CUSTOMERS = 'FETCH_CUSTOMERS';
export const FORM_UPDATE_VALUE = 'FORM_UPDATE_VALUE';
export const FORM_RESET = 'FORM_RESET';
export const CREATE_CUSTOMER = 'CREATE_CUSTOMER';
export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
export const API_ERROR = 'API_ERROR';
export const fetchProjects = () => ({
  type: FETCH_PROJECTS,
  payload: api.getProjects()
});

export const updateProject = (id, data) => ({
  type: UPDATE_PROJECT,
  payload: api.updateProject(id, data)
});

export const createProject = data => ({
  type: CREATE_PROJECT,
  payload: api.createProject(data)
});

export const selectProject = id => ({
  type: SELECT_PROJECT,
  payload: id
});

export const fetchCustomers = () => ({
  type: FETCH_CUSTOMERS,
  payload: api.getCustomers()
});

export const updateField = (fieldName, value) => ({
  type: FORM_UPDATE_VALUE,
  payload: new Immutable.Map({ [fieldName]: value })
});

export const resetForm = () => ({
  type: FORM_RESET
});

export const createCustomer = data => ({
  type: CREATE_CUSTOMER,
  payload: api.createCustomer(data)
});

export const fetchEmployees = () => ({
  type: FETCH_EMPLOYEES,
  payload: api.getEmployees()
});
export const apiError = error => ({
  type: API_ERROR,
  payload: error
});
