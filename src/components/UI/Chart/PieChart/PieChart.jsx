import React from 'react';
import PropTypes from 'prop-types';

import { PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

// -- Component
function PieChart({ data, mapping, settings: propSettings }) {
  const defaultSettings = {
    width: 180,
    height: 180,
    innerRadius: 50,
    startAngle: -270,
    endAngle: -640,
    paddingAngle: 2,
  };
  const settings = Object.assign(defaultSettings, propSettings);

  const Charts = data.map((entry) => {
    return <Cell fill={entry.color} key={entry[mapping.name]} />;
  });

  return (
    <RechartsPieChart width={settings.width} height={settings.height}>
      <Pie
        data={data}
        nameKey={mapping.name}
        dataKey={mapping.value}
        {...settings}
      >
        {Charts}
      </Pie>
    </RechartsPieChart>
  );
}

// -- Props
PieChart.propTypes = {
  data: PropTypes.array.isRequired,
  mapping: PropTypes.shape({
    name: PropTypes.string, // Name's property key
    value: PropTypes.string, // Data's property key
  }).isRequired,
  settings: PropTypes.object,
};

// -----
export default PieChart;
