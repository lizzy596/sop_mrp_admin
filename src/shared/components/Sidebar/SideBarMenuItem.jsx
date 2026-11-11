import React from 'react';
import SubItem from './SubItem';
import MenuIcon from './MenuIcon';
import { useLocation, useNavigate } from 'react-router';

const SideBarMenuItem = ({ item }) => {
  const location = useLocation();
  const currentBase = location.pathname.split('/')[1];
  const navigate = useNavigate();

  const isActive = '/' + currentBase === item.path;

  if (!item?.subItems) {
    return (
      <li className="nav-item menu-item-li">
        <button
          className={`nav-link align-middle px-0 ${location.pathname === item.path ? 'text-white' : 'text-secondary'
            }`}
          onClick={() => navigate(item.path)}
        >
          <MenuIcon
            icon={item.icon}
            isActive={'/' + currentBase === item.path}
            isActiveIcon={item?.isActiveIcon}
          />

          <span className="ms-2 d-none d-sm-inline menu-item-text">
            {item.label}
          </span>
        </button>
      </li>
    );
  }
  return (
    <li>
      <button
        className={`nav-link px-0 align-middle ${'/' + currentBase === item.path ? 'text-white' : 'text-secondary'
          }`}
        onClick={() => navigate(item.path)}
      >
        <MenuIcon icon={item.icon} isActive={'/' + currentBase === item.path} isActiveIcon={item?.isActiveIcon} />
        <span className="ms-2 d-none d-sm-inline menu-item-text">
          {item.label}
        </span>
      </button>
      <ul
        className={`collapse ${'/' + currentBase === item.path ? 'show' : ''
          } nav flex-column ms-1`}
      >
        {item?.subItems?.map((subItem, index) => {
          return <SubItem item={subItem} key={`${subItem.label}-${index}`} />;
        })}
      </ul>
    </li>
  );
};

export default SideBarMenuItem;
