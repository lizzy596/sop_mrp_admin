import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import authService from './auth.service';
import logo from '../shared/assets/img/logo.png';

const LoginEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);

  const { setUser } = authService.useRedirectLoggedIn(navigate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedIn = await authService.login({ email, password });
      console.log('LOGGED IN', loggedIn);
      setUser(loggedIn);
    } catch (e) {
      console.log('ERROR');
      setPassword('');
      setErrors(true);
    }
  };

  return (
    <div className="login-center">
      <div className="login-body text-center">
        <div className="form-signin">
          <form onSubmit={handleSubmit}>
            <div
              style={{ width: '100%' }}
              className="d-flex align-items-center mb-2 mb-md-1 me-md-auto text-white text-decoration-none justify-content-center"
            >
              <img src={logo} className="login-logo " alt={'Sign in'} />
            </div>
            <div className="form-floating">
              <input
                type="email"
                className={`form-control ${errors ? 'is-invalid' : ''}`}
                id="floatingInput"
                placeholder="name@example.com"
                onFocus={() => setErrors(false)}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className={`form-control ${errors ? 'is-invalid' : ''}`}
                id="floatingPassword"
                placeholder="Password"
                onFocus={() => setErrors(false)}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
              <div className="invalid-feedback">
                Incorrect email or password
              </div>
            </div>

            <button className="w-100 btn btn-lg btn-primary mt-2" type="submit">
              Sign in
            </button>
          </form>

          <div className="mt-3 text-center">
            <span className="text-muted" style={{ fontSize: '0.875rem' }}>
              Don't have an account?{' '}
            </span>
            <Link to="/register" style={{ fontSize: '0.975rem', textDecoration: 'underline', color: 'green' }}>
              Register
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "20px 0" }}>
            <div id="google-signin-button"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginEmail;