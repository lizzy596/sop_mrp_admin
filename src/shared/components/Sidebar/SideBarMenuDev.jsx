import React from 'react';
import sidebarMenuList from '../../routing/sidebar.menu';
import SideBarMenuItem from './SideBarMenuItem';
import authService from '../../../Auth/auth.service';

const SideBarMenuDev = () => {
  return (
    <ul
      className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
      id="menu"
    >
      {sidebarMenuList.reduce((acc, item, index) => {
        if (!item.roles.includes(authService.userValue.role)) return acc;

        if (item?.subItems?.length > 0) {
          item.subItems = item.subItems.reduce((acc, subItem) => {
            if (!subItem?.roles) return [...acc, subItem];

            if (!subItem?.roles.includes(authService.userValue.role)) return acc;

            return [...acc, subItem];

          }, [])
        }
        return [...acc, <SideBarMenuItem item={item} key={`${item.label}-${index}`} />];
      }, [])}
    </ul>
  );
};

export default SideBarMenuDev;
