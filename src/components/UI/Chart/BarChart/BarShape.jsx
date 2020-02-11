import React from 'react';

import PropTypes from 'prop-types';

// -- Component
function BarShape({ x, y, width, height, fill }) {
  if (height === 0) {
    return null;
  }

  const arcRadius = width / 2;
  const arcY = y + arcRadius + 1;
  const arcPath = `M${x},${arcY || 0} a1,1 0 1,1 ${arcRadius * 2},0`;

  // Avoiding bugs related to the installed package
  let barHeight = height - arcRadius;
  barHeight = barHeight > 0 ? barHeight : 0;
  let barY = y + arcRadius;
  barY = barY > 0 ? barY : 0;

  return (
    <g fill={fill}>
      <rect x={x} y={barY} width={width} height={barHeight}></rect>
      <path d={arcPath} />
    </g>
  );
}

// -- Props
BarShape.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};

// -----
export default BarShape;
