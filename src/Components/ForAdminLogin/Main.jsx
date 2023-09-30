import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cat from '../../assets/rt.png';
import '../ForAdminDashboard/Main.css'

const Main = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('https://animal-rescue-hub.onrender.com/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful');
        //localStorage.removeItem('token');
        localStorage.setItem('token', data.token);
        navigate("/admindashboard");
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

  return (
    <Box display="flex" sx={{ overflow: "hidden" , width:"100%", height:"100vh", backgroundColor:"#000"}}>
      <Box >
        <img src={Cat } style={{width:"100%", height:'100vh'}}/>
      </Box>
          <Box
          padding="100px"
          paddingTop="200px"
      w="100%"
  
      backgroundColor="black"
      color="white"
    >
      <Typography variant="h5" gutterBottom color="white" fontWeight="bold" > 
        Log in
      </Typography>
      <Typography variant="h6" gutterBottom color="white" fontWeight="lighter" >
       Get access to your account
      </Typography>
      <form onSubmit={handleSubmit} >
        <TextField
          type="email"
          value={email}
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
          fullWidth
          style={{
            backgroundColor:"white",
            borderRadius:"5px"
          }}
        />
        <TextField
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          margin="normal"
          fullWidth
          style={{
            backgroundColor:"white",
            borderRadius:"5px"
          }}
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
