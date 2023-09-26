import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Logo from '../../assets/razorpay.svg';
import Cat from '../../assets/we.jpg';
import { SettingsOutlined } from "@material-ui/icons";

function Donation() {

  const [Payment,setPayment ] = useState(0);
  const [displayPay, setDisplayPay] = useState(0);
  const [progress, setProgress] = React.useState(0);

  useEffect(()=>{
    const oldPay = localStorage.getItem("payment")
    if(oldPay){
      setDisplayPay(parseInt(oldPay))
      setProgress(parseInt(oldPay)/50)
    }
  },[displayPay])

      const buttonStyle1 = {
       backgroundColor:"#645BFB", 
       color:"white",
       width:"50%",
       fontWeight:300,
        fontSize: '15px', 
        height: "50px",
        marginTop:"15px"
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

      const handleDonate =async() =>{
        handlePayment(Payment);
        const oldPay = localStorage.getItem("payment");
        if(oldPay){
          const newPay = parseInt(oldPay) + Payment;
          localStorage.setItem("payment",newPay)
          setProgress(newPay/50)
          setDisplayPay(parseInt(newPay))
        }else{
          localStorage.setItem("payment",Payment)
          setProgress(Payment/50)
          setDisplayPay(parseInt(Payment))
        }
      }

      const handlePayment = (props) => {
        console.log(props);
        
        const options = {
          key: "rzp_test_XphPOSB4djGspx", 
          key_secret: "CCrxVo3coD3SKNM3a0Bbh2my",
          amount:  props  ? props*100 : 1 * 1000 , 
          currency: "INR",
          name: "Animal Rescue Hub",
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
            address: "ARH Corporate office",
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
 
     
    }}> 
    <div style={{
      backgroundImage: `url(${Cat})`,
      backgroundSize: 'cover',
      backgroundPosition: 'top right',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      position: 'fixed',
      right: 0,
      top: 0,
      width: '100%',
      height: '100vh', 
    }}>

  
      <Box style={{padding:"15px"}}>
         <Typography style={{color:"white", fontWeight:"bold", fontSize:"40px", fontFamily:"inherit"}}>Help us</Typography>
         <Typography style={{color:"white", fontWeight:"bold",  fontSize:"40px" ,fontFamily:"inherit"}}>Help them.</Typography>
        <Box style={{marginTop:"10px" , width:"45%",marginBottom:"24px" }}>
    <LinearProgress variant="determinate" value={progress} style={{width:"340px", height:"20px"}} />
          <Box
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "89vw",
  }}
>
  <Typography
    style={{
      color: "white",
      fontWeight: "bold",
      fontFamily: "inherit",
      flex: "1", 
    }}
  >
    ₹ {displayPay} donated
  </Typography>
  <Typography
    style={{
      color: "white",
      fontWeight: "bold",
      fontFamily: "inherit",
      flex: "1", 
      textAlign: "right", 
    }}
  >
    ₹ 5000 goal
  </Typography>
</Box>

         </Box>
         <br></br>
         <Typography 
          style={{color:"white",fontSize:"15px" ,   fontFamily:"inherit"}}
         >Support animal care and welfare by making a donation today. Your contribution helps provide shelter, food, and medical care to animals in need,
             ensuring a brighter and healthier future for our furry friends.</Typography>  
             <br/>
             <br/>
             <Box style={{display:"flex" ,marginTop:"55px",marginBottom:"15px", }}>
            <Button variant="outlined" 
            onClick={() => setPayment(100)}
             sx={{  border: '2px dotted white', 
             marginRight: '10px',
             fontSize: '15px', 
             padding: '10px',
           
             borderRadius:"10px",
             height:"50px", 
             width:"50px",  
            ':hover': { backgroundColor: '#645BFB',color:'white' , border: 'none', borderRadius:"10px",} }}>
₹100
</Button>
            <Button variant="outlined" 
             onClick={() => setPayment(500)}
              
             sx={{  border: '2px dotted white', 
             marginRight: '10px',
             fontSize: '15px', 
             padding: '10px',
            
             borderRadius:"10px",
             height:"50px", 
             width:"50px",  
            ':hover': { backgroundColor: '#645BFB',color:'white' , border: 'none', borderRadius:"10px",} }}>
            ₹500
            </Button>
            <Button variant="outlined"  
             onClick={() => setPayment(1000)}
             sx={{  border: '2px dotted white', 
             marginRight: '10px',
             fontSize: '15px', 
             padding: '10px',
    
             borderRadius:"10px",
             height:"50px", 
             width:"50px",  
            ':hover': { backgroundColor: '#645BFB',color:'white' , border: 'none', borderRadius:"10px",} }}>
            ₹1000
            </Button>
            <Button variant="outlined"  
             onClick={() => setPayment(2000)}
             sx={{  border: '2px dotted white', 
             marginRight: '10px',
             fontSize: '15px', 
             padding: '10px',
            
             borderRadius:"10px",
             height:"50px", 
             width:"50px",  
            ':hover': { backgroundColor: '#645BFB',color:'white' , border: 'none', borderRadius:"10px",} }}>
            ₹2000
            </Button>
             </Box>
            <Box style={{display:"flex", justifyContent:"space-between" }}>
                <Button variant="solid" style={buttonStyle1} onClick={() => handleDonate()}>Donate</Button>
                <div>

                <Typography  style={{color:"white", fontWeight:400,  fontFamily:"inherit"}}>
                Secured by 
               </Typography>
               <img
                  src={Logo}
                  alt="Description of your image"
                />
                </div>    
            </Box>
      </Box>
      </div>
    </div>
  )
}

export default Donation;
