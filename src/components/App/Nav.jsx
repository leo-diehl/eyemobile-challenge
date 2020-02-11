import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import styled from 'styled-components';

import { ReactComponent as LogoIcon } from '../../assets/icons/ic_logo.svg';
import { ReactComponent as ToggleIcon } from '../../assets/icons/ic_menu.svg';

// -- Component
function getMainRoute(path) {
  const routeTree = path.split('/');
  return routeTree.length && routeTree[1];
}
class Menu extends Component {
  state = {
    showMenu: false,
  };

  toggleMenu = () => {
    this.setState((prevState) => ({ showMenu: !prevState.showMenu }));
  };

  hideMenu = () => {
    this.setState({ showMenu: false });
  };

  render() {
    const { routes } = this.props;
    const { showMenu } = this.state;

    const { pathname } = this.props.location; // eslint-disable-line
    const mainRoute = getMainRoute(pathname);

    const pageLinks = routes.map((route) => {
      return (
        <StyledNavLink
          to={route.default}
          key={route.default}
          className={getMainRoute(route.default) === mainRoute && 'active'}
        >
          <RouteButton onClick={this.hideMenu}>
            <route.icon />
            <p>{route.label}</p>
          </RouteButton>
        </StyledNavLink>
      );
    });

    return (
      <NavContainer>
        <ToggleButton
          className={showMenu && 'active'}
          onClick={this.toggleMenu}
        >
          <ToggleIcon />
        </ToggleButton>
        <MenuContainer className={showMenu && 'active'}>
          <LogoIcon className="logo-icon" />
          {pageLinks}
        </MenuContainer>
      </NavContainer>
    );
  }
}

// -- Styles
const NavContainer = styled.nav`
  position: absolute;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    position: relative;
  }
`;

const ToggleButton = styled.button`
  display: none;
  position: absolute;

  top: 14px;
  left: 10px;

  background: none;
  border: none;

  cursor: pointer;
  z-index: 3;
  transition: opacity 0.5s;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: block;

    &.active {
      opacity: 0.4;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;

  &:not(.active) {
    color: ${({ theme }) => theme.colors.teal900};

    svg {
      g {
        fill: ${({ theme }) => theme.colors.teal900} !important;
      }
    }
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 120px;
  height: 100%;
  padding: 20px;

  background-color: ${({ theme }) => theme.colors.teal600};

  text-align: center;
  font-family: ${({ theme }) => theme.fonts.primary.medium};

  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    position: fixed;
    overflow-y: hidden;

    width: 100%;
    height: auto;
    max-height: 0px;
    padding: 0;

    transition: max-height 0.6s, padding 0.6s;

    .logo-icon {
      display: none;
    }

    &.active {
      width: 100%;
      max-height: 200px;
      padding: 30px 0 12px 0;
    }
  }
`;

const RouteButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 24px;

  p {
    margin: 8px 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex-direction: row;
    margin: 10px 0;

    p {
      margin: 0 8px;
    }
  }
`;

// -- Props
Menu.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.object.isRequired,
    }),
  ),
};

// -----
export default withRouter(Menu);
