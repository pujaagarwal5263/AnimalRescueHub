import { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Home from './Pages/Home';
import AnimalReport from './Pages/AnimalReport';
import MyReports from './Pages/MyReports';
import Track from './Pages/Track';
import Emergency from './Pages/Emergency';
import Breed from './Pages/Breed';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import Donation from './Components/DonationPage/Donation';
import GetReportById from './Pages/GetReportById';
import CheckReportStatus from './Pages/CheckReportStatus';
import ReportDetails from './Pages/ReportDetails';

function App() {

  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  useEffect(() => {
    setAuthToken(localStorage.getItem('token'));
    setAdminToken(localStorage.getItem('adminToken'));
    console.log("Auth Token", authToken);
    console.log("Admin token", adminToken)
  }, [authToken, adminToken]);

  return (
   <BrowserRouter>
    <div className="pages">
      <Routes>
        <Route path='/' element={
    adminToken ? (
      <Navigate to='/admindashboard' replace />
    ) : authToken ? (
      <Navigate to='/home' replace />
    ) : (
      <LandingPage />
    )
  } />
        <Route path='/home' element={authToken ? <Home /> : <Navigate to='/' />} />
        <Route path='/report' element={authToken ? <AnimalReport/> : <Navigate to='/' />}/>
        <Route path='/myreports' element={authToken ? <MyReports /> : <Navigate to='/' />}/>
        <Route path='/check-report-status' element={<CheckReportStatus />} />
        <Route path='/check-report/:reportId' element={authToken ? <GetReportById /> : <Navigate to='/' />} />
        {/* <Route path='/allreports' element={<AllReports />}/> */}
        <Route path='/track' element={<Track/>}/>
        <Route path='/emergency' element={authToken ? <Emergency/> : <Navigate to='/' />}/>
        <Route path='/breed' element={authToken ? <Breed/> : <Navigate to='/' />}/>
        <Route path='/adminlogin' element={adminToken ? <Navigate to='/admindashboard' /> : <AdminLogin />}/>
        <Route path='/admindashboard' element={adminToken ? <AdminDashboard/> : <Navigate to='/adminlogin' />}/>
        <Route path='/donation' element={<Donation/>}/>
        <Route path='/report/:id' element={<ReportDetails/>}/>
      </Routes>
    </div>
   </BrowserRouter>
  )
}

export default App