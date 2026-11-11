import React from 'react';

const MenuIcon = ({ icon, isActive, isActiveIcon }) => {
  const defaultIsActiveIcon = `${icon}-fill`;
  return isActive ? (
    <i className={`fs-4 text-gb bi-${!isActiveIcon ? defaultIsActiveIcon : isActiveIcon}`} />
  ) : (
    <i className={`fs-4 text-gb bi-${icon}`} />
  );
};

export default MenuIcon;
