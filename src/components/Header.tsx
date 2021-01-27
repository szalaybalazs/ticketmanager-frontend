import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FunctionComponent = () => {
  return (
    <header>
      <div className="content">
        <div className="logo">
          <h1 className="title">{ process.env.REACT_APP_TITLE }</h1>
        </div>
        <div className="links">
          <NavLink to='/' exact>Active Sprint</NavLink>
          <NavLink to='/backlog'>Backlog</NavLink>
          <NavLink to='/requests'>Feature requests</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
