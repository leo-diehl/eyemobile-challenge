import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styled from 'styled-components';

import { DateRangePicker } from 'react-dates';

import widthBreakpoints from '../../../assets/styles/theme/breakpoints';

// -- Component
class DateRangeSelector extends Component {
  state = {
    datePickerFocus: null,
    windowWidth: null,
    startDate: null,
    endDate: null,
  };

  updateWindowWidth = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  componentDidMount() {
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth);
  }

  updateDateRange = (startDate, endDate) => {
    this.setState({ startDate, endDate });
    this.props.onChange({ startDate, endDate });
  };

  availableRanges = [
    {
      small: true,
      label: 'HOJE',
      value: 'today',
      onClick: () => {
        this.props.onChange({ value: 'today' });
      },
    },
    {
      label: 'ÚLTIMA SEMANA',
      value: 'last-week',
      onClick: () => {
        this.props.onChange({ value: 'last-week' });
      },
    },
    {
      label: 'ÚLTIMO MÊS',
      value: 'last-month',
      onClick: () => {
        this.props.onChange({ value: 'last-month' });
      },
    },
    {
      label: 'OUTRO PERÍODO',
      value: 'custom',
      onClick: () => {
        this.setState({
          datePickerFocus: 'startDate',
          startDate: null,
          endDate: null,
        });
      },
    },
  ];

  isSmallScreen = () => {
    return this.state.windowWidth < widthBreakpoints.md;
  };

  handlePickedDate = ({ startDate, endDate }) => {
    if (endDate) {
      this.setState({ endDate });

      //  We only want to change the filters when both
      // start and end dates are picked, to avoid reloading
      // the whole component after selecting the range.
      return this.props.onChange({
        value: 'custom',
        from: startDate,
        to: endDate,
      });
    }

    this.setState({ startDate });
    this.setState({ datePickerFocus: 'endDate' });
  };

  setPickerFocus = (datePickerFocus) => {
    this.setState({ datePickerFocus });
  };

  dateRangeStaticProps = {
    startDateId: 'startDateId',
    endDateId: 'endDateId',
    withPortal: true,
    disableScroll: true,
    noBorder: true,
    isDayBlocked: function noRefCheck() {},
    isDayHighlighted: function noRefCheck() {},
    isOutsideRange: function noRefCheck() {},
    daySize: 40,
    minimumNights: 0, // Allow single day
  };

  render() {
    const { value: selectedValue, from, to } = this.props.date;

    let customLabel = null;
    if (selectedValue === 'custom' && from && to) {
      customLabel = `
      ${from.format('D [de] MMM [de] YYYY')}
      - ${to.format('D [de] MMM [de] YYYY')}
    `;
    }

    const rangeButtons = this.availableRanges.map(
      ({ small, value, label, onClick }) => (
        <RangeButton
          small={small}
          active={value === selectedValue}
          onClick={() => onClick()}
          key={value}
          style={
            value === 'custom' && customLabel ? { minWidth: 'auto' } : null
          }
          custom={value === 'custom'}
        >
          <StyledSpan>
            {value === 'custom' && customLabel ? customLabel : label}
          </StyledSpan>
        </RangeButton>
      ),
    );

    return (
      <SelectorContainer>
        {rangeButtons}
        <DateRangePicker
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={this.handlePickedDate}
          focusedInput={this.state.datePickerFocus}
          onFocusChange={this.setPickerFocus}
          orientation={this.isSmallScreen() ? 'vertical' : 'horizontal'}
          withFullScreenPortal={this.isSmallScreen()}
          {...this.dateRangeStaticProps}
        />
      </SelectorContainer>
    );
  }
}

// -- Styles
const SelectorContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;

  overflow-x: auto;

  padding: 16px;

  div.DateRangePickerInput {
    display: none !important;
  }
`;

const RangeButton = styled.button`
  cursor: pointer;

  color: #fff;
  background-color: ${({ theme }) => theme.colors.teal600};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  order: ${({ active, custom }) => (active && custom ? -1 : 0)};

  border: none;
  border-radius: 20px;

  height: ${({ theme }) => theme.form.medium.height};
  min-width: ${(props) => (props.small ? '80px' : '110px')};
  padding: 0 16px;
  margin-right: 12px;

  font-size: 16px;
  white-space: nowrap;
`;

const StyledSpan = styled.span`
  font-family: ${({ theme }) => theme.fonts.secondary.bold};
`;

// -- Props
DateRangeSelector.propTypes = {
  date: PropTypes.shape({
    value: PropTypes.string.isRequired,
    from: PropTypes.instanceOf(moment),
    to: PropTypes.instanceOf(moment),
  }),
  onChange: PropTypes.func.isRequired,
};

// -----
export default DateRangeSelector;
