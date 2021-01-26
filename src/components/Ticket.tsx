import React from 'react';
import { iTicket } from 'types/ticket';

interface iTicketProps extends iTicket {
  lol?: number
}

const Ticket: React.FunctionComponent<iTicketProps> = ({ title, id }) => {
  return (
    <div className="ticket-wrapper">
      <span className="title">{ title }</span>
      <span className="id">{ id }</span>
    </div>
  );
};

export default Ticket;
