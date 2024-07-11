// src/components/Login.js
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './index.css'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    // Check if the user is already authenticated
    if (localStorage.getItem('isAuthenticated') === 'true') {
      history.replace('/admin'); // Redirect to admin page
    }
  }, [history]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateCred = (e) => {
    e.preventDefault();
    const uname = process.env.REACT_APP_ADMIN_USERNAME;
    const pass = process.env.REACT_APP_ADMIN_PASSWORD;

    if (username === uname && password === pass) {
      localStorage.setItem('isAuthenticated', 'true');
      history.replace('/admin'); // Redirect to admin page and replace the current entry in the history stack
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='overall-form-container'>
      <form onSubmit={validateCred} className='login-form-container'>
        <div>
          <h3 className='login-heading'>SNGR ADMIN LOGIN</h3>
        </div>
        <div className='input-label-container'>
        <label htmlFor="username" className='login-label'>Username</label>
        <input type="text" id="username" onChange={handleUsernameChange} value={username} className='login-input' />  
        </div> 
        <div className='input-label-container'>
      
        <label htmlFor="password" className='login-label'>Password</label>
        <input type="password" id="password" onChange={handlePasswordChange} value={password} className='login-input'/>  
        </div>
     <div className='login-button-container'>
     <input type="submit" value="Submit" className='login-button'/>
     </div>
       
      </form>
    </div>
  );
};

export default Login;
