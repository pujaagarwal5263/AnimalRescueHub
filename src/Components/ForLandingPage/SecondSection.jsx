import React, { useState } from 'react';
import { Box, Button, Zoom, Modal } from '@mui/material';
import bgImg from '../../assets/secondSection.jpg';
import featureData from '../../assets/featuresData';
import featureDescriptions from '../../assets/featureDescriptions';
import { Link } from 'react-router-dom';

function SecondSection() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState(false); 
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null); 

  const handleOpen = (index) => {
    setSelectedFeatureIndex(index); 
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeatureIndex(null); 
  };

  return (
    <Box
      className={`moreInfo ${!isDesktop ? 'mobile' : 'desktop'}`}
      id="moreInfo"
      sx={{
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        background: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundAttachment:"fixed",
        flexDirection: "column"
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "22px", color: "#fff", margin: "30px 0 0" }}>Discover Our Paw-some Features</h1>

      <Box className="ss-features" sx={{ width: "100%", overflow: "hidden", padding: "0 30px 30px" }}>
        {featureData?.map((feature, index) => (
          <Zoom key={index} in={checked}>
            <Box className="ss-feature" sx={{ width: "100%", height: "150px", margin: "35px 0", background: "transparent", borderRadius: "15px", overflow: "hidden", boxShadow: "0px 0px 20px 11px rgba(0,0,0,0.2)" }}>
              <Box className="ssf-text" sx={{ overflow: "hidden", padding: "20px", height: "75%", background: "rgb(255 255 255 / 28%)", width: "100%" }}>
                <h2 style={{ textAlign: "center", color: "white" }}>{feature.feature}</h2>
                <p style={{ textAlign: "center", color: "white", marginTop: "15px" }}>{feature.tagline}</p>
              </Box>
              <Button variant="contained" onClick={() => handleOpen(index)} sx={{ width: "100%", borderRadius: "0", backgroundColor: "#86b78d21", ":focus": { backgroundColor: "#86b78d21" } }}>Know More</Button>
            </Box>
          </Zoom>
        ))}

        <Box sx={{display:"flex", justifyContent:"center"}}><Link to='/donation' ><Button variant='contained' sx={{backgroundColor:"#0A87BA"}}>Donate Us</Button></Link></Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ p: "20px" }}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          bgcolor: 'rgba(255,255,255,0.2)',
          boxShadow: 24,
          backdropFilter: "blur(10px)",
          borderRadius: "10px",
          p: 4,
        }}>
          <h1 style={{ color: "#fff", textAlign: "center" }}>{featureData[selectedFeatureIndex]?.feature}</h1>
          <ul style={{ marginTop: "20px", color: "white", padding: "0 20px", textAlign: "justify", fontSize: "18px" }}>
            {featureDescriptions[selectedFeatureIndex]?.description.map((point, pointIndex) => (
              <li key={pointIndex} style={{ margin: "20px 0" }}>{point}</li>
            ))}
          </ul>
        </Box>
      </Modal>
    </Box>
  )
}

export default SecondSection;
