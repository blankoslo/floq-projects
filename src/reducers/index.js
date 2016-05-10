import { combineReducers } from 'redux';

import { FETCH_PROJECTS } from '../actions/index';

const projectsReducer = (previousState = [], action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return action.payload.data;
    default:
      return previousState;
  }
};

const rootReducer = combineReducers({
  projects: projectsReducer
});

export default rootReducer;
