import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Breed from './Breed';
import Camera from "./Camera";
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/breed" element={<Breed />} />
      <Route path="/camera" element={<Camera />} />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
