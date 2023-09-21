import React, { useState } from 'react';

const Main = () => {
  // State to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a request body object
    const requestBody = {
      email: email,
      password: password,
    };

    try {
      // Make an API request using fetch or Axios
      const response = await fetch('http://localhost:8000/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json(); 
      console.log(data.message);

      if (response.ok) {
        localStorage.setItem('token', data.token);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className='blacktext'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Main;
