import React from 'react';
import PropTypes from 'prop-types';

import ReactCurrencyFormat from 'react-currency-format';

// -- Component
function Currency(props) {
  return (
    <ReactCurrencyFormat
      displayType={props.displayType || 'text'}
      prefix="R$ "
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      {...props}
    />
  );
}

// -- Props
Currency.propTypes = {
  displayType: PropTypes.string,
};

// -----
export default Currency;
