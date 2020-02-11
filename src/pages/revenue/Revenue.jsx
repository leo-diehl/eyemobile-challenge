import React from 'react';
import styled from 'styled-components';

import { ReactComponent as CustomersIcon } from '../../assets/icons/ic_clientes.svg';
import { ReactComponent as CashflowIcon } from '../../assets/icons/ic_totais.svg';

import SubNav from '../../components/UI/SubNav/SubNav';

import Customers from '../../components/Customers/Customers';
import Cashflow from '../../components/Cashflow/Cashflow';

const subModules = [
  {
    label: 'TOTAIS',
    path: '/revenue/cashflow',
    icon: CashflowIcon,
  },
  {
    label: 'CLIENTES',
    path: '/revenue/customers',
    icon: CustomersIcon,
  },
  // ...
];

export default function Revenue(props) {
  /* eslint-disable */
  const {
    params: { submodule },
  } = props.match;
  /* eslint-enable */

  return (
    <Container>
      <SubNav routes={subModules} />
      {submodule === 'cashflow' ? <Cashflow /> : <Customers />}
    </Container>
  );
}

// -- Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg + 1}px) {
    flex-direction: row;
  }
`;
