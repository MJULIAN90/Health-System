import './App.css';
import Home from './views/Home';
import LandingPage from './views/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useInit } from '../src/Hooks'

function App() {
  const hook = useInit()
  return (
    <div >
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<LandingPage {...hook} />} />
          <Route path="/home" element={<Home {...hook} />} />
          <Route path="*" element={< LandingPage {...hook}/>} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}



export default App;
