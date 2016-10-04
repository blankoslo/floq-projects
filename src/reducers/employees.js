import * as Immutable from 'immutable';

import { FETCH_EMPLOYEES } from '../actions/index';

const name = e => `${e.first_name} ${e.last_name}`;

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return {
        loading: false,
        data: new Immutable.List(action.payload.map(e => ({ id: e.id, name: name(e) })))
          .sortBy(e => e.name.toLowerCase())
      };
    default:
      return state;
  }
};
