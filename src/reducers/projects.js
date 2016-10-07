import * as Immutable from 'immutable';

import { FETCH_PROJECTS, UPDATE_PROJECT, CREATE_PROJECT } from '../actions/index';

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        loading: false,
        data: new Immutable.OrderedMap(action.payload.map(e => [e.id, e]))
          .sortBy(p => p.id.toLowerCase())
      };
    case CREATE_PROJECT:
      return {
        loading: false,
        data: state.data.set(action.payload.id, action.payload)
          .sortBy(p => p.id.toLowerCase())
      };
    case UPDATE_PROJECT:
      return {
        loading: false,
        // we get back a list of results since (conceptually) several entities might have been
        // updated. fold over the updated entities and update the current list.
        data: action.payload.reduce(
          (acc, e) => acc.set(e.id, e),
          state.data
        ).sortBy(p => p.id.toLowerCase())
      };
    default:
      return state;
  }
};
