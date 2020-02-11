import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Currency from '../../Currency/Currency';

// -- Component
const defaultNameKey = 'name';
const defaultValueKey = 'value';

function ChartTable({
  data,
  mapping = { name: defaultNameKey, value: defaultValueKey },
  showPercentage = true,
  displayTotal = false,
  type,
}) {
  const { name: nameKey, value: valueKey } = mapping;

  const totalValue = data.reduce((acm, cur) => (acm += cur[valueKey]), 0);

  function getRowPercentage(value) {
    return Math.round((value / totalValue) * 100);
  }

  const Rows = data.map((row) => {
    return (
      <Row key={row[nameKey]}>
        <Icon color={row.color} />
        <Name>{row[nameKey]}</Name>
        <Value>
          <Currency value={row[valueKey]} />
          {showPercentage && ` (${getRowPercentage(row[valueKey])}%)`}
        </Value>
      </Row>
    );
  });

  if (displayTotal) {
    const totalRow = (
      <Row key="total">
        <Name extraBold>Total</Name>
        <Value>
          <Currency value={totalValue} />
          {showPercentage && ' (100%)'}
        </Value>
      </Row>
    );

    Rows.push(totalRow);
  }

  return <Container type={type}>{Rows}</Container>;
}

// -- Styles
const Container = styled.div`
  width: 100%;
  margin-top: ${({ type }) => (type === 'bar' ? '20px' : '8px')};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray900};

  margin-bottom: 34px;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 6px;

  background-color: ${({ color }) => color};
`;

const Name = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary.roman};
  font-weight: ${({ extraBold }) => (extraBold ? 900 : 600)};
  font-size: 10px;
  text-transform: uppercase;
  text-align: left;
`;

const Value = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary.black};

  font-size: 12px;
  margin-left: auto;
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

  const nameKey = props.mapping.name || defaultNameKey;
  const valueKey = props.mapping.value || defaultValueKey;

  // Assuring that all entries have the needed keys
  const invalidEntry = data.findIndex(
    (entry) =>
      entry[nameKey] === undefined ||
      entry[valueKey] === undefined ||
      entry.color === undefined,
  );

  if (invalidEntry !== -1) {
    return new Error(
      `Invalid prop "data" supplied to ${componentName}. The data[${invalidEntry}] is missing some property.`,
    );
  }
}

ChartTable.propTypes = {
  data: dataValidation,
  mapping: PropTypes.shape({
    name: PropTypes.string, // Name's property key
    value: PropTypes.string, // Data's property key
  }).isRequired,
  showPercentage: PropTypes.bool,
  displayTotal: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

// -----
export default ChartTable;
