import React from 'react';
import { status } from 'types/ticket';

interface iListHeaderProps {
  type: status,
  numberOfCards: number
}

const STATUS_MAP = {
  'TODO': {
    label: 'todo'
  },
  'INPROGRESS': {
    label: 'in progress'
  },
  'COMPLETED': {
    label: 'completed'
  },
};

const ListHeader: React.FunctionComponent<iListHeaderProps> = ({ type, numberOfCards }) => {
  return (
    <div className="list-header-wrapper">
      <div className="title">
        <div className={`status-dot ${type.toLowerCase()}`} />
        <span className="title">{ STATUS_MAP[type].label }</span>
      </div>
      <span className="ticketnum">{ numberOfCards } ticket{ numberOfCards > 1 ? 's' : '' }</span>
    </div>
  );
};

export default ListHeader;
