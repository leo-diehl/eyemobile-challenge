import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ReactComponent as SearchIcon } from '../../../assets/icons/ic_search.svg';

const icons = {
  search: SearchIcon,
};

// -- Component
function Input({ type = 'text', icon, ...props }) {
  const Icon = icon && icons[icon];

  return (
    <RelativeDiv>
      <StyledInput type={type} hasIcon={!!icon} {...props} />
      {icon && (
        <IconContainer>
          <Icon />
        </IconContainer>
      )}
    </RelativeDiv>
  );
}

// -- Styles
const RelativeDiv = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 36px;

  border-radius: 18px;
  border: 1px solid rgba(0, 0, 0, 0.13);

  padding-left: ${({ hasIcon }) => (hasIcon ? '42px' : 0)};

  font-family: ${({ theme }) => theme.fonts.primary.medium};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray600};

  ::placeholder {
    opacity: 0.7;
  }

  :focus {
    outline: none;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 7px;
  left: 9px;

  svg,
  path {
    fill: ${({ theme }) => theme.colors.gray600};
  }

  svg {
    height: 24px;
    width: 24px;
  }
`;

// -- Props
Input.propTypes = {
  type: PropTypes.oneOf(['number', 'text']),
  icon: PropTypes.oneOf(['search']), // Add more after adding new icons
};

// -----
export default Input;
