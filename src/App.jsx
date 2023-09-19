import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Home from './Pages/Home';
import AnimalReport from './Pages/AnimalReport';

function App() {

  return (
   <BrowserRouter>
    <div className="pages">
      <Routes>
        <Route path='/' element={<LandingPage />} />

        <Route path='/home' element={<Home />} />
        <Route path='/report' element={<AnimalReport/>}/>
      </Routes>
    </div>
   </BrowserRouter>
  )
}

export default App
