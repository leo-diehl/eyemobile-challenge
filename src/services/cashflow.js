import moment from 'moment';

const mockedTransactions = [
  {
    id: 4512,
    amount: 644.52,
    type: 'Receitas',
    product_id: 26,
    product_name: 'Banho & Tosa',
    time: '2020-02-09 10:00:40.000000',
  },
  {
    id: 4513,
    amount: 644.52,
    type: 'Receitas',
    product_id: 27,
    product_name: 'Consultas',
    time: '2020-02-11 10:10:40.000000',
  },
  {
    id: 4514,
    amount: 644.52,
    type: 'Receitas',
    product_id: 28,
    product_name: 'Medicamentos',
    time: '2020-02-11 10:12:40.000000',
  },
  {
    id: 4515,
    amount: 644.52,
    type: 'Receitas',
    product_id: 26,
    product_name: 'Banho & Tosa',
    time: '2020-02-11 10:12:40.000000',
  },
  {
    id: 4515,
    amount: 744.52,
    type: 'Receitas',
    product_id: 26,
    product_name: 'Banho & Tosa',
    time: '2020-02-11 10:12:40.000000',
  },
  {
    id: 6512,
    amount: 2711.9,
    product_id: 29,
    type: 'Despesas',
    product_name: 'Folha de pagamento',
    time: '2020-01-30 10:00:40.000000',
  },
  {
    id: 4516,
    amount: 644.52,
    type: 'Receitas',
    product_id: 27,
    product_name: 'Consultas',
    time: '2020-02-11 10:12:40.000000',
  },
  {
    id: 4517,
    amount: 644.52,
    type: 'Receitas',
    product_id: 28,
    product_name: 'Medicamentos',
    time: '2020-02-06 10:12:40.000000',
  },
  {
    id: 4518,
    amount: 644.52,
    type: 'Receitas',
    product_id: 26,
    product_name: 'Banho & Tosa',
    time: '2020-02-06 14:12:40.000000',
  },
  {
    id: 4519,
    amount: 644.52,
    type: 'Receitas',
    product_id: 27,
    product_name: 'Consultas',
    time: '2020-02-06 15:12:40.000000',
  },
  {
    id: 4520,
    amount: 644.52,
    type: 'Receitas',
    product_id: 28,
    product_name: 'Medicamentos',
    time: '2020-02-06 15:16:40.000000',
  },
  {
    id: 4521,
    amount: 644.52,
    type: 'Receitas',
    product_id: 26,
    product_name: 'Banho & Tosa',
    time: '2020-02-06 15:28:40.000000',
  },
  {
    id: 4521,
    amount: 644.52,
    type: 'Receitas',
    product_id: 26,
    product_name: 'Banho & Tosa',
    time: '2020-02-06 15:28:40.000000',
  },
  {
    id: 6512,
    amount: 2711.9,
    product_id: 29,
    type: 'Despesas',
    product_name: 'Folha de pagamento',
    time: '2019-12-30 10:00:40.000000',
  },
  {
    id: 5512,
    amount: 773.43,
    type: 'Receitas',
    product_id: 26,
    product_name: 'Banho & Tosa',
    time: '2020-01-29 10:00:40.000000',
  },
  {
    id: 5513,
    amount: 773.43,
    type: 'Receitas',
    product_id: 28,
    product_name: 'Medicamentos',
    time: '2020-01-29 10:10:40.000000',
  },
  {
    id: 5514,
    amount: 773.43,
    type: 'Receitas',
    product_id: 27,
    product_name: 'Consultas',
    time: '2020-01-29 10:12:40.000000',
  },
  {
    id: 5515,
    amount: 773.43,
    type: 'Receitas',
    product_id: 27,
    product_name: 'Consultas',
    time: '2020-01-29 10:12:40.000000',
  },
  {
    id: 5516,
    amount: 773.43,
    type: 'Receitas',
    product_id: 26,
    product_name: 'Banho & Tosa',
    time: '2020-01-10 10:50:40.000000',
  },
  {
    id: 5512,
    amount: 515.62,
    product_id: 28,
    type: 'Receitas',
    product_name: 'Medicamentos',
    time: '2020-01-05 10:00:40.000000',
  },
  {
    id: 5513,
    amount: 515.62,
    type: 'Receitas',
    product_id: 26,
    product_name: 'Banho & Tosa',
    time: '2020-01-03 10:10:40.000000',
  },
  {
    id: 5514,
    amount: 515.62,
    type: 'Receitas',
    product_id: 26,
    product_name: 'Banho & Tosa',
    time: '2019-12-30 10:12:40.000000',
  },
  {
    id: 5515,
    amount: 515.62,
    product_id: 28,
    type: 'Receitas',
    product_name: 'Medicamentos',
    time: '2019-12-25 10:12:40.000000',
  },
  {
    id: 4521,
    amount: 644.52,
    type: 'Receitas',
    product_id: 26,
    product_name: 'Banho & Tosa',
    time: '2020-01-20 15:28:40.000000',
  },
  {
    id: 4521,
    amount: 644.52,
    type: 'Receitas',
    product_id: 26,
    product_name: 'Banho & Tosa',
    time: '2020-01-23 15:28:40.000000',
  },
  {
    id: 5516,
    amount: 515.62,
    type: 'Receitas',
    product_id: 26,
    product_name: 'Banho & Tosa',
    time: '2019-12-10 10:50:40.000000',
  },
  {
    id: 6512,
    amount: 2711.9,
    product_id: 29,
    type: 'Despesas',
    product_name: 'Folha de pagamento',
    time: '2019-11-30 10:00:40.000000',
  },
];

export default function get(filters) {
  /*
    This filtering would usually occurr at the back-end.
    There can be millions of entries and you'll not want to
    store them all in the limited memory of your user computer.
  */

  let mockedResult = mockedTransactions; // Mocked

  if (filters && filters.date) {
    const { value } = filters.date;

    let from,
      to = null;
    if (value === 'custom') {
      from = filters.date.from;
      to = filters.date.to;
    } else if (value === 'today') {
      from = moment();
      to = moment();
    } else if (value === 'last-week') {
      from = moment().subtract(7, 'days');
      to = moment();
    } else if (value === 'last-month') {
      from = moment().subtract(1, 'months');
      to = moment();
    }

    if (from && to) {
      mockedResult = mockedResult.filter(
        ({ time }) =>
          moment(time).isSameOrAfter(from, 'day') &&
          moment(time).isSameOrBefore(to, 'day'),
      ); // Filter by date
    }
  }

  return Promise.resolve(mockedResult);
}
