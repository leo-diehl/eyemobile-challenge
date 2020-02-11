const mockedCustomers = [
  {
    id: 54878,
    name: 'Salma Fountain',
    document: '05017892001',
    birthdate: '26/07/1993',
    customer_since: '30/09/2019',
    last_purchase: '30/09/2019',
  },
  {
    id: 54879,
    name: 'Safa Bonner',
    document: '21380512000',
    birthdate: '18/06/1995',
    customer_since: '30/09/2019',
    last_purchase: '30/09/2019',
  },
  {
    id: 54880,
    name: 'Theodor Contreras',
    document: '96295342078',
    birthdate: '12/05/1990',
    customer_since: '30/09/2019',
    last_purchase: '30/09/2019',
  },
  {
    id: 54881,
    name: 'Zayn Donovan',
    document: '07449635089',
    birthdate: '06/01/1986',
    customer_since: '30/09/2019',
    last_purchase: '30/09/2019',
  },
  {
    id: 54882,
    name: 'Reuben Schmidt',
    document: '22169125060',
    birthdate: '30/09/1995',
    customer_since: '30/09/2019',
    last_purchase: '30/09/2019',
  },
  {
    id: 54883,
    name: 'Ferne Roman',
    document: '04353161091',
    birthdate: '03/08/1984',
    customer_since: '30/09/2019',
    last_purchase: '30/09/2019',
  },
  {
    id: 54884,
    name: 'Isa Barron',
    document: '81096395002',
    birthdate: '27/08/1996',
    customer_since: '30/09/2019',
    last_purchase: '30/09/2019',
  },
  {
    id: 54885,
    name: 'Precious Jeffery',
    document: '92840743043',
    birthdate: '28/11/1990',
    customer_since: '30/09/2019',
    last_purchase: '30/09/2019',
  },
  {
    id: 54886,
    name: 'Conrad Hurst',
    document: '41811506070',
    birthdate: '08/06/1967',
    customer_since: '30/09/2019',
    last_purchase: '30/09/2019',
  },
  {
    id: 54887,
    name: 'Ronald Callaghan',
    document: '78376198033',
    birthdate: '12/11/1965',
    customer_since: '30/09/2019',
    last_purchase: '30/09/2019',
  },
];

export function get(filters) {
  /*
      This filtering would usually occurr at the back-end.
      There can be millions of entries and you'll not want to
    store them all in the limited memory of your user computer.
  */

  let mockedResult = mockedCustomers; // Mocked

  if (filters && filters.search) {
    mockedResult = mockedResult.filter((customer) =>
      customer.name.toLowerCase().includes(filters.search.toLowerCase()),
    );
  }

  return Promise.resolve(mockedResult);
}
