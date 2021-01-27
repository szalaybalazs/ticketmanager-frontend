import { useEffect, useState } from 'react';
import { iSprint } from 'types/sprint';
import { iTicket, status } from 'types/ticket';
import { iBoard } from 'types/board';
import { request } from 'core';
import { DraggableLocation } from 'react-beautiful-dnd';

interface iUseSprint {
  sprint: iSprint | null
  board: iBoard | null
  tickets: iTicket[]
  loading: boolean
  error: Error | string | null
  updateTicket: (ticketId: string, destionation: DraggableLocation | undefined, source: DraggableLocation | undefined) => void
}

interface iTicketChange {
  id: string,
  change: any
}

interface iTicketList {
  'TODO': iTicket[]
  'INPROGRESS': iTicket[]
  'COMPLETED': iTicket[]
}

/**
 * Sort ticket list and map statuses
 * @param tickets ticketlist
 */
const sortTickets = (tickets: iTicket[], status?: status): iTicket[] => {
  const mapping = {
    'TODO': 0,
    INPROGRESS: 0,
    COMPLETED: 0,
    BACKLOG: 0
  };
  return [...tickets].sort((a, b) => a.index - b.index).map((ticket: iTicket) => {
    ticket.index = mapping[ticket.status || 'BACKLOG']++;
    return ticket;
  }).filter(ticket => !status || ticket.status === status);
};

/**
 * MapTicket indexes
 * @param tickets ticketlist
 */
const mapTickets = (tickets: iTicket[]): any => tickets
  .map((ticket, index: number) => ({ ...ticket, index }))
  .reduce((prev, ticket: iTicket) => ({ ...prev, [ticket.id]: ticket }), {});

const STATUSES: status[] = ['BACKLOG', 'TODO', 'INPROGRESS', 'COMPLETED'];

/**
 * Retreiving sprint information
 * @param boardId the board's identifier - shortname
 * @param sprintId the sprits identifier
 */
export const useSprint = (boardId = 'default', sprintId = 'current'): iUseSprint => {
  const [sprint, setSprint] = useState<iSprint | null>(null);
  const [tickets, setTickets] = useState<iTicket[]>([]);
  const [board, setBoard] = useState<iBoard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | string | null>(null);
  
  // ====================
  // Methods
  // ====================

  /**
   * Loading sprint
   */
  const _handleSprintLoad = async () => {
    setLoading(true);
    try {
      const { data: { sprint, tickets, board } } = await request(`/sprint/${boardId}/${sprintId}`);

      
      setTickets(sortTickets(tickets));

      setBoard(board);
      setSprint(sprint);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };

  /**
   * Saving updated ticket
   * @param ticketId the id of the ticket
   * @param change the change in the ticket - JSON
   */
  const _handleTicketSave = (ticketId: string, change: any) => request(`/ticket/${board?.shortname}/${ticketId}`, {
    method: 'PATCH',
    body: change
  });

  /**
   * Updating ticket order and status
   * @param ticketId the id of the ticket
   * @param destination drag destination
   * @param source drag source
   */
  const _handleTicketUpdate = (ticketId: string, destination: DraggableLocation | undefined, source: DraggableLocation | undefined) => {
    if (!destination || !source) return;
    
    // Copying ticket list
    const _tickets = [...tickets];
    
    // Generating ticket map
    const ticketMap: any = {
      'TODO': sortTickets(_tickets, 'TODO'),
      'INPROGRESS': sortTickets(_tickets, 'INPROGRESS'),
      'COMPLETED': sortTickets(_tickets, 'COMPLETED'),
    };

    // Getting ticket index in source array
    const index = ticketMap[source.droppableId].findIndex((ticket: iTicket) => ticket.id === ticketId);
    
    // Moving ticket to new status
    const [ticket] = ticketMap[source.droppableId].splice(index, 1);
    ticketMap[destination.droppableId].splice(destination.index, 0, { ...ticket, status: destination.droppableId });

    // Generating changes
    const [sources, destinations] = [ticketMap[source.droppableId], ticketMap[destination.droppableId]].map(mapTickets);

    // Generating updated tickets
    const updatedTickets = _tickets.map(ticket => sources[ticket.id] || destinations[ticket.id] || ticket);

    // Generating chaned ticketlist
    const changes: iTicketChange[] = updatedTickets.map((ticket: iTicket) => {
      const prevTicket = tickets.find(_ticket => _ticket.id === ticket.id);
      const change: any = {};

      // Generating change
      if (prevTicket && prevTicket.status !== ticket.status) change.status = ticket.status;
      if (prevTicket && prevTicket.index !== ticket.index) change.index = ticket.index;
      
      return { id: ticket.id, change };
    }).filter(ticket => Object.keys(ticket.change).length > 0);

    // Saving changes
    changes.forEach(({ id, change }) => _handleTicketSave(id, change));
    
    // Updating ticket list
    setTickets(updatedTickets);
  };
  
  // ====================
  // Lifecycle
  // ====================
  useEffect(() => {
    _handleSprintLoad();
  }, [boardId, sprintId]);

  return { sprint, tickets, board, loading, error, updateTicket: _handleTicketUpdate };
};
