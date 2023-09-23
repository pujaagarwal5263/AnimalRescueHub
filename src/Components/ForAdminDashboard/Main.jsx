import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('Unresolved');
  const [updateRemark, setUpdateRemark] = useState('');

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

  useEffect(() => {
    fetchReports();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours() % 12 || 12).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const amPm = date.getHours() >= 12 ? 'PM' : 'AM';

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
      const token = localStorage.getItem("token")
      const response = await axios.post('http://localhost:8000/admin-update-report', {
        reportId: selectedReport._id,
        status: updateStatus,
        remark: updateRemark,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status == 200) {
        console.log('Report updated successfully');
        // You may want to update the reports state or reload the data here
      } else {
        setError('Failed to update report');
      }
    } catch (error) {
      setError('Error updating report');
    } finally {
      closeModal();
      fetchReports();
      setSelectedReport(null);
      setUpdateStatus('Unresolved');
      setUpdateRemark('');
    }
  };

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
                <p>Status: {report.status}</p>
                <p>Breed: {report.breed}</p>
                <p>Reporter: {report?.reporter?.name}</p>
                <p>
                  Updates:{' '}
                  {report?.updatesArray?.length !== 0 ? (
                    <ul>
                      Updates available
                      {report?.updatesArray?.map((data) => (
                        <li key={data._id}>
                          Remark: {data.remark ? data.remark : 'No remark available'}
                          Update Time: {formatDate(data.updateTime)}
                          Status: {data.status}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>No updates available</div>
                  )}
                </p>
                <button onClick={() => openModal(report)}>Update</button>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Update Report</h2>
            <label>Status:</label>
            <select value={updateStatus} onChange={handleStatusChange}>
              <option value="Unresolved">Unresolved</option>
              <option value="Picked up">Picked up</option>
              <option value="Admitted">Admitted</option>
              <option value="Police case registered">Police case registered</option>
              <option value="Released">Released</option>
              <option value="Closed">Closed</option>
            </select>
            <br />
            <label>Remark:</label>
            <textarea
              value={updateRemark}
              onChange={handleRemarkChange}
              rows="4"
              cols="50"
            ></textarea>
            <br />
            <button onClick={handleUpdate}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
