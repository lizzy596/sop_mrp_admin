import React from 'react';
import { useNavigate } from 'react-router';

const SideBarLogo = ({ link, children }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(link)}
      style={{ width: '100%', borderBottom: '0px solid #e8e7e7' }}
      className="d-flex align-items-center mb-4 mb-md-5 me-md-auto mt-4 mt-md-5 text-white text-decoration-none justify-content-center"
    >
      {children}
    </div>
  );
};

export default SideBarLogo;
