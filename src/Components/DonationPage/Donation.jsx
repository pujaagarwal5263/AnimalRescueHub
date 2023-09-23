import { Box } from "@mui/material";
import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Logo from '../../assets/razorpay.svg';
import Cat from '../../assets/we.jpg';

function Donation() {

  const [Payment,setPayment ] = useState(0);
      const buttonStyle1 = {
       backgroundColor:"#645BFB", 
       color:"white",
       width:"30%",
       fontWeight:300,
        fontSize: '20px', 
        padding: '8px 16px',
       
      };

      const filledColor = 'blue'; 
      const normalColor = 'green'; 
      const height = '30px';
    
      const linearProgressStyles = {
        height: height,
        backgroundColor: normalColor, 
      };
    
      const barStyles = {
        backgroundColor: filledColor,
      };

      const handleDonate =() =>{
        handlePayment(Payment) ;
           }

      const handlePayment = (props) => {
        console.log(props);
        
        const options = {
          key: "rzp_test_XphPOSB4djGspx", 
          key_secret: "CCrxVo3coD3SKNM3a0Bbh2my",
          amount: props*100, // Amount in paisa (e.g., 1000 paisa = ₹10)
          currency: "INR",
          name: "Fundify",
          description: "Payment for Product",
          handler: function (response) {
            console.log(response);
            alert("payment done");
          },
          prefill: {
            name: "Sandeep Kumar",
            email: "sd769113@gmail.com",
            contact: "7839107384",
          },
          notes: {
            address: "Fundify Corporate office",
          },
          theme: {
            color: "#F37254", 
          },
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
   

  return(
    <div style={{
      backgroundColor:"black",
     height:"100vh",
     width: "100%",  
 
     
    }}> 
    <div style={{
      
        backgroundImage: `url(${Cat})`,
        backgroundPosition: 'top right',
        backgroundRepeat:  'no-repeat',
        position: 'fixed',
     right: 0,
     top: 0,
    }}>

  
      <Box style={{padding:"100px"}}>
         <Typography style={{color:"white", fontWeight:"bold", fontSize:"80px", fontFamily:"inherit"}}>Help us</Typography>
         <Typography style={{color:"white", fontWeight:"bold",  fontSize:"80px" ,fontFamily:"inherit"}}>Help them.</Typography>
        <Box style={{marginTop:"10px" , width:"45%",marginBottom:"24px" }}>
        <LinearProgress
      sx={{ borderRadius: '5px' }} 
      style={linearProgressStyles}
    >
      <div style={barStyles} />
    </LinearProgress>        <Box style={{display:"flex",justifyContent:"space-between", }}>
          <Typography  style={{color:"white", fontWeight:"bold",  fontFamily:"inherit"}}>
          ₹ 400 donated 
      </Typography>
      <Typography style={{color:"white", fontWeight:"bold", fontFamily:"inherit" ,justifyContent:"center"}}>
      ₹ 500 goal
      </Typography>
          </Box>
         </Box>
         <Typography 
          style={{color:"white",fontSize:"20px" ,   fontFamily:"inherit"}}
         >Support animal care and welfare by making a donation today. Your contribution helps provide shelter, food, and medical care to animals in need,
             ensuring a brighter and healthier future for our furry friends.</Typography>  
             <Box style={{display:"flex" ,marginTop:"25px",marginBottom:"25px", }}>
            <Button variant="outlined" 
            onClick={() => setPayment(100)}
             sx={{  border: '5px dotted white', 
             marginRight: '20px',
             fontSize: '25px', 
             padding: '16px',
             width:"126px",
             borderRadius:"16px",   
            ':hover': { backgroundColor: '#645BFB',color:'white' , border: 'none', borderRadius:"16px",} }}>
₹100
</Button>
            <Button variant="outlined" 
             onClick={() => setPayment(500)}
              sx={{  border: '5px dotted white', 
             marginRight: '20px',
             fontSize: '25px', 
             padding: '16px',
             width:"126px",
             borderRadius:"16px",   
            ':hover': { backgroundColor: '#645BFB',color:'white' , border: 'none', borderRadius:"16px",} }}>
            ₹500
            </Button>
            <Button variant="outlined"  
             onClick={() => setPayment(1000)}
            sx={{  border: '5px dotted white', 
             marginRight: '20px',
             fontSize: '25px', 
             padding: '16px',
             width:"126px",
             borderRadius:"16px",   
            ':hover': { backgroundColor: '#645BFB',color:'white' , border: 'none', borderRadius:"16px",} }}>
            ₹1000
            </Button>
            <Button variant="outlined"  
             onClick={() => setPayment(2000)}
            sx={{  border: '5px dotted white', 
             marginRight: '20px',
             fontSize: '25px', 
             padding: '16px',
             width:"126px",
             borderRadius:"16px",   
            ':hover': { backgroundColor: '#645BFB',color:'white' , border: 'none', borderRadius:"16px",} }}>
            ₹2000
            </Button>
             </Box>
            <Box style={{display:"flex" }}>
                <Button variant="solid" style={buttonStyle1} onClick={() => handleDonate()}>Donate</Button>
                <Typography  style={{color:"white", fontWeight:400,  fontFamily:"inherit",marginTop:"15px", marginLeft:"32px" ,marginRight:"12px"}}>
                Secured by 
               </Typography>
               <img
                  src={Logo}
                  alt="Description of your image"
                />
                    
            </Box>
      </Box>
      </div>
    </div>
  )
}

export default Donation;
