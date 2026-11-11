import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import authService from './auth.service';
import logo from '../shared/assets/img/logo.png';

const UNAUTHORIZED_TEXT = 'You must login with a registered Gel Blaster account to access.';
const FORBIDDEN_TEXT = 'You must request access to this site.';
const SOMETHING_WENT_WRONG_TEXT = 'Something went wrong. Please try again later.';



const LoginGoogle = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [isReqButton, setIsReqButton] = useState(false);
  const { setUser } = authService.useRedirectLoggedIn(navigate);

  const handleCallbackResponse = useCallback(async (response) => {
    try {
      setIsReqButton(false);
      await authService.loginWithGoogleToken(response.credential).then(setUser);
    } catch (e) {
      const code = e.toJSON().status;

      if (code === 401) {
        setErrors(UNAUTHORIZED_TEXT);
        setIsReqButton(false);
      }
      else if (code === 403) {
        setErrors(FORBIDDEN_TEXT)
        setIsReqButton(true);
      }
      else {
        setErrors(SOMETHING_WENT_WRONG_TEXT);
        setIsReqButton(false);
      }

    }
  }, []);

  useEffect(() => {
    setIsReqButton(false);
    setErrors(null);
    if (!window?.google) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
      auto_select: false, // Disable auto-select to reduce background requests
      itp_support: true,
      use_fedcm_for_prompt: true, // Use FedCM API where available
    });
    window.google.accounts.id.prompt();

    window.google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: "filled_black", size: "large", type: "standard", text: "continue_with", shape: "pill", width: "200px", click_listener: () => setErrors(false) }
    )

  }, [window?.google])

  return (
    <div className="login-center">
      <div className="login-body text-center">
        <div className="form-signin">
          <div
            style={{ width: '100%' }}
            className="d-flex align-items-center mb-4 mb-md-4 mt-3 mt-md-3 me-md-auto text-white text-decoration-none justify-content-center"
          >
            <img src={logo} className="login-logo" alt={'Sign in'} />
          </div>
          <div>{errors && (<span style={{ color: "red" }}>{errors}</span>)}
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "20px 0" }}>
            <div id="google-signin-button"></div>
          </div>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "20px 0" }}>
            {isReqButton && (<button className="w-100 btn btn-lg btn-primary mt-2">
              Request Access
            </button>)}

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginGoogle;