import React from 'react';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import { references as routeReferences } from '../../../routes';

// -- Component
function getMainRoute(path) {
  const routeTree = path.split('/');
  return routeTree.length && routeTree[1];
}

function Breadcrumb(props) {
  function currentRouteLabel() {
    const { pathname } = props.location;
    const mainRoute = getMainRoute(pathname);

    const currentRoute = routeReferences.find(
      (route) => getMainRoute(route.path) === mainRoute,
    );

    return currentRoute && currentRoute.label;
  }

  return (
    <BreadcrumbContainer>
      <Crumb first>PETSHOP</Crumb>
      <Crumb>{currentRouteLabel()}</Crumb>
    </BreadcrumbContainer>
  );
}

// -- Styles
const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  height: 80px;
  width: 100%;
  padding: 10px 20px 12px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    height: auto;
  }
`;

const Crumb = styled.p`
  font-size: 13px;
  text-transform: uppercase;
  white-space: nowrap;
  font-family: ${({ theme }) => theme.fonts.primary.heavy};

  color: ${({ theme }) => theme.colors.gray600};

  padding: 0 30px;
  ${(props) =>
    props.first && `border-right: 1px solid ${props.theme.colors.gray600};`}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    ${(props) => props.first && 'padding-left: 40px'}
  }
`;

// -- PropTypes
Breadcrumb.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

// -----
export default withRouter(Breadcrumb);
