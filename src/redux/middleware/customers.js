import { batch } from 'react-redux';

import {
  setCustomersFetchingStatus,
  setCustomersFetchResult,
} from '../actions';

import { get as getCustomers } from '../../services/customers';

export default function fetch(filters) {
  return (dispatch) => {
    dispatch(setCustomersFetchingStatus(true));

    getCustomers(filters)
      .then((customers) => {
        batch(() => {
          dispatch(setCustomersFetchResult({ customers }));
          dispatch(setCustomersFetchingStatus(false));
        });
      })
      .catch((error) => {
        batch(() => {
          dispatch(setCustomersFetchResult({ error }));
          dispatch(setCustomersFetchingStatus(false));
        });
      });
  };
}
