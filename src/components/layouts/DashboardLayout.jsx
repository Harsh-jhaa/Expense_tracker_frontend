import React from 'react';
import { UserContext } from '../../context/UserContext.jsx';
import Navbar from './Navbar.jsx';
import SideMenu from './SideMenu.jsx';

import { useContext } from 'react';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  return (
    <div className=''>
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className='flex'>
          <div className='max-[1080px]:hidden'>
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className='grow mx-5'>{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
