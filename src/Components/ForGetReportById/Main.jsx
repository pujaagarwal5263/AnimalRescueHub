import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { Box,Zoom,CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import bgImg from '../../assets/secondSection.jpg';
import Slider from 'react-slick';


function Main() {

    const {reportId} = useParams()
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [checked, setChecked] = useState(true);



    const getReportData = async () => {
        const authToken = localStorage.getItem("token");
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:8000/get-report-by-id/${reportId}`, {
            headers: {
              Authorization: `Bearer ${authToken}`
            },
          })
          if(response.status == 200){
            setData(response.data.report);
            console.log(response.data)
            setLoading(false)
          }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getReportData()
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };


  return (
    <Box className={`getReport ${!isDesktop ? 'mobile' : 'desktop'}`} sx={{
        minHeight: "100vh",
          width: "100%",
          overflow: "hidden",
          background: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          backgroundAttachment:"fixed",
          flexDirection: "column"
      }}>
       <Box sx={{padding:"80px 30px"}}>
        {loading ? <Box sx={{display:"flex", justifyContent:"center", paddingTop:"50px"}}><CircularProgress /></Box> : 
            <Zoom in={checked}>
                <Box>
                    <h1 style={{color:"#fff", textAlign:"center", textDecoration:"underline"}}>Detailed Report</h1>

                    <Box sx={{color:"#fff"}}>
                        
                        <Box sx={{ marginTop:"30px"}}>
                            <p style={{fontSize:"28px"}}><b>Animal Type :</b><span style={{marginLeft:"20px"}}>{data?.animalName}</span></p>
                        </Box>

                        <Box sx={{ marginTop:"30px"}}>
                            <p style={{fontSize:"28px"}}><b>Breed :</b><span style={{marginLeft:"20px"}}>{data?.breed}</span></p>
                        </Box>

                        <Box sx={{ marginTop:"30px"}}>
                            <p style={{fontSize:"28px"}}><b>Status :</b><span style={{marginLeft:"20px"}}>{data?.status}</span></p>
                        </Box>

                        <Box sx={{ marginTop:"30px"}}>
                            <p style={{fontSize:"28px"}}><b>Condition :</b><span style={{marginLeft:"20px"}}>{data?.condition}</span></p>
                        </Box>


                        <Box sx={{ marginTop:"30px"}}>
                            <p style={{fontSize:"28px"}}><b>Location URL :</b><Link to={`${data?.locationURL}`} target="_blank" style={{marginLeft:"20px", color:"#fff", textDecoration:"underline"}}>Click Here</Link></p>
                        </Box>

                        <Box sx={{ marginTop:"30px"}}>
                            <p style={{fontSize:"28px"}}><b>Landmark :</b><span style={{marginLeft:"20px"}}>{data?.landmark}</span></p>
                        </Box>

                        <Box sx={{ marginTop: "30px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection:"column" }}>
                        <p style={{fontSize:"28px", fontWeight:"600"}}>Images</p>
                                {data?.imageUrls && data?.imageUrls?.map((image, index) => (
                                    <div key={index}>
                                        <Link to={image} target="_blank"><img style={{width:"250px", height:"250px", margin:"10px 0"}} src={image} alt="asdf" /></Link>
                                    </div>
                                ))}
                        </Box>

                    </Box>
                
                </Box>
            </Zoom>
        }
       </Box>
    </Box>
  )
}

export default Main