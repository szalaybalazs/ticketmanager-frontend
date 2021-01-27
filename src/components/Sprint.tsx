import React from 'react';
import List from './List';
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd';

import { iTicket, status } from 'types/ticket';

interface iSprintProps {
  tickets: iTicket[]
  updateTicket: (ticketId: string, destionation: DraggableLocation | undefined, source: DraggableLocation | undefined) => void
}

const LISTS: status[] = ['TODO', 'INPROGRESS', 'COMPLETED'];

const Sprint: React.FunctionComponent<iSprintProps> = ({ tickets, updateTicket }) => {
  
  const _handleUpdate = ({ draggableId, destination, source  }: DropResult) => updateTicket(draggableId, destination, source);

  return (
    <DragDropContext onDragEnd={_handleUpdate}>
      { JSON.stringify(updateTicket)}
      <div className="sprint-wrapper">
        {
          LISTS.map(type => <List key={type} type={type} tickets={tickets.filter(ticket => ticket.status === type)} />)
        }
      </div>
    </DragDropContext>
  );
};

export default Sprint;
