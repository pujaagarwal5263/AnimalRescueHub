import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get-all-reports');

        if (response.status === 200) {
            console.log(response.data);
          setReports(response.data);
        } else {
          setError('Failed to fetch reports');
        }
      } catch (error) {
        setError('Error fetching reports');
      } finally {
        setLoading(false);
      }
    };

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
  }

  return (
    <div style={{ backgroundColor: 'red' }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h2>All Reports</h2>
          <ul>
            {reports.map((report) => (

              <li key={report.id}>
                <p>Location URL: {report.locationURL}</p>
                <p>Landmark: {report.landmark}</p>
                <p>Animal: {report.animalName}</p>
                <p>Condition: {report.condition}</p>
                <p>status: {report.status}</p>
                <p>Breed: {report.breed}</p>
                <p>Reporter: {report?.reporter?.name}</p>
                <p>Updates: {(report?.updatesArray?.length !=0)? 
                <ul>
                    Updates available
                    {report?.updatesArray?.map((data)=>{
                       return(
                        <li key={data._id}>
                           Remark: {(data.remark)? data.remark : "No remark available"}
                           Update Time: {formatDate(data.updateTime)}
                           Status: {data.status}
                       </li>)
                    })}
                </ul> : 
                <div>No updates available</div>}</p>
                <hr/>
              </li>
           
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Main;
