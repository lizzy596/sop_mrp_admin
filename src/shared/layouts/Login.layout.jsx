import React from 'react';
import bgImg from '../assets/img/bg.jpg';

const LoginLayout = ({ children }) => {
  return (
    <div
      className="bg-image"
      style={{ backgroundImage: `url(${bgImg})`, height: '100vh' }}
    >
      {children}
    </div>
  );
};

export default LoginLayout;