import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from '../../../assets/styles/theme';

import PieChart from './PieChart/PieChart';
import BarChart from './BarChart/BarChart';
import ChartDataTable from './ChartDataTable/ChartDataTable';

const components = {
  bar: BarChart,
  pie: PieChart,
};

const defaultNameKey = 'name';
const defaultValueKey = 'value';

// -- Component
function Chart({
  type,
  settings,
  data,
  mapping = { name: defaultNameKey, value: defaultValueKey },
  title,
  palette = 0,
  displayTotal = false,
}) {
  const ChartComponent = components[type];

  const fillColors = theme.palettes[palette];

  const colorfulData = data.map((entry, index) => ({
    ...entry,
    color: fillColors[index],
  }));

  return (
    <FlexContainer>
      <ChartTitle type={type}>{title}</ChartTitle>
      <ChartComponent
        settings={settings}
        data={colorfulData}
        mapping={mapping}
      />
      <ChartDataTable
        data={colorfulData}
        mapping={mapping}
        displayTotal={displayTotal}
        type={type}
      />
    </FlexContainer>
  );
}

// -- Styles
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ChartTitle = styled.h3`
  font-size: 25px;
  font-family: ${({ theme }) => theme.fonts.secondary.bold};
  color: ${({ theme }) => theme.colors.gray600};

  margin: 0;
  margin-bottom: ${({ type }) => type === 'bar' && '28px'};
`;

// -- Props
/*
    This validation will assure that all the data
  entries have all the mapped "name" and "value" keys
*/
function dataValidation(props, propName, componentName) {
  const data = props[propName];
  if (!Array.isArray(data)) {
    return new Error(
      `Invalid prop "data" supplied to ${componentName}. The value must be an Array.`,
    );
  }

  const nameKey = props.mapping ? props.mapping.name : defaultNameKey;
  const valueKey = props.mapping ? props.mapping.value : defaultValueKey;

  // Assuring that all entries have the needed keys
  const invalidEntry = data.findIndex(
    (entry) => entry[nameKey] === undefined || entry[valueKey] === undefined,
  );

  if (invalidEntry !== -1) {
    return new Error(
      `Invalid prop "data" supplied to ${componentName}. The data[${invalidEntry}] is missing some property.`,
    );
  }
}

Chart.propTypes = {
  // Component
  type: PropTypes.oneOf(['pie', 'bar']).isRequired,
  settings: PropTypes.object,
  // Data
  data: dataValidation,
  mapping: PropTypes.shape({
    name: PropTypes.string, // Name's property key
    value: PropTypes.string, // Data's property key
  }),
  // Display
  title: PropTypes.string,
  palette: PropTypes.number,
  displayTotal: PropTypes.bool,
};

// -----
export default Chart;
