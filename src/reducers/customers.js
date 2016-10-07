import * as Immutable from 'immutable';

import { FETCH_CUSTOMERS, CREATE_CUSTOMER } from '../actions/index';

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS:
      return {
        loading: false,
        data: new Immutable.OrderedMap(action.payload.map(c => [c.id, c]))
          .sortBy(c => c.name.toLowerCase())
      };
    case CREATE_CUSTOMER:
      return {
        loading: false,
        data: state.data.set(action.payload.id, action.payload)
          .sortBy(c => c.name.toLowerCase())
      };
    default:
      return state;
  }
};
