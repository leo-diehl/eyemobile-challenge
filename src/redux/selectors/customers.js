import { createSelector } from 'reselect';

export const getCustomers = createSelector(
  (state) => state.customers.data,
  (data) => data,
);

export const getCustomersFetchingStatus = createSelector(
  (state) => state.customers.fetching,
  (fetching) => fetching,
);

export const getCustomersFetchError = createSelector(
  (state) => state.customers.error,
  (error) => error,
);

export const getCustomersFilters = createSelector(
  (state) => state.customers.filters,
  (filters) => filters,
);

export const emptyCustomersFetch = createSelector(
  (state) => ({
    fetching: state.customers.fetching,
    data: state.customers.data,
  }),
  ({ fetching, data }) => !fetching && (!data || !data.length),
);
