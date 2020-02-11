import {
  SET_CASHFLOW_FETCHING_STATUS,
  SET_CASHFLOW_FETCH_RESULT,
  SET_CASHFLOW_FILTERS,
} from '../actionTypes';

const initialState = {
  data: null,
  filters: {
    date: {
      value: 'today',
    },
  },
  fetching: false,
  error: null,
};

export default function(state = initialState, { type, payload, error }) {
  switch (type) {
    case SET_CASHFLOW_FETCHING_STATUS: {
      return {
        ...state,
        fetching: payload,
      };
    }
    case SET_CASHFLOW_FETCH_RESULT: {
      return {
        ...state,
        data: payload,
        error,
      };
    }
    case SET_CASHFLOW_FILTERS: {
      return {
        ...state,
        filters: payload,
      };
    }
    default:
      return state;
  }
}
