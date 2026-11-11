import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import authService from './auth.service';
import logo from '../shared/assets/img/logo.png';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = authService.useRedirectLoggedIn(navigate);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const registeredUser = await authService.register(formData);
      setUser(registeredUser);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
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
              <img src={logo} className="login-logo" alt={'Register'} />
            </div>

            {error && <p className="text-danger mb-2" style={{ fontSize: '0.875rem' }}>{error}</p>}

            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="floatingFirstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingFirstName">First Name</label>
            </div>

            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="floatingLastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingLastName">Last Name</label>
            </div>

            <div className="form-floating mb-2">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating mb-2">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingConfirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingConfirmPassword">Confirm Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary mt-2" type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="mt-3 text-center">
            <span className="text-muted" style={{ fontSize: '0.875rem' }}>
              Already have an account?{' '}
            </span>
            <Link to="/login" style={{ fontSize: '0.975rem', textDecoration: 'underline', color: 'green' }}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;