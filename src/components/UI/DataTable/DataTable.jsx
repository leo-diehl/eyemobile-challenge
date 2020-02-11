import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// -- Component
function DataTable({ columns, data }) {
  let headers = columns.map((column) => [
    <th key={`header-${column.key}`}>{column.label}</th>,
    <SeparatorTh key={`header-${column.key}-spacer`} />,
  ]);

  // Removing last separator
  if (headers.length) {
    delete headers[headers.length - 1][1];
  }

  function getDataCels(row, rowIndex) {
    let cels = columns.map(({ key, render }, colIndex) => {
      return [
        <td key={`row-${rowIndex}-col-${colIndex}`}>
          {render !== undefined ? render(row[key]) : row[key]}
        </td>,
        <SeparatorTd key={`row-${rowIndex}-col-${colIndex}-spacer`} />,
      ];
    });

    // Removing last separator
    if (cels.length) {
      delete cels[cels.length - 1][1];
    }

    return cels;
  }

  const rows = (data || []).map((row, index) => {
    return <tr key={`row-${index}`}>{getDataCels(row, index)}</tr>;
  });

  return (
    <Container>
      <StyledTable cellspacing="12">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </StyledTable>
    </Container>
  );
}

// -- Styles
const Container = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;

  font-size: 12px;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;

  border-collapse: collapse;

  padding: 0 10px;

  thead {
    tr {
      height: 45px;
    }
  }

  tbody {
    tr {
      height: 40px;

      :nth-child(odd) {
        background-color: ${({ theme }) => theme.colors.gray300};
      }
    }
  }

  tr {
    padding: 0 10px;

    th:first-of-type,
    td:first-of-type {
      padding-left: 25px;
    }

    th:last-of-type,
    td:last-of-type {
      text-align: right;
      padding-right: 25px;
    }
  }

  th {
    font-family: ${({ theme }) => theme.fonts.primary.black};
    color: ${({ theme }) => theme.colors.teal600};
  }

  td {
    font-family: ${({ theme }) => theme.fonts.primary.medium};
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

const SeparatorTh = styled.th`
  min-width: 70px;
`;

const SeparatorTd = styled.td`
  min-width: 70px;
`;

// -- Props
DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
};

export default DataTable;
