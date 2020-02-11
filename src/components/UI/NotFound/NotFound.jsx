import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ReactComponent as CuriousCat } from '../../../assets/images/curious-cat.svg';

// -- Component
function NotFound({ text }) {
  return (
    <Container>
      <StyledCuriousCat />
      <StyledP>{text}</StyledP>
    </Container>
  );
}

// -- Styles
const Container = styled.div`
  position: relative;

  padding: 10px;
  margin-top: 100px;
  width: 360px;
`;

const StyledCuriousCat = styled(CuriousCat)`
  position: absolute;

  width: 200px;
  height: 145px;
  left: 40px;

  path {
    fill: ${({ theme }) => theme.colors.gray900};
    opacity: 0.28;
  }
`;

const StyledP = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary.heavy};
  color: ${({ theme }) => theme.colors.gray600};

  position: relative;
  top: 140px;

  font-size: 18px;
  text-align: center;
`;

// -- Props
NotFound.propTypes = {
  text: PropTypes.string.isRequired,
};

// -----
export default NotFound;
