import React from 'react';
import Ticket from './Ticket';
import { status, iTicket } from 'types/ticket';
interface iListProps {
  type: status
  tickets: iTicket[]
}

const List: React.FunctionComponent<iListProps> = ({ type, tickets }) => {
  return (
    <div className="list-wrapper">
      { type }
      { 
        tickets.map(ticket => <Ticket { ...ticket } key={ticket.id} />)
      }
    </div>
  );
};

export default List;
