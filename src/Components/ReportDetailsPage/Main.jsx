import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Link, Button, Collapse } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Main = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [showUpdates, setShowUpdates] = useState(false);
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = (hours % 12) + ':' + minutes + ' ' + ampm;
    return `${year}-${month}-${day} ${formattedTime}`;
  };

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/get-report-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = response.data.report;
        setReport(data);
      } else {
        console.log('Failed to fetch report');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const handleToggleUpdates = () => {
    setShowUpdates(!showUpdates);
  };
  const goBack =  () =>{
    navigate("/admindashboard")
  }

  return (
    <Box p={4} backgroundColor="black" minHeight={"100vh"} color="white">
      <Box style={{
          backgroundColor:'white',
          background:"linear-gradient(135deg, #2E2E2E 0%, #1E1E1E 100%)",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)"
        }}>
      <Typography variant="h4" textAlign="center">Report Details</Typography>
      </Box>
      {report ? (
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:"space-around" }}>
            <Box style={{ flex: 1 ,marginLeft:"123px" ,border:"1px solid black",marginTop:"23px"}}>
              <Box  width="35vw" px="30px" py="30px" height="30vh" borderRadius="5px" style={{
          background:
            "linear-gradient(135deg, #2E2E2E 0%, #1E1E1E 100%)",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
        }}>
              <Typography variant="body1">Reporter: {report?.reporter?.name}</Typography>
              <Typography variant="body1">
                Location: <Link href={report.locationURL} target="_blank" rel="noopener noreferrer">View on Map</Link>
              </Typography>
              <Typography variant="body1">Landmark: {report.landmark}</Typography>
              <Typography variant="body1">Animal: {report.animalName}</Typography>
              <Typography variant="body1">Breed: {report.breed}</Typography>
              <Typography variant="body1">Condition: {report.condition}</Typography>
              <Typography variant="body1">Status: {report.status}</Typography>
              </Box>
            </Box>
            <Box style={{marginTop:"50px", border:"1px solid black",}}>
            {report.imageUrls.length > 0 && (
              <div style={{ maxWidth: '500px', width: '100%' }}>
                <Carousel infiniteLoop autoPlay showThumbs={false}>
                  {report.imageUrls.map((imageUrl, index) => (
                    <div key={index}>
                      <img src={imageUrl} alt={`Image ${index}`} />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
            </Box>
          </div>
          <Collapse in={showUpdates} style={{marginLeft:"123px"}}>
            {report.updatesArray?.length > 0 ? (
                <Box>
                <Typography variant="h5" mt={4}>
                Updates:
              </Typography>
              <br/>
              <ul className="updates-list" style={{listStyle:"none"}}>
                {report.updatesArray.map((update) => (
                  <li key={update._id} className="update-item">
                    <Box style={{
          background:
            "linear-gradient(135deg, #2E2E2E 0%, #1E1E1E 100%)",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
          width:"35vw",
          padding:"10px",
          borderRadius:"5px"
        }}>
                    <Typography variant="body1">
                      Update Time: {formatDateTime(update.updateTime)}
                    </Typography>
                    <Typography variant="body1">Status: {update.status}</Typography>
                    {update.remark && (
                      <Typography variant="body1">Remark: {update.remark}</Typography>
                    )}
                    
                    </Box>
                    <br/>
                  </li>
                ))}
              </ul>
              </Box>
            ) : (
              <div>
                <br/>
              <Typography variant="body1">No updates available</Typography>
              </div>
            )}
          </Collapse>
          <Button variant="outlined" onClick={handleToggleUpdates} style={{marginLeft:"123px",marginTop:"23px"}}>
            {showUpdates ? 'Hide Updates' : 'Show Updates'}
          </Button>

          <Button variant='outlined' onClick={goBack} style={{marginLeft:"123px",marginTop:"23px"}}>
             Back
          </Button>
        </div>
      ) : (
        <Typography variant="body1">Fetching report...</Typography>
      )}
    </Box>
  );
};

export default Main;
