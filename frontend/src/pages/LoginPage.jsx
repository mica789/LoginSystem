import React, { useState, useEffect  } from 'react';
import styles from '../css/LoginSignUp.module.css';
import user_icon from '../assets/images/person.png';
import email_icon from '../assets/images/email.png';
import password_icon from '../assets/images/password.png';
import bgImage from '../assets/images/shape-bg.png';

import { loginUser, registerUser } from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginSignUp = () => {
  const [action, setAction] = useState('Login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
  }, [action]);

const handleSubmit = async () => {
  try {
    setError('');
    if (action === 'Login') {
      const userData = await loginUser({ username, password });
      console.log('Login successful:', userData);
      login(userData);
      navigate('/users');
    } else {
      const result = await registerUser({ username, email, password });
      console.log('Registration successful:', result);
      alert('Registration successful! Please login.');
      setAction('Login');
    }
  } catch (err) {
    console.error('Error:', err.message);
    setError(err.message || 'Something went wrong');
  }
};

  return (
    
    <div className={styles.container}  style={{ backgroundImage: `url(${bgImage})` }}>
      <div className={styles.header}>
        <div
          className={action === 'Login' ? `${styles.toggleButton} ${styles.active}` : styles.toggleButton}
          onClick={() => setAction('Login')}
        >
          Login
        </div>
        <div
          className={action === 'Sign Up' ? `${styles.toggleButton} ${styles.active}` : styles.toggleButton}
          onClick={() => setAction('Sign Up')}
        >
          Sign Up
        </div>
      </div>

      <div className={styles.underline}></div>

      <div className={styles.inputs}>
        <div className={styles.input}>
          <img src={user_icon} alt="user icon" />
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        {action === 'Sign Up' && (
        <div className={styles.input}>
          <img src={email_icon} alt="email icon" />
          <input
            type="email"
            placeholder="Enter E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        )}

        <div className={styles.input}>
          <img src={password_icon} alt="password icon" />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {error && <div className={styles.errorText}>{error}</div>}

      <div className={styles.submitContainer}>
        <div className={styles.submit} onClick={handleSubmit}>
          {action}
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;