import { createSelector } from 'reselect';

const REVENUE = 'Receitas';

export const getCashflowTotal = createSelector(
  (state) => state.cashflow.data,
  (data) => {
    return (data || []).reduce((acm, cur) => {
      const { type, amount } = cur;

      // The cashflow contains revenue and expense entries
      if (type === REVENUE) {
        return acm + amount;
      }
      return acm - amount;
    }, 0);
  },
);

export const getCashflowByService = createSelector(
  (state) => state.cashflow.data,
  (data) => {
    const result = {};

    (data || [])
      // Services are products that generate revenue
      .filter((entry) => entry.type === REVENUE)
      .forEach((entry) => {
        const { product_name, amount } = entry;

        if (result[entry.product_id] === undefined) {
          result[entry.product_id] = { product_name, amount };
        } else {
          result[entry.product_id].amount += amount;
        }
      });

    return result;
  },
);

export const getCashflowByType = createSelector(
  (state) => state.cashflow.data,
  (data) => {
    const result = {
      revenue: 0,
      expense: 0,
    };

    (data || []).forEach((entry) => {
      if (entry.type === REVENUE) {
        return (result.revenue += entry.amount);
      }
      result.expense += entry.amount;
    });

    return result;
  },
);

export const getCashflowFetchingStatus = (state) => state.cashflow.fetching;

export const getCashflowFetchError = createSelector(
  (state) => state.cashflow.error,
  (error) => error,
);

export const emptyCashflowFetch = createSelector(
  (state) => ({
    fetching: state.cashflow.fetching,
    data: state.cashflow.data,
  }),
  ({ fetching, data }) => !fetching && (!data || !data.length),
);

export const getCashflowFilters = createSelector(
  (state) => state.cashflow.filters,
  (filters) => filters,
);
