import { Box,Button,Zoom, CircularProgress } from '@mui/material'
import React, {useEffect, useState} from 'react'
import bgImg from '../../assets/secondSection.jpg';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Main() {
    const [isDesktop, setIsDesktop] = useState(false);
    const [checked, setChecked] = useState(true);
    const [refno,setRefno] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    function isValidObjectId(str) {
        // Regular expression to match a valid MongoDB ObjectID
        const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    
        return objectIdPattern.test(str);
    }

    useEffect(() => {
        toast.error(error);
        setError(null);
    }, [error])

    const getUpdates = async () => {
        setLoading(true);
        if(!refno){
            setLoading(false);
            setError("Input field is empty!");
            return
        }
        if(isValidObjectId(refno)){
            try {
                const response = await axios.post('https://animal-rescue-hub.onrender.com/track', {reportId:refno} );
                if(response.status === 200) {
                    console.log(response.data);
                    setData(response.data.updates.reverse());
                    setLoading(false);
                }
                else{
                    setLoading(false);
                    setError(response.data.message)
                }

                
            } catch (error) {
                setLoading(false)
                setError("Internal Server Error!");
            }
        }
        else{
            setError("Reference ID is invalid!");
            setLoading(false)
        }
    }


  return (

    <Box className={`report-status ${!isDesktop ? 'mobile' : 'desktop'}`} sx={{
        minHeight: "100vh",
          width: "100%",
          overflow: "hidden",
          background: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          backgroundAttachment:"fixed",
          flexDirection: "column"
      }}>
        <Box sx={{padding:"80px 30px 30px"}}>
            <h1 style={{color:"#fff", textAlign:"center", textDecoration:"underline"}}>Search for Reports</h1>

            <Zoom in={checked}>
            <Box className="serach-box" sx={{marginTop:"20px"}}>
                <p style={{color:"#fff", fontSize:"18px", margin:"15px 0", padding:"10px", backgroundColor:"#0A87BA", borderRadius:"10px"}}>After submitting a report, a reference number is emailed to your registered email ID</p>
                <p style={{color:"#fff", fontSize:"18px"}}><b>Enter report ref. number</b></p>
                <input type="text" value={refno} onChange={(e) => {setRefno(e.target.value)}} placeholder="Report's ref. number" style={{padding:"15px 10px", margin:"20px 0", width:"100%"}} autoFocus/>

                <div className="st-btn" style={{width:"100%"}}><Button variant='contained' sx={{backgroundColor:"#0A87BA", width:"120px"}} onClick={getUpdates}>Check</Button></div>
            </Box>
            </Zoom>

            {loading ? <Zoom in={checked}><div style={{width:"100%",marginTop:"20px", display:"flex", alignItems:"center", justifyContent:"center"}}><CircularProgress /></div></Zoom> : <Zoom in={checked}>
                <Box sx={{margin:"30px"}}>
                    {data?.map((update) => (
                        <Box key={update._id} sx={{
                            color:"#fff",
                            borderTop:"2px solid #fff",
                            padding:"20px 0",
                            fontSize:"18px"
                        }}>
                            <p style={{margin:"10px 0"}}><b>Updated At : </b>{update.updateTime}</p>
                            <p style={{margin:"10px 0"}}><b>Status : </b>{update.status}</p>
                            <p style={{margin:"10px 0"}}><b>Remarks : </b>{update.remark}</p>
                        </Box>
                    ))}
                </Box>
            </Zoom>}


        </Box>


        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    </Box>
  )
}

export default Main