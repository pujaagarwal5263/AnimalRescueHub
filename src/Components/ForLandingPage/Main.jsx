import React, { useState, useEffect } from 'react';
import {Box, Modal} from '@mui/material';
import Slide from '@mui/material/Slide';
import forMobile from '../../assets/forMobile.png';
import forDesktop from '../../assets/forDesktop.jpg';
import Logo from '../../assets/logo-png-colored.png';
import Button from '@mui/material/Button';
import {BsArrowDown} from 'react-icons/bs';
import './Main.css';

function Main() {
  const [checked, setChecked] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [open, setOpen] = useState(false); 

  const handleOpen = () => {
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false);
  };

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

          <div className="mlp-btns" style={{margin:"20px 0px 40px", display:"flex"}}>

            <Button variant='outlined' onClick={handleOpen} sx={{margin:"0 10px", width:"100%" ,fontSize:"20px",border:'2px solid #0A87BA', borderRadius:"50px",color:"#0A87BA", ":focus":{border:'2px solid #0A87BA'}, fontWeight:"500"}}>Join for Saving Paws</Button>
          </div>

          <Button variant="contained" onClick={scrollToMoreInfo} sx={{backgroundColor:"#0A87BA",borderRadius:"50%",color:"#fff", marginTop:"10px",display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center", ":focus":{border:'2px solid #0A87BA'}, height:"120px", width:"120px"}}><p style={{fontWeight:"600", marginTop:"5px"}}>More Info</p><BsArrowDown style={{fontSize:"30px", marginTop:"5px", color:"#fff"}}/></Button>
        </div>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ p: "20px" }}
        >
        <Box class="main" sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          boxShadow: 24,
          backdropFilter: "blur(20px)",
          borderRadius: "10px",
          p: 4,
        }}>  	
          <input type="checkbox" id="chk" aria-hidden="true" />

            <div class="signup">
              <form>
                <label for="chk" aria-hidden="true">Sign up</label>
                <input type="text" name="txt" placeholder="Username" style={{padding:"20px 10px"}} required />
                <input type="email" name="email" placeholder="Email" required style={{padding:"20px 10px"}}/>
                <input type="password" name="pswd" placeholder="Password" required style={{padding:"20px 10px"}}/>
                <input type="text" name="txt" placeholder="Your City" style={{padding:"20px 10px"}} required />
                <button className='l-btn'>Sign up</button>
              </form>
            </div>

            <div class="login">
              <form>
                <label for="chk" aria-hidden="true">Login</label>
                <input type="email" name="email" placeholder="Email" required style={{padding:"20px 10px"}}/>
                <input type="password" name="pswd" placeholder="Password" required style={{padding:"20px 10px"}}/>
                <button className='l-btn'>Login</button>
              </form>
            </div>
        </Box>
          

      </Modal>


      </Box>
    </Slide>
  );
}

export default Main;
