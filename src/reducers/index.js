import { combineReducers } from 'redux';

import { FETCH_PROJECTS, FETCH_PROJECT } from '../actions/index';

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
    default:
      return previousState;
  }
};

const rootReducer = combineReducers({
  projects: projectsListReducer,
  project: projectReducer
});

export default rootReducer;
