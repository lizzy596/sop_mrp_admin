import React from 'react';
import { useLocation, useNavigate } from 'react-router';

const SubItem = ({ item }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const defaultIsActiveIcon = `${item?.icon}-fill`;
  return (
    <li className="w-100">
      <button
        className={`nav-link px-0  ${location.pathname === item.path ? 'text-white' : 'text-primary'
          }`}
        onClick={() => navigate(item.path)}
      >
        {isActive ? (
          <i
            className={`fs-4 text-primary bi-${!item?.isActiveIcon ? defaultIsActiveIcon : item.isActiveIcon}`}
          />
        ) : (
          <i className={`fs-4 text-primary bi-${item.icon}`} />
        )}
        <span className="ms-2 d-none d-sm-inline menu-item-text">
          {item.label}
        </span>
      </button>
    </li>
  );
};

export default SubItem;
