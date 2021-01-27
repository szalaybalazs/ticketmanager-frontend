import React from 'react';
import { Sprint } from 'components';
import { Helmet } from 'react-helmet';

import { useSprint } from 'providers/sprint';

const SprintRoute: React.FunctionComponent = () => {
  const { sprint, tickets, updateTicket } = useSprint();
  return (
    <div className="sprint page-wrapper">
      <Helmet>
        <title>Sprint</title>
      </Helmet>
      <h1>{ sprint?.title }</h1>
      <h2>current sprint</h2>
      <Sprint tickets={tickets} updateTicket={updateTicket} />
    </div>
  );
};

export default SprintRoute;
