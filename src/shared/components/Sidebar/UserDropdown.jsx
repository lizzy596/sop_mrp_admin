import React, { useState } from 'react';
import authService from '../../../Auth/auth.service';

const UserDropdown = ({ setIsProfileOpen }) => {
  const [isDropped, setIsDropped] = useState(false);
  const { firstName, lastName, email } = authService.userValue;
  return (
    <div className="sidebar-bottom d-none d-sm-inline">
      <div
        className="dropdown mb-3"
        style={{ zIndex: 5, cursor: 'pointer' }}
        onClick={() => {

          setIsDropped((isDropped) => !isDropped);
        }}
      >
        <div
          className={`d-flex align-items-center text-white text-decoration-none dropdown-toggle ${isDropped ? 'show' : ''
            }`}
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded={isDropped ? 'true' : 'false'}
        >
          <span className="px-2">
            {firstName ? `${firstName} ${lastName}` : 'User'}
          </span>
        </div>
        <ul
          className={`dropdown-menu dropdown-menu-dark text-small shadow ${isDropped ? 'show' : ''
            }`}
          style={{
            position: 'absolute',
            inset: 'auto auto 0px 0px',
            margin: '0px',
            transform: 'translate(0px, -34px)',
          }}
          aria-labelledby="dropdownUser1"
          onMouseLeave={() => setIsDropped(false)}
        >
          {/* <li>
            <span
              className="dropdown-item"
              onClick={() => {
                setIsProfileOpen(true);
                setIsDropped(false);
              }}
            >
              Profile
            </span>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li> */}
          <li>
            <span
              className="dropdown-item"
              onClick={() => authService.logout()}
            >
              Sign out
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropdown;
