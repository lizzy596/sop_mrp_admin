import React, { useState } from 'react';
import UserDropdown from './UserDropdown';
import SideBarLogo from './SideBarLogo';
import SideBarMenuDev from './SideBarMenuDev';
import logo from '../../assets/img/logo.png';
// import ProfileModal from './ProfileModal';

const SideBar = ({ label, link, withLogo }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="col-auto col-xs-1 col-sm-4 col-md-3 col-lg-2 col-xl-2 px-sm-2 px-0 sidebar-background">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white  sidebar min-vh-100">
        <SideBarLogo label={label} link={link}>
          {withLogo && <img src={logo} className="sidebar-logo" alt={label} />}
          {!withLogo && <span className="fs-4">{label}</span>}
        </SideBarLogo>
        <div className="sidebar-wrapper align-items-center align-items-sm-start">
          {/* <SideBarMenu /> */}

          <SideBarMenuDev />
        </div>
        <UserDropdown setIsProfileOpen={setIsProfileOpen} />
      </div>
      {/* <ProfileModal
        isOpen={isProfileOpen}
        toggle={() => setIsProfileOpen(!isProfileOpen)}
      /> */}
    </div>
  );
};

export default SideBar;