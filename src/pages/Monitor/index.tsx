import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '@component/NavBar';

const Monitor: React.FC = () => {
  return (
    <div className="monitor">
      <NavBar />
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Monitor;
