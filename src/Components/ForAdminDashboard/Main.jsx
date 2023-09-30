import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Collapse,
  Grid,
} from "@mui/material";
import './Main.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("Unresolved");
  const [updateRemark, setUpdateRemark] = useState("");

  const fetchReports = async () => {
    try {
      const response = await axios.get("https://animal-rescue-hub.onrender.com/get-all-reports");

      if (response.status === 200) {
        console.log(response.data);
        setReports(response.data);
      } else {
        setError("Failed to fetch reports");
      }
    } catch (error) {
      setError("Error fetching reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours() % 12 || 12).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const amPm = date.getHours() >= 12 ? "PM" : "AM";

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes} ${amPm}`;

    return formattedDateTime;
  };

  const openModal = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleStatusChange = (e) => {
    setUpdateStatus(e.target.value);
  };

  const handleRemarkChange = (e) => {
    setUpdateRemark(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://animal-rescue-hub.onrender.com/admin-update-report",
        {
          reportId: selectedReport._id,
          status: updateStatus,
          remark: updateRemark,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200) {
        console.log("Report updated successfully");
        toast.success("Report updated successfully");
      } else {
        setError("Failed to update report");
      }
    } catch (error) {
      setError("Error updating report");
    } finally {
      closeModal();
      fetchReports();
      setSelectedReport(null);
      setUpdateStatus("Unresolved");
      setUpdateRemark("");
    }
  };

  return (
    <Box p={0}>
    {loading ? (
      <Typography variant="h5" color="white">Loading...</Typography>
    ) : error ? (
      <Typography variant="h5" color="error">
        {error}
      </Typography>
    ) : (
      <div style={{minHeight:"100vh", padding:"20px", backgroundColor:"#000"}}>
        <Box sx={{
          backgroundColor:'white',
          background:"linear-gradient(135deg, #2E2E2E 0%, #1E1E1E 100%)",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)"
        }}>
        <Typography variant="h4" gutterBottom color="white" textAlign="center">
          All Reports
        </Typography>
        </Box>
       
        <Grid container spacing={2}>
  {reports.map((report) => (
    <Grid item xs={12} sm={6} md={4} key={report.id}>
      <Card
        variant="outlined"
        sx={{
          background:
            "linear-gradient(135deg, #2E2E2E 0%, #1E1E1E 100%)",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
        }}
      >
        <CardContent style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography variant="h6" style={{ color: "#fff" }}>
              Reporter: {report?.reporter?.name}
            </Typography>
            <Typography style={{ color: "#fff" }}>
              Landmark: {report.landmark}
            </Typography>
            <Typography style={{ color: "#fff" }}>
              Animal: {report.animalName}
            </Typography>
            <Typography style={{ color: "#fff" }}>
              Condition: {report.condition}
            </Typography>
            <Typography style={{ color: "#fff" }}>
              Status: {report.status}
            </Typography>
          </div>

          <Box style={{backgroundColor:"gray",borderRadius:"5px", padding:"10px" }}> 
            <Typography

              variant="h6"
              style={{ color: "#fff"}}
            >
              Last Update:
            </Typography>
            {report?.updatesArray?.length !== 0 ? (
              <div>
                <ul className="updates-list">
                  <li>
                    <Typography variant="body1" style={{ color: "#fff" }}>
                      Remark:{" "}
                      {report.updatesArray[report.updatesArray.length - 1].remark ||
                        "No remark available"}
                    </Typography>
                    <Typography variant="body1" style={{ color: "#fff"  }}>
                      Time:{" "}
                      {formatDate(
                        report.updatesArray[report.updatesArray.length - 1].updateTime
                      )}
                    </Typography>
                    <Typography variant="body1" style={{ color: "#fff" }}>
                      Status:{" "}
                      {report.updatesArray[report.updatesArray.length - 1].status}
                    </Typography>
                  </li>
                </ul>
              </div>
            ) : (
              <div style={{ color: "white" }}>No updates
              <br/> available</div>
            )}
          </Box>
        </CardContent>

        <Box ml={2} mb={2}>
          <Button
            variant="contained"
            onClick={() => openModal(report)}
            style={{ marginTop: "10px" }}
          >
            Update
          </Button>
          <Button
            component={Link}
            to={`/report/${report._id}`}
            variant="contained"
            color="primary"
            style={{ marginLeft: "10px", marginTop: "10px" }}
          >
            More
          </Button>
        </Box>
      </Card>
    </Grid>
  ))}
</Grid>
{isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
   
      <Box >
      <Typography variant="h3" style={{ marginBottom: "3px" ,textAlign:"center",color:'white'}}>
        Update Report
      </Typography>
      </Box>
      <div className="close" onClick={closeModal} style={{fontSize:"70px", margin:"100px 200px", padding:"0px 25px 5px", border:"3px solid #fff", borderRadius:"50%"}}>
        &times;
      </div>
      <label htmlFor="status" style={{margin:"20px"}}>Status:</label>
      <select
        id="status"
        value={updateStatus}
        onChange={handleStatusChange}
      >
        <option value="Unresolved">Unresolved</option>
        <option value="Picked up">Picked up</option>
        <option value="Admitted">Admitted</option>
        <option value="Police case registered">Police case registered</option>
        <option value="Released">Released</option>
        <option value="Closed">Closed</option>
      </select>
      <br />
      <label htmlFor="remark" style={{margin:"20px"}}>Remark:</label>
      <textarea
        id="remark"
        value={updateRemark}
        onChange={handleRemarkChange}
        rows="4"
        cols="50"
      ></textarea>
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
      >
        Submit
      </Button>
    </div>
  </div>
)}
 </div>
    )}
    <ToastContainer />
  </Box>
  );
};

export default Main;
