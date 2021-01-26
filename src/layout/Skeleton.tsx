import React, { FunctionComponent } from 'react';
import { Header } from 'components';

const Skeleton: FunctionComponent = ({ children }) => {
  return (
    <div className="skeleton-wrapper">
      <Header />
      { children }
    </div>
  );
};

export default Skeleton;
