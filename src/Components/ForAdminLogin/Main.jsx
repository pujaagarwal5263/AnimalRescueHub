import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cat from '../../assets/er.avif';
import {  IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@material-ui/icons';




const Main = () => {


  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);



  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleInputBlur1 = () => {
    setIsFocused1(false);
  };


  const handleInputFocus1 = () => {
    setIsFocused1(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:8000/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        // Show a success toast notification
        toast.success('Login successful');
        localStorage.setItem('token', data.token);
        navigate("/admindashboard")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputStyles = {
    borderColor: isFocused ? 'red' : 'green', // Change border color when focused
    boxShadow: isFocused ? '1px 1px 10px red' : 'none', // Add box shadow when focused
  };

  const inputStyles1 = {
    borderColor: isFocused1 ? 'red' : 'green', // Change border color when focused
    boxShadow: isFocused1 ? '1px 1px 10px red' : 'none', // Add box shadow when focused
  };

  return (
    <Box display="flex" style={{ overflow: "hidden"}}>
      <Box >
        <img src={Cat } width="900px" height="900px"/>
      </Box>
          <Box
          padding={15}
      w="80%"
      marginTop={16}
    >
      <Typography variant="h5" gutterBottom color="gray" fontWeight="bold">
        Log in
      </Typography>
      <Typography variant="h6" gutterBottom color="gray" fontWeight="lighter" >
       Get access to your account
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          value={email}
          placeholder='Enter your email'
          onFocus={handleInputFocus}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
          fullWidth
          onBlur={handleInputBlur}
          style={inputStyles}
        />
        <TextField
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          margin="normal"
          onBlur={handleInputBlur1}
          onFocus={handleInputFocus1}
          fullWidth
          style={inputStyles1}
          InputProps={{
           
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained"    margin="normal"  style={{width:"100%", marginTop:"16px" , backgroundColor:"red"}}>
          Log in
        </Button>
      </form>
      <ToastContainer />
    </Box>
    </Box>
   
  );
};

export default Main;
