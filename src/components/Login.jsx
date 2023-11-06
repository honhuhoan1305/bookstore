import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const Login = ({ onLogin, isLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

 

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        // test kiểm tra bàng user name và email
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Trích xuất mã token từ dữ liệu phản hồi
        onLogin(token); 
        // Gọi hàm callback onLogin khi đăng nhập thành công
      } else {
        setError('Invalid username or password'); // Thông báo lỗi
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login'); // Thông báo lỗi
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/admin" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
