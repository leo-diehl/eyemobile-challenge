import React from 'react';
import PropTypes from 'prop-types';

import ReactLoaderSpinner from 'react-loader-spinner';

import themeColors from '../../../assets/styles/theme/colors';

// -- Component
function Loader({ height = 80, width = 80, type = 'TailSpin' }) {
  return (
    <ReactLoaderSpinner
      type={type}
      color={themeColors.teal600}
      height={height}
      width={width}
    />
  );
}

// -- PropTypes
Loader.propTypes = {
  type: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

// -----
export default Loader;
