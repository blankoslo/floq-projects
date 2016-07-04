import * as Immutable from 'immutable';
import { combineReducers } from 'redux';

import { FETCH_PROJECTS,
         SELECT_PROJECT,
         UPDATE_PROJECT,
         CREATE_PROJECT,
         FETCH_CUSTOMERS,
         FORM_UPDATE_VALUE,
         FORM_RESET,
         CREATE_CUSTOMER } from '../actions/index';

const projectsReducer = (previousState = {
  loading: true,
  data: new Immutable.Map()
}, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        loading: false,
        data: new Immutable.Map(action.payload.map(e => [e.id, e]))
      };
    case CREATE_PROJECT:
      return {
        loading: false,
        data: previousState.data.set(action.payload.id, action.payload)
      };
    case UPDATE_PROJECT:
      return {
        loading: false,
        // we get back a list of results since (conceptually) several entities might have been
        // updated. fold over the updated entities and update the current list.
        data: action.payload.reduce(
          (acc, e) => acc.set(e.id, e),
          previousState.data
        )
      };
    default:
      return previousState;
  }
};

const selectedProjectReducer = (previousState = null, action) => {
  switch (action.type) {
    case SELECT_PROJECT:
      return action.payload;
    default:
      return previousState;
  }
};

const lowerCaseName = c => c.name.toLowerCase();

const customersReducer = (previousState = {
  loading: true,
  data: new Immutable.OrderedMap()
}, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS:
      return {
        loading: false,
        data: new Immutable.OrderedMap(action.payload.map(e => [e.id, e])).sortBy(lowerCaseName)
      };
    case CREATE_CUSTOMER:
      return {
        loading: false,
        data: previousState.data.set(action.payload.id, action.payload).sortBy(lowerCaseName)
      };
    default:
      return previousState;
  }
};

const defaultForm = {
  loading: true,
  data: new Immutable.Map()
};

const formReducer = (previousState = defaultForm, action) => {
  switch (action.type) {
    case FORM_RESET:
      return defaultForm;
    case FORM_UPDATE_VALUE: {
      return {
        loading: false,
        data: previousState.data.merge(action.payload)
      };
    }
    case CREATE_CUSTOMER:
      return {
        loading: false,
        data: previousState.data.set('customer', action.payload.id)
        .set('id', `${action.payload.name.substring(0, 3).toUpperCase()}1000`)
      };
    default:
      return previousState;
  }
};

const rootReducer = combineReducers({
  projects: projectsReducer,
  selected_project: selectedProjectReducer,
  customers: customersReducer,
  form: formReducer
});

export default rootReducer;
