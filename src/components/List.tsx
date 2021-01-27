import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Ticket from './Ticket';
import ListHeader from './ListHeader';

import { status, iTicket } from 'types/ticket';

interface iListProps {
  type: status
  tickets: iTicket[]
}

const List: React.FunctionComponent<iListProps> = ({ type, tickets }) => {
  return (
    <Droppable droppableId={type}>{(provided, snapshot) => {
      return (
        <div className={`list-wrapper ${snapshot.isDraggingOver ? 'over' : ''} ${snapshot.isUsingPlaceholder ? 'placeholder' : ''}`}>
          <ListHeader { ...{ type, numberOfCards: tickets.length }} />
          <div
            className="tickets" 
            ref={provided.innerRef}
          >
            { 
              tickets.sort((a, b) => a.index - b.index).map((ticket, index) => <Ticket { ...ticket } index={index} key={ticket.id} />)
            }
            { provided.placeholder }
          </div>
        </div>
      );
    }}
    </Droppable>
  );
};

export default List;
