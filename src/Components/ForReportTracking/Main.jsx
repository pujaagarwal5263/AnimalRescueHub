import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [reportId, setReportId] = useState('');
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  function isValidObjectId(str) {
    // Regular expression to match a valid MongoDB ObjectID
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;

    return objectIdPattern.test(str);
}

//65073517fd45274c7ec5930f try with this ID
  const handleSearchClick = async () => {
    setLoading(true);
    setError(null);
    if (isValidObjectId(reportId)) {
      console.log("Valid MongoDB ObjectID");
      try {
        const authToken = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/track/${reportId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        if (response.status == 200) {
          
          if(response.data.length==0){
            console.log("No updates available");
          }else{
            setReportData(response.data);
          }
        } else {
          setError('Failed to fetch report');
        }
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setError('Error fetching report');
      } finally {
        setLoading(false);
      }
  } else {
      console.log("Not a valid MongoDB ObjectID");
  }
  };

  return (
    <div>
      <h2>Track Report</h2>
      <label>
        Enter Report ID:
        <input
          type="text"
          value={reportId}
          onChange={(e) => setReportId(e.target.value)}
        />
      </label>
      <button onClick={handleSearchClick}>Search</button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : reportData ? (
        <div>
        <h3>Report Updates</h3>
        {reportData.map((data) => (
          <div key={data._id}>
            <p>Update Time: {data.updateTime}</p>
            <p>Status: {data.status}</p>
            <p>Remarks: {data.remark}</p>
            <hr/>
          </div>
        ))}
      </div>
      ) : (
        <p>Enter a valid Report ID and click Search to retrieve data.</p>
      )}
    </div>
  );
};

export default Main;
