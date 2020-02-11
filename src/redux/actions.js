import {
  SET_CUSTOMERS_FETCHING_STATUS,
  SET_CUSTOMERS_FETCH_RESULT,
  SET_CUSTOMERS_FILTERS,
  SET_CASHFLOW_FETCHING_STATUS,
  SET_CASHFLOW_FETCH_RESULT,
  SET_CASHFLOW_FILTERS,
} from './actionTypes';

// Customers
export const setCustomersFetchingStatus = (status) => ({
  type: SET_CUSTOMERS_FETCHING_STATUS,
  payload: status,
});

export const setCustomersFetchResult = ({ customers, error }) => ({
  type: SET_CUSTOMERS_FETCH_RESULT,
  payload: customers,
  error,
});

export const setCustomersFilters = (filters) => ({
  type: SET_CUSTOMERS_FILTERS,
  payload: filters,
});

// Cashflow
export const setCashflowFetchingStatus = (status) => ({
  type: SET_CASHFLOW_FETCHING_STATUS,
  payload: status,
});

export const setCashflowFetchResult = ({ cashflow, error }) => ({
  type: SET_CASHFLOW_FETCH_RESULT,
  payload: cashflow,
  error,
});

export const setCashflowFilters = (filters) => ({
  type: SET_CASHFLOW_FILTERS,
  payload: filters,
});
