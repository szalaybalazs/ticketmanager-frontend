import React from 'react';
import List from './List';

import { iTicket, status } from 'types/ticket';

interface iSprintProps {
  tickets: iTicket[]
}

const LISTS: status[] = ['TODO', 'INPROGRESS', 'COMPLETED'];

const Sprint: React.FunctionComponent<iSprintProps> = ({ tickets }) => {
  return (
    <div className="sprint-wrapper">
      {
        LISTS.map(type => <List key={type} type={type} tickets={tickets.filter(ticket => ticket.status === type)} />)
      }
    </div>
  );
};

export default Sprint;
