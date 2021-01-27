import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { iTicket } from 'types/ticket';
interface iTicketProps extends iTicket {
  lol?: number
}

const Ticket: React.FunctionComponent<iTicketProps> = ({ title, id, index, status }) => {
  return (
    <Draggable draggableId={id} index={index}>{(provided) => {
      return (
        <div  
          className={`ticket-wrapper ${status?.toLowerCase()}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span className="title">{ title }</span>
          <span className="id">{ id }</span>
        </div>
      );
    }}</Draggable>
  );
};

export default Ticket;
