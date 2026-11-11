import React, { useState } from 'react';
import { Sidebar } from "../../shared/components"
import config from '../../../config.json';

const DashboardLayout = ({ children }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar label={import.meta.env.VITE_SITE_NAME} link={'/'} withLogo />
        <div className="col py-3 scrollable-div">
          {children}
          <div className="fixed-footer">
            <h5>
              {config.env === 'production'
                ? config.apiServerUrlProduction
                : config.apiServerUrlDevelopment}
            </h5>
          </div>
        </div>
      </div>
      {/* <ProfileModal
        isOpen={isProfileOpen}
        toggle={() => setIsProfileOpen(false)}
      /> */}
    </div>
  );
};

export default DashboardLayout;