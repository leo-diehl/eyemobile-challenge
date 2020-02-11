// Revenue
import Revenue from '../pages/revenue/Revenue';
import { ReactComponent as RevenueIcon } from '../assets/icons/ic_dashboard.svg';

// Register
import Register from '../pages/register/Register';
import { ReactComponent as RegisterIcon } from '../assets/icons/ic_cadastro.svg';

const routes = [
  {
    path: '/revenue/:submodule',
    default: '/revenue/cashflow',
    label: 'Meu Faturamento',
    component: Revenue,
    icon: RevenueIcon,
  },
  {
    path: '/register',
    default: '/register',
    label: 'Cadastro',
    component: Register,
    icon: RegisterIcon,
  },
  // ...
];

const references = routes.map((r) =>
  Object.assign(
    {},
    { path: r.path, default: r.default, label: r.label, icon: r.icon },
  ),
);

export { routes, references };
