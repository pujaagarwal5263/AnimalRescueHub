import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './Pages/LandingPage';

function App() {

  return (
   <BrowserRouter>
    <div className="pages">
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </div>
   </BrowserRouter>
  )
}

export default App
