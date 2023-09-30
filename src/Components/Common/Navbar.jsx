import {useEffect, useState} from 'react'
import './Navbar.css';
import { Box, Drawer,Button, Menu, MenuItem } from '@mui/material';
import paw from '../../assets/paw.png';
import {RiMenu2Line} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import {SlClose} from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate =useNavigate();
    const [isDesktop, setIsDesktop] = useState(false);
    const [openDrawer,setOpenDrawer] = useState(false);
    const [userName, setUserName] = useState(null);

    const handleOpenDrawer = () => setOpenDrawer(true);
    const handleCloseDrawer = () => setOpenDrawer(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClickMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
      }
    
      useEffect(() => {
        const storedUserName = localStorage.getItem('userName');    
        if (storedUserName) {
          setUserName(storedUserName);
        }
      }, []); 

      const clearStorage = () =>{
        localStorage.clear();
        navigate('/');
      }
      const guestUser = () => {
        navigate('/');
      }


  return (
    <Box className={`Navbar ${!isDesktop ? 'mobile' : 'desktop'}`} sx={{position:"fixed", width:"100%", height:"65px",backgroundColor:"rgba(255,255,255,0.2)", justifyContent:"space-between", alignItems:"center", padding:"0 20px", boxShadow:"0px 10px 20px 3px rgba(0,0,0,0.3)", zIndex:"999"}}>
        <RiMenu2Line onClick={handleOpenDrawer} style={{fontSize:"30px", color:"#fff", cursor:"pointer"}}/>

        <img src={paw} alt="logo" style={{width:"55px", backgroundColor:"#fff",height:"55px", borderRadius:"50%", padding:"5px"}} id='user' aria-controls={openMenu ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={openMenu ? 'true' : undefined} onClick={handleClickMenu}/>

        <Menu id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
                'aria-labelledby': 'user',
        }}>
            <MenuItem><Link to={userName ? '' : '/'} style={{textDecoration:'none', color:"black"}}>{userName ? userName : "Please login"}</Link></MenuItem>
            <MenuItem><Link to='/home' style={{textDecoration:'none', color:"black"}}>Home</Link></MenuItem>
            <MenuItem onClick={userName ? clearStorage : guestUser}>{userName ? 'Log out' : 'Log In'}</MenuItem>
        </Menu>



    <Drawer open={openDrawer} anchor='left' onClose={handleCloseDrawer}>
        <Box sx={{width:"290px", height:"100vh", backgroundColor:"#0A87BA",padding:"30px"}}>
            <SlClose style={{color:"#fff", fontSize:"40px", cursor:"pointer"}} onClick={handleCloseDrawer}/>
            <Box className="drawerMenu" sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <Link to='/home' style={{color:"#fff", fontSize:"22px", fontWeight:"500", margin:"20px 0"}}>Home</Link>

                <Link to='/report' style={{color:"#fff", fontSize:"22px", fontWeight:"500", margin:"20px 0"}}>Report an Animal</Link>

                <Link to="/myReports" style={{color:"#fff", fontSize:"22px", fontWeight:"500", margin:"20px 0"}}>Check Rescue Status</Link>

                <Link to="/breed" style={{color:"#fff", fontSize:"22px", fontWeight:"500", margin:"20px 0"}}>Breed Recognition</Link>
                
                <Link to="/emergency" style={{color:"#fff", fontSize:"22px", fontWeight:"500", margin:"20px 0"}}>Emergency Services</Link>

                <Link style={{color:"#fff", fontSize:"22px", fontWeight:"500", margin:"20px 0"}} to='/donation'>Donate Us</Link>

                <Button onClick={userName ? clearStorage : guestUser} style={{color:"#0A87BA", backgroundColor:"#fff", padding:"10px 20px", margin:"20px 0"}}>{userName ? 'Log out' : 'Log In'}</Button>

            </Box>
        </Box>
    </Drawer>

    </Box>
  )
}

export default Navbar