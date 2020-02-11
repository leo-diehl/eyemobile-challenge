import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Currency from '../UI/Currency/Currency';

// -- Component
function roundValue(value) {
  // Rounding the cents to make sure we only display multiples of 10 cents
  const rest = value % 0.1;
  if (rest) {
    return value + (rest < 0.05 ? -rest : 0.1 - rest);
  }

  return value;
}

function totalValue(props) {
  const { value } = props;

  return (
    <React.Fragment>
      <StyledH3>VALOR TOTAL</StyledH3>
      <FlexDiv>
        <CurrencySpan>R$</CurrencySpan>
        <StyledCurrency value={roundValue(value)} prefix="" />
      </FlexDiv>
    </React.Fragment>
  );
}

// -- Styles
const StyledH3 = styled.h3`
  font-size: 25px;
  font-family: ${({ theme }) => theme.fonts.secondary.bold};
  color: ${({ theme }) => theme.colors.gray600};

  margin: 0;
  margin-bottom: -4px;
`;

const FlexDiv = styled.div`
  display: flex;
  font-family: ${({ theme }) => theme.fonts.primary.medium};
  color: ${({ theme }) => theme.colors.teal600};
`;

const CurrencySpan = styled.span`
  font-size: 35px;
  display: inline-block;
  margin-top: 4px;
`;

const StyledCurrency = styled(Currency)`
  display: inline-block;

  font-size: 70px;
`;

// -- Props
totalValue.propTypes = {
  value: PropTypes.number.isRequired,
};

// -----
export default totalValue;
