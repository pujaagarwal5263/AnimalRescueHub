import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import forMobile from '../../assets/forMobile.png';
import forDesktop from '../../assets/forDesktop.jpg';
import Logo from '../../assets/logo-png-colored.png';
import Button from '@mui/material/Button';
import {BsArrowDown} from 'react-icons/bs';

function Main() {
  const [checked, setChecked] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  const updateBackgroundImage = () => {
    setIsDesktop(window.innerWidth >= 768); 
  };

  useEffect(() => {
    window.addEventListener('resize', updateBackgroundImage);
    updateBackgroundImage();
    return () => {
      window.removeEventListener('resize', updateBackgroundImage);
    };
  }, []);

  const backgroundImage = isDesktop ? forDesktop : forMobile;

  function scrollToMoreInfo() {
    const moreInfoElement = document.getElementById('moreInfo');
    if (moreInfoElement) {
      moreInfoElement.scrollIntoView({ behavior: 'smooth' });
    }
  }


  return (
    <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
      <Box
        className="lp-main"
        sx={{
          height: "100vh",
          width: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition:'bottom',
          overflow:"hidden",    
        }}
      >
        <div className={`lp-logo ${!isDesktop ? 'mobile' : 'desktop'}`} style={{width:"100%",justifyContent:"center", flexDirection:"column", alignItems:"center"}}>

          <img src={Logo} alt="Logo" style={{width:"320px",height:"50px", marginTop:"40px" }}/>

          <div className="mlp-content" style={{width:"80%", margin:"30px auto", textAlign:"center", fontSize:"25px", lineHeight:"1.4em"}}>
            <p>Animal Rescue Hub: Uniting hearts for animal welfare, where every act of kindness matters</p>
            <p style={{marginTop:"25px"}}>Rescuing lives, one paw at a time, with compassion.</p>
          </div>

          <div className="mlp-btns" style={{margin:"20px 0px 40px"}}>
            <Button variant='outlined' sx={{margin:"0 10px", fontSize:"20px", p:"8px 20px",border:'2px solid #0A87BA', color:"#0A87BA", ":focus":{border:'2px solid #0A87BA', backgroundColor:"rgba(10, 136, 186, 0.487)"},backgroundColor:"rgba(10, 136, 186, 0.1)", fontWeight:"500"}}>Sign Up</Button>
            <Button variant='contained' sx={{margin:"0 10px", fontSize:"20px", p:"8px 25px",border:'2px solid #0A87BA',color:"#fff", backgroundColor:"#0A87BA", ":focus":{border:'2px solid #0A87BA'}}}>Log In</Button>
          </div>

          <Button variant="contained" onClick={scrollToMoreInfo} sx={{backgroundColor:"#0A87BA",borderRadius:"50%",color:"#fff", marginTop:"10px",p:"25px 20px",display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center", ":focus":{border:'2px solid #0A87BA'}}}><p style={{fontWeight:"600", marginTop:"5px"}}>More Info</p><BsArrowDown style={{fontSize:"30px", marginTop:"5px"}}/></Button>
        </div>

      </Box>
    </Slide>
  );
}

export default Main;
