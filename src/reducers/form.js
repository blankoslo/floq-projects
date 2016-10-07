import * as Immutable from 'immutable';

import { FORM_RESET, FORM_UPDATE_VALUE, CREATE_CUSTOMER } from '../actions/index';

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  switch (action.type) {
    case FORM_RESET:
      return { loading: true, data: new Immutable.Map() };
    case FORM_UPDATE_VALUE: {
      return {
        loading: false,
        data: state.data.merge(action.payload)
      };
    }
    case CREATE_CUSTOMER:
      return {
        loading: false,
        data: state.data
          .set('customer', action.payload.id)
          // TODO: Customer code is now its own column
          .set('id', `${action.payload.name.substring(0, 3).toUpperCase()}1000`)
      };
    default:
      return state;
  }
};
