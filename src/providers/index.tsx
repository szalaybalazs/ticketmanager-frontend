import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const Providers: React.FunctionComponent = ({ children }) => {
  return (
    <Router>
      { children }
    </Router>
  );
};

export default Providers;
