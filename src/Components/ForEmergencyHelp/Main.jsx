import React, { useState } from 'react'
import { Box,Button,Zoom } from '@mui/material'
import bgImg from '../../assets/secondSection.jpg';
import { Link } from 'react-router-dom';


function Main() {

  const [isDesktop, setIsDesktop] = useState(false);
  const [checked, setChecked] = useState(true);


  return (
    <Box className={`emergencyServices ${!isDesktop ? 'mobile' : 'desktop'}`} sx={{
      minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        background: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundAttachment:"fixed",
        flexDirection: "column"
    }}>
      <Zoom in={checked}>
        <Box className='inner-content-emergency' sx={{ padding:"100px 30px 20px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
          <h1 style={{color:"#fff",textAlign:"center"}}>Emergency Services</h1>
          <p style={{fontWeight:"600", textAlign:"center", margin:"30px", fontSize:"20px",color:"#fff", lineHeight:"1.6em"}}>Discover Nearby Animal Care Centers and Healing centers for in need Animals</p>
          <Link to='https://www.google.com/maps/search/animal+hospital+near+me/@31.2299801,75.7411217,13z/data=!3m1!4b1?entry=ttu' target='_blank'><Button variant="contained" sx={{backgroundColor:"#0A87BA"}}>Click here</Button></Link>
        </Box>
      </Zoom>

        
    </Box>
  )
}

export default Main