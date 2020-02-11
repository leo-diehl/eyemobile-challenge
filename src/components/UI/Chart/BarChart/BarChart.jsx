import React from 'react';
import PropTypes from 'prop-types';

import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  YAxis,
  CartesianGrid,
} from 'recharts';

import './barchart.css';
import BarShape from './BarShape';

// -- Component
const defaultSettings = {
  width: '100%',
  height: 220,
};

function getScaleByPortions(total, portionsCount) {
  let scale = total / portionsCount;

  /* This will grab only the highest digit and fill the rest with zeros
    Ex:
      2540.3 will turn into 2000
      327.31 will turn into 300
  */
  scale = scale.toFixed();
  const scaleZeros = scale.length > 1 && scale.slice(1).replace(/[0-9]/g, '0');
  scale = `${scale[0]}${scaleZeros}`;

  return parseInt(scale);
}

function getValueTicks(total, scale) {
  const ticks = [];

  let pointsCount = Math.floor(total / scale) - 1;
  pointsCount = pointsCount > 0 ? pointsCount : 0;

  for (const point of Array(pointsCount).keys()) {
    ticks.push(scale + scale * point);
  }

  return ticks;
}

function BarChart({ data: propsData, mapping, settings: propsSettings }) {
  const settings = Object.assign(defaultSettings, propsSettings);

  const { name: nameKey, value: valueKey } = mapping;

  const data = propsData.map((entry) => ({
    ...entry,
    // Format to suit the "recharts" BarChart: 'entryName': 'entryValue'
    [entry[nameKey]]: entry[valueKey],
  }));

  // Getting the value ticks for the graph
  const total = data.reduce((acm, cur) => {
    return acm + cur[valueKey];
  }, 0);
  const scale = getScaleByPortions(total, 6);
  const valueTicks = getValueTicks(total, scale);

  const Bars = data.map((entry) => {
    const entryName = entry[nameKey];
    return (
      <Bar
        dataKey={entryName}
        fill={entry.color}
        key={entryName}
        shape={<BarShape />}
        maxBarSize={30}
      />
    );
  });

  return (
    <ResponsiveContainer width={settings.width} height={settings.height}>
      <RechartsBarChart data={data} {...settings}>
        <CartesianGrid vertical={false} />
        <YAxis
          tickLine={false}
          ticks={valueTicks}
          interval="preserveStart"
          tickFormatter={(tick) => `R$ ${tick}`}
          axisLine={false}
          tickMargin="8"
        />
        {Bars}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

// -- Props
BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  mapping: PropTypes.shape({
    name: PropTypes.string, // Name's property key
    value: PropTypes.string, // Data's property key
  }).isRequired,
  settings: PropTypes.object,
};

// -----
export default BarChart;
