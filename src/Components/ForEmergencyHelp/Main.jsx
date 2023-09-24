import React, { useEffect, useState } from 'react'
import { Box,Button,Zoom } from '@mui/material'
import bgImg from '../../assets/secondSection.jpg';
import { Link } from 'react-router-dom';


function Main() {

  const [isDesktop, setIsDesktop] = useState(false);
  const [checked, setChecked] = useState(true);
  const [userLocation, setUserLocation] = useState(null);


  useEffect(() => {
    getUserLocation()
  }, [])

  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
          setLoading(false); 
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
      setLoading(false); 
    }
  };


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
          <h1 style={{color:"#fff",textAlign:"center", textDecoration:"underline"}}>Emergency Services</h1>
          <p style={{fontWeight:"600", textAlign:"center", margin:"30px 0 20px", fontSize:"20px",color:"#fff", lineHeight:"1.6em"}}>Discover Nearby Animal Care Centers and Healing centers for in need Animals</p>
          {!userLocation && <p style={{color:"#fff", textAlign:"center", fontSize:"18px", backgroundColor:"#0A87BA", padding:"10px", borderRadius:"10px"}}><b>Location Access denied.</b> Need location access to find Animal Care centers near you.</p>}
          {userLocation && <Link to={`https://www.google.com/maps/search/animal+hospital+near+me/@${userLocation?.latitude},${userLocation?.longitude},13z/data=!3m1!4b1?entry=ttu`} target='_blank'><Button variant="contained" sx={{backgroundColor:"#0A87BA"}}>Click here</Button></Link>}

          <p style={{fontWeight:"600", textAlign:"center", margin:"40px 0 20px", fontSize:"20px",color:"#fff", lineHeight:"1.6em"}}>Discover Nearby Animal Care Shelters</p>
          {!userLocation && <p style={{color:"#fff", textAlign:"center", fontSize:"18px", backgroundColor:"#0A87BA", padding:"10px", borderRadius:"10px"}}><b>Location Access denied.</b> Need location access to find Animal Care centers near you.</p>}
          {userLocation && <Link to={`https://www.google.com/maps/search/animal+shelter+near+me/@${userLocation?.latitude},${userLocation?.longitude},12z/data=!3m1!4b1?entry=ttu`} target='_blank'><Button variant="contained" sx={{backgroundColor:"#0A87BA"}}>Click here</Button></Link>}
        </Box>
      </Zoom>

        
    </Box>
  )
}

export default Main