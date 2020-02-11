import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from '.';

export default function Routes() {
  const RouteComponents = routes.map((route) => (
    <Route path={route.path} component={route.component} key={route.path} />
  ));

  return <Switch>{RouteComponents}</Switch>;
}
