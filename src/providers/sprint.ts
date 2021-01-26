import { useEffect, useState } from 'react';
import { iSprint } from 'types/sprint';
import { iTicket } from 'types/ticket';
import { iBoard } from 'types/board';
import { request } from 'core';

interface iUseSprint {
  sprint: iSprint | null
  board: iBoard | null
  tickets: iTicket[]
  loading: boolean
  error: Error | string | null
}

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
  
  const _handleSprintLoad = async () => {
    setLoading(true);
    try {
      const { data: { sprint, tickets, board } } = await request(`/sprint/${boardId}/${sprintId}`);

      setBoard(board);
      setSprint(sprint);
      setTickets(tickets);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    _handleSprintLoad();
  }, [boardId, sprintId]);

  return { sprint, tickets, board, loading, error };
};
