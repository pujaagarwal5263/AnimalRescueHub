import { useState } from 'react'
import bgImg from '../../assets/secondSection.jpg';
import { Box, Button, Zoom } from '@mui/material';
import featureData from '../../assets/featuresData';
import {Link } from 'react-router-dom'


function Main() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [checked, setChecked] = useState(true);

  return (
    <Box className={`h-main ${!isDesktop ? 'mobile' : 'desktop'}`} style={{minHeight:"100vh", width:"100%", overflow:"hidden",background: `url(${bgImg})`,
    backgroundAttachment:"fixed",
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    flexDirection: "column", paddingTop:"65px"}}>
      <Box className="ss-features" sx={{ width: "100%", overflow: "hidden", padding: "0 30px 30px" }}>
        {featureData?.map((feature, index) => (
          <Zoom key={index} in={checked}>
            <Box className="ss-feature" sx={{ width: "100%", height: "150px", margin: "35px 0", background: "transparent", borderRadius: "15px", overflow: "hidden", boxShadow: "0px 0px 20px 11px rgba(0,0,0,0.2)" }}>
              <Box className="ssf-text" sx={{ overflow: "hidden", padding: "20px", height: "75%", background: "rgb(255 255 255 / 28%)", width: "100%" }}>
                <h2 style={{ textAlign: "center", color: "white" }}>{feature.feature}</h2>
                <p style={{ textAlign: "center", color: "white", marginTop: "15px" }}>{feature.tagline}</p>
              </Box>
              <Link to={feature.link}><Button variant="contained" sx={{ width: "100%", borderRadius: "0", backgroundColor: "#86b78d21", ":focus": { backgroundColor: "#86b78d21" } }}>Open</Button></Link>
            </Box>
          </Zoom>
        ))}
      </Box>
    </Box>
  )
}

export default Main