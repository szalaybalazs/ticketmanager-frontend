import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Providers from 'providers';
import { Skeleton } from 'layout';

// Routes
import Sprint from './Sprint';

const Navigation: React.FunctionComponent = () => {
  return (
    <Providers>
      <Skeleton>
        <Router>
          <Switch>
            <Route path='/' exact component={Sprint} />
          </Switch>
        </Router>
      </Skeleton>
    </Providers>
  );
};

export default Navigation;
