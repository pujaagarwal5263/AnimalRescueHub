import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Breed from './Breed';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/breed" element={<Breed />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
