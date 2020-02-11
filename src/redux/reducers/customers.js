import {
  SET_CUSTOMERS_FETCHING_STATUS,
  SET_CUSTOMERS_FETCH_RESULT,
  SET_CUSTOMERS_FILTERS,
} from '../actionTypes';

const initialState = {
  data: null,
  fetching: false,
  error: null,
  filters: {
    search: '',
  },
};

export default function(state = initialState, { type, payload, error }) {
  switch (type) {
    case SET_CUSTOMERS_FETCHING_STATUS: {
      return {
        ...state,
        fetching: payload,
      };
    }
    case SET_CUSTOMERS_FETCH_RESULT: {
      return {
        ...state,
        data: payload,
        error,
      };
    }
    case SET_CUSTOMERS_FILTERS: {
      return {
        ...state,
        filters: payload,
      };
    }
    default:
      return state;
  }
}
