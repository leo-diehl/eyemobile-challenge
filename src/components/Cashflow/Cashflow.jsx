import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect, batch } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import moment from 'moment';

import fetchCashflow from '../../redux/middleware/cashflow';
import { setCashflowFilters } from '../../redux/actions';
import {
  getCashflowTotal,
  getCashflowByService,
  getCashflowByType,
  getCashflowFetchingStatus,
  getCashflowFetchError,
  getCashflowFilters,
  emptyCashflowFetch,
} from '../../redux/selectors/cashflow';

import DateRangeSelector from '../UI/DateRangeSelector/DateRangeSelector';
import Chart from '../UI/Chart/Chart';
import Loader from '../UI/Loader/Loader';

import NotFound from '../UI/NotFound/NotFound';
import TotalValue from './TotalValue';

// -- Component
class Cashflow extends Component {
  componentDidMount = () => {
    if (!this.props.fetched) {
      this.props.fetchCashflow(this.props.filters);
    }
  };

  shouldComponentRender = () => this.props.fetched;

  handleDateChanged = (date) => {
    const newFilters = { ...this.props.filters, date };
    batch(() => {
      this.props.setCashflowFilters(newFilters);
      this.props.fetchCashflow(newFilters);
    });
  };

  render() {
    const {
      total,
      totalByService,
      totalByType,
      filters,
      emptySet,
    } = this.props;
    const totalByTypeForChart = [
      { name: 'Receitas', value: totalByType.revenue },
      { name: 'Despesas', value: totalByType.expense },
    ];

    return (
      <Wrapper>
        <DateRangeSelector
          date={filters.date}
          onChange={this.handleDateChanged}
        />
        <Container>
          {emptySet ? (
            <NotFound text="Epa! Não achamos nada dentro desse período." />
          ) : (
            <Content>
              {!this.shouldComponentRender() ? (
                <Loader />
              ) : (
                <React.Fragment>
                  <TotalValue value={total} />
                  <Divider />
                  <ChartsWrapper>
                    <ChartContainer>
                      <Chart
                        type="pie"
                        title="SERVIÇOS"
                        data={Object.values(totalByService)}
                        mapping={{ name: 'product_name', value: 'amount' }}
                        palette={0}
                        displayTotal
                      />
                    </ChartContainer>
                    <ChartContainer>
                      <Chart
                        type="bar"
                        title="DESPESAS X RECEITAS"
                        data={totalByTypeForChart}
                        settings={{ scale: 2000 }}
                        palette={1}
                      />
                    </ChartContainer>
                  </ChartsWrapper>
                </React.Fragment>
              )}
            </Content>
          )}
        </Container>
      </Wrapper>
    );
  }
}

// -- Styles
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 960px;
  width: 100%;

  padding: 44px 16px;
`;

const Divider = styled.hr`
  width: 100%;
  margin-top: 36px;
  margin-bottom: 30px;

  opacity: 0.3;
`;

const ChartsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md + 1}px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
  }
`;

const ChartContainer = styled.div`
  width: 280px;
  margin-bottom: 50px;
`;

// -- Props
Cashflow.propTypes = {
  fetched: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  filters: PropTypes.shape({
    date: PropTypes.shape({
      value: PropTypes.string.isRequired,
      from: PropTypes.instanceOf(moment),
      to: PropTypes.instanceOf(moment),
    }),
  }),
  error: PropTypes.bool,
  total: PropTypes.number.isRequired,
  totalByService: PropTypes.objectOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      product_name: PropTypes.string.isRequired,
    }),
  ),
  totalByType: PropTypes.shape({
    expense: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
  }),
  fetchCashflow: PropTypes.func.isRequired,
  setCashflowFilters: PropTypes.func.isRequired,
  emptySet: PropTypes.bool,
};

// -- Redux
const mapStateToProps = (state) => ({
  fetched: state.cashflow.data !== null,
  fetching: getCashflowFetchingStatus(state),
  filters: getCashflowFilters(state),
  error: getCashflowFetchError(state),
  total: getCashflowTotal(state),
  totalByService: getCashflowByService(state),
  totalByType: getCashflowByType(state),
  emptySet: emptyCashflowFetch(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchCashflow,
      setCashflowFilters,
    },
    dispatch,
  );

// -----
export default connect(mapStateToProps, mapDispatchToProps)(Cashflow);
