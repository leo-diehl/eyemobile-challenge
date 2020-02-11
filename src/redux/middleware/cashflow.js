import { batch } from 'react-redux';

import { setCashflowFetchingStatus, setCashflowFetchResult } from '../actions';

import getCashflow from '../../services/cashflow';

export default function fetch(filters) {
  return (dispatch) => {
    dispatch(setCashflowFetchingStatus(true));

    getCashflow(filters)
      .then((cashflow) => {
        batch(() => {
          dispatch(setCashflowFetchResult({ cashflow }));
          dispatch(setCashflowFetchingStatus(false));
        });
      })
      .catch((error) => {
        batch(() => {
          dispatch(setCashflowFetchResult({ error }));
          dispatch(setCashflowFetchingStatus(false));
        });
      });
  };
}
