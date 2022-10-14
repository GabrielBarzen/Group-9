import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Static from './static/Static';
import Admin from './pages/Admin';
import Start from './pages/Start';
import Mod from './pages/Mod';



export default function App() {    
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Static />} >
                <Route index element={<Start />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/mod' element={<Mod />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);