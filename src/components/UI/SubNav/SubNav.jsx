import React from 'react';

import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';

// -- Component
function SubNav({ routes }) {
  const navButtons = routes.map((route) => (
    <NavButton to={route.path} key={route.path} activeclass="active">
      <route.icon />
      <span>{route.label}</span>
    </NavButton>
  ));

  return <NavContainer>{navButtons}</NavContainer>;
}

// -- Styles
const NavContainer = styled.nav`
  display: flex;

  width: 100%;
  padding: 18px 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg + 1}px) {
    flex-direction: column;
    width: auto;

    margin-left: 30px;
    padding: 30px 10px;
  }
`;

const NavButton = styled(NavLink)`
  display: flex;
  align-items: center;
  padding-right: 20px;

  background: none;

  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.primary.heavy};
  text-decoration: none !important;
  color: ${({ theme }) => theme.colors.gray600};

  cursor: pointer;

  svg {
    margin-right: 10px;
  }

  &:not(.active) {
    opacity: 0.5;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg + 1}px) {
    margin-bottom: 20px;
  }
`;

// -- PropTypes
SubNav.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.object.isRequired,
    }).isRequired,
  ),
};

// -----
export default SubNav;
