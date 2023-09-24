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
      const response = await axios.get("http://localhost:8000/get-all-reports");

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
        "http://localhost:8000/admin-update-report",
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
        // You may want to update the reports state or reload the data here
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
    <Box  p={2}>
      {loading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : error ? (
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      ) : (
        <div>
          <Typography variant="h4" gutterBottom>
            All Reports
          </Typography>
          <ul>
            {reports.map((report) => (
              <Card
                key={report.id}
                variant="outlined"
                style={{ marginBottom: "10px" }}
              >
                <CardContent>
                  <Typography variant="h6">
                    Reporter: {report?.reporter?.name}
                  </Typography>
                  <Typography>Landmark: {report.landmark}</Typography>
                  <Typography>Animal: {report.animalName}</Typography>
                  <Typography>Condition: {report.condition}</Typography>
                  <Typography>Status: {report.status}</Typography>
                  <Typography variant="h6">Last Update:</Typography>
                  {report?.updatesArray?.length !== 0 ? (
                    <div>
                      <ul className="updates-list">
                        {/* Get the last update from the updatesArray */}
                        <li>
                          <Typography variant="body1">
                            Remark:{" "}
                            {report.updatesArray[report.updatesArray.length - 1]
                              .remark || "No remark available"}
                          </Typography>
                          <Typography variant="body1">
                            Time:{" "}
                            {formatDate(
                              report.updatesArray[
                                report.updatesArray.length - 1
                              ].updateTime
                            )}
                          </Typography>
                          <Typography variant="body1">
                            Status:{" "}
                            {
                              report.updatesArray[
                                report.updatesArray.length - 1
                              ].status
                            }
                          </Typography>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div>No updates available</div>
                  )}
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
                </CardContent>
              </Card>
            ))}
          </ul>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <Typography variant="h3">Update Report</Typography>
            <label style={{color:"black"}}>Status:</label>
            <select
              value={updateStatus}
              onChange={handleStatusChange}
              style={{ marginBottom: "10px" }}
            >
              <option value="Unresolved">Unresolved</option>
              <option value="Picked up">Picked up</option>
              <option value="Admitted">Admitted</option>
              <option value="Police case registered">
                Police case registered
              </option>
              <option value="Released">Released</option>
              <option value="Closed">Closed</option>
            </select>
            <br />
            <label style={{color:"black"}}>Remark:</label>
            <textarea
              value={updateRemark}
              onChange={handleRemarkChange}
              rows="4"
              cols="50"
              style={{ marginBottom: "10px" }}
            ></textarea>
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              style={{ marginBottom: "10px" }}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
       <ToastContainer />
    </Box>
  );
};

export default Main;
