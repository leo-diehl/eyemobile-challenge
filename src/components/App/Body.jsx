import React from 'react';

import styled from 'styled-components';
import Breadcrumb from '../UI/Breadcrumb/Breadcrumb';
import Routes from '../../routes/Routes';

// -- Component
function Body() {
  return (
    <BackgroundDiv>
      <Breadcrumb />
      <Routes />
    </BackgroundDiv>
  );
}

// -- Styles
const BackgroundDiv = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

// -----
export default Body;
