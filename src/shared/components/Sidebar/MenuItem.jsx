import React from 'react';
import { useLocation, useNavigate } from 'react-router';

const MenuItem = ({ label, path, subItems }) => {
  const location = useLocation();

  // const base = location.pathname.split('/')[1];


  const navigate = useNavigate();

  if (!subItems)
    return (
      <li className="nav-item" onClick={() => navigate(path)}>
        <button
          style={{ width: '100%', textAlign: 'left' }}
          className={`nav-link ${location.pathname === path ? 'active' : 'text-white'
            }`}
        >
          {label}
        </button>
        {/* <div
          className={`nav-link ${
            location.pathname === path ? 'active' : 'text-white'
          }`}
        >
          
        </div> */}
        <div className="collapse show">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            {subItems?.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  label={item.label}
                  path={item.path}
                //subItems={item?.subItems}
                />
              );
            })}
          </ul>
        </div>
      </li>
    );

  return (
    <li className="dropdown">
      <button
        style={{ width: '100%', textAlign: 'left' }}
        onClick={() => navigate(path)}
        className={'nav-link dropdown-toggle text-white collapse'}
      // className={`btn btn-toggle align-items-center text-white rounded ${
      //   location.pathname === path ? 'collapse' : ''
      // }`}
      // className={`btn btn-toggle align-items-center rounded collapse ${
      //   location.pathname === path ? 'active' : 'text-white'
      // }`}
      >
        <i className="fs-5 bi-bootstrap"></i>
        {label}
      </button>
      {/* <div
        className={`nav-link ${
          location.pathname === path ? 'active' : 'text-white'
        }`}
      >
        {label}
      </div> */}
      <div className="collapse show">
        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          {subItems?.map((item, index) => {
            return (
              <MenuItem
                key={index}
                label={item.label}
                path={item.path}
              //subItems={item?.subItems}
              />
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export default MenuItem;
