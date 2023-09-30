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
        const response = await axios.get('https://animal-rescue-hub.onrender.com/get-all-reports');

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
                <p>Reporter: {report?.reporter?.name}</p>
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
