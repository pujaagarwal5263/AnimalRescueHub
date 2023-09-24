import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Home from './Pages/Home';
import AnimalReport from './Pages/AnimalReport';
import MyReports from './Pages/MyReports';
import AllReports from './Pages/AllReports';
import Track from './Pages/Track';
import Emergency from './Pages/Emergency';
import Breed from './Pages/Breed';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import Donation from './Components/DonationPage/Donation';
import GetReportById from './Pages/GetReportById';

function App() {

  return (
   <BrowserRouter>
    <div className="pages">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/report' element={<AnimalReport/>}/>
        <Route path='/myreports' element={<MyReports />}/>
        <Route path='/check-report/:reportId' element={<GetReportById />} />
        <Route path='/allreports' element={<AllReports />}/>
        <Route path='/track' element={<Track/>}/>
        <Route path='/emergency' element={<Emergency/>}/>
        <Route path='/breed' element={<Breed/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
        <Route path='/donation' element={<Donation/>}/>
      </Routes>
    </div>
   </BrowserRouter>
  )
}

export default App