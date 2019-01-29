import * as Immutable from 'immutable';

import { FETCH_PROJECTS, UPDATE_PROJECT, CREATE_PROJECT, TOGGLE_SHOW_INACTIVE_PROJECTS } from '../actions/index';

export default (state = { loading: true, data: new Immutable.Map(), excludeInactiveProjects: true }, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        ...state,
        loading: false,
        data: new Immutable.OrderedMap(action.payload.map(e => [e.id, e]))
          .sortBy(p => p.id.toLowerCase())
      };
    case CREATE_PROJECT:
      return {
        ...state,
        loading: false,
        data: state.data.set(action.payload.id, action.payload)
          .sortBy(p => p.id.toLowerCase())
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        loading: false,
        // we get back a list of results since (conceptually) several entities might have been
        // updated. fold over the updated entities and update the current list.
        data: action.payload.reduce(
          (acc, e) => acc.set(e.id, e),
          state.data
        ).sortBy(p => p.id.toLowerCase())
      };
    case TOGGLE_SHOW_INACTIVE_PROJECTS:
      return {
        ...state,
        excludeInactiveProjects: !state.excludeInactiveProjects
      }
    default:
      return state;
  }
};
