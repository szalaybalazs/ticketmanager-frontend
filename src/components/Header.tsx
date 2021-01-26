import React from 'react';

const Header: React.FunctionComponent = () => {
  return (
    <header>
      <h1 className="title">{ process.env.REACT_APP_TITLE }</h1>
    </header>
  );
};

export default Header;
