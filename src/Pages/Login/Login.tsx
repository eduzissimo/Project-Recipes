import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = loginData;

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length > 6;

  const isFormsValid = isEmailValid && isPasswordValid;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, email: e.target.value });
  };

  const handlePasswordChange = (e: any) => {
    setLoginData({ ...loginData, password: e.target.value });
  };

  const handleSubmit = () => {
    if (isFormsValid) {
      const userObject = { email: loginData.email };
      localStorage.setItem('user', JSON.stringify(userObject));
      navigate('/meals');
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="email-input"
        placeholder="Email"
        onChange={ (e) => handleEmailChange(e) }
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="Password"
        onChange={ (e) => handlePasswordChange(e) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !isFormsValid }
        onClick={ () => {
          handleSubmit();
        } }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
