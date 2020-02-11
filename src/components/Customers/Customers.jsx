import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { connect, batch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { debounce } from 'lodash';

import { cpf as cpfMask } from '../../utils/masks';

import DataTable from '../UI/DataTable/DataTable';
import Input from '../UI/Input/Input';

import fetchCustomers from '../../redux/middleware/customers';
import { setCustomersFilters } from '../../redux/actions';
import {
  getCustomers,
  getCustomersFetchingStatus,
  getCustomersFetchError,
  getCustomersFilters,
  emptyCustomersFetch,
} from '../../redux/selectors/customers';

import Loader from '../UI/Loader/Loader';
import NotFound from '../UI/NotFound/NotFound';

class Customers extends Component {
  state = {
    search: '',
  };

  componentDidMount = () => {
    if (!this.props.fetched) {
      this.props.fetchCustomers();
    }

    this.setState({ search: this.props.filters.search });
  };

  shouldComponentRender = () => this.props.fetched;

  setSearchFilter = debounce(() => {
    batch(() => {
      const newFilters = Object.assign(this.props.filters, {
        search: this.state.search,
      });
      this.props.setCustomersFilters(newFilters);
      this.props.fetchCustomers(newFilters);
    });
  }, 300);

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value }, () => {
      this.setSearchFilter();
    });
  };

  columns = [
    {
      key: 'id',
      label: 'Id',
    },
    {
      key: 'name',
      label: 'Nome',
    },
    {
      key: 'document',
      label: 'Documento',
      render(value) {
        return cpfMask(value);
      },
    },
    {
      key: 'birthdate',
      label: 'Data Nascimento',
    },
    {
      key: 'customer_since',
      label: 'Cliente Desde',
    },
    {
      key: 'last_purchase',
      label: 'Última Compra',
    },
  ];

  render() {
    const { data, emptySet } = this.props;
    const { search } = this.state;

    return (
      <Wrapper>
        {!this.shouldComponentRender() ? (
          <Loader />
        ) : (
          <React.Fragment>
            <InputContainer>
              <Input
                icon="search"
                placeholder="PESQUISAR NOME"
                value={search}
                onChange={this.handleSearchChange}
              />
            </InputContainer>
            {emptySet ? (
              <NotFoundContainer>
                <NotFound text="Nenhum cliente encontrado nessa busca." />
              </NotFoundContainer>
            ) : (
              <DataTable data={data} columns={this.columns} />
            )}
          </React.Fragment>
        )}
      </Wrapper>
    );
  }
}

// -- Styles
const Wrapper = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md + 1}px) {
    padding-top: 30px;
  }
`;

const InputContainer = styled.div`
  padding: 0 10px;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm + 1}px) {
    width: 300px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md + 1}px) {
    padding: 0;
  }
`;

const NotFoundContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

// -- Props
Customers.propTypes = {
  data: PropTypes.array,
  fetched: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  filters: PropTypes.shape({
    search: PropTypes.string,
  }),
  error: PropTypes.bool,
  fetchCustomers: PropTypes.func.isRequired,
  setCustomersFilters: PropTypes.func.isRequired,
  emptySet: PropTypes.bool,
};

// -- Redux
const mapStateToProps = (state) => {
  return {
    data: getCustomers(state),
    fetched: state.customers.data !== null,
    fetching: getCustomersFetchingStatus(state),
    error: getCustomersFetchError(state),
    emptySet: emptyCustomersFetch(state),
    filters: getCustomersFilters(state),
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchCustomers,
      setCustomersFilters,
    },
    dispatch,
  );

// -----
export default connect(mapStateToProps, mapDispatchToProps)(Customers);
