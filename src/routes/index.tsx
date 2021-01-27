import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Providers from 'providers';
import { Skeleton } from 'layout';

// Routes
import Sprint from './Sprint';

const Navigation: React.FunctionComponent = () => {
  return (
    <Providers>
      <Skeleton>
        <Switch>
          <Route path='/' exact component={Sprint} />
        </Switch>
      </Skeleton>
    </Providers>
  );
};

export default Navigation;
