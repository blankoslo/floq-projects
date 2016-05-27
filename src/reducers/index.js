import { combineReducers } from 'redux';

import { FETCH_PROJECTS,
         FETCH_PROJECT,
         DESELECT_PROJECT,
         UPDATE_PROJECT,
         CREATE_PROJECT,
         FETCH_CUSTOMERS } from '../actions/index';

const projectsListReducer = (previousState = [], action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return action.payload.data;
    default:
      return previousState;
  }
};

const projectReducer = (previousState = {}, action) => {
  switch (action.type) {
    case FETCH_PROJECT:
      return action.payload.data;
    case DESELECT_PROJECT:
      return {};
    case UPDATE_PROJECT:
      return Object.assign(previousState, action.payload.data);
    case CREATE_PROJECT:
      return Object.assign(previousState, action.payload.data);
    default:
      return previousState;
  }
};

const customersReducer = (previousState = [], action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS:
      return action.payload.data;
    default:
      return previousState;
  }
};

const rootReducer = combineReducers({
  projects: projectsListReducer,
  project: projectReducer,
  customers: customersReducer
});

export default rootReducer;
