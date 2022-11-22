import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Static from './static/Static';
import Admin from './pages/Admin';
import Start from './pages/Start';
import Mod from './pages/Mod';
import AdminOverview from './admin/AdminOverview';
import AdminAddNew from './admin/AdminAddNew';
import AdminEdit from './admin/AdminEdit';
import ModOverview from './mod/ModOverview';
import ModEditLocation from './mod/ModEditLocation';
import GameWelcome from './game/GameWelcome';
import GameNavigation from './game/GameNavigation';
import GameItem from './game/GameItem';
import GameFinish from './game/GameFinish';
import TestComponents from './shared/TestComponents';
import 'materialize-css/dist/css/materialize.min.css';
import FirstpageTest from './pages/Firstpage'
import StartpageTest from './pages/Startpage_test'
import AdminLogin from './pages/Loginpage'
import ModEdit from './mod/ModEdit';
import Register from './pages/Register'
import TempUser from './pages/tempUser'
import Loginpage from './pages/Loginpage';


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Static />} >
                    <Route index element={<FirstpageTest />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/admin/overview' element={<AdminOverview />} />
                    <Route path='/admin/new/' element={<AdminAddNew />} />
                    <Route path='/admin/edit/:id' element={<AdminEdit />} />

                    <Route path='/moderator' element={<Mod />} />
                    <Route path='/moderator/overview' element={<ModOverview />} />
                    <Route path='/moderator/edit/:id' element={<ModEdit />} />
                    <Route path='/moderator/edit/:id/location/:id' element={<ModEditLocation />} />

                    
                    

                    <Route path='/game/start' element={<Start />} />
                    <Route path='/game/:id/welcome' element={<GameWelcome />} />
                    <Route path='/game/:id/navigation' element={<GameNavigation />} />
                    <Route path='/game/:id/item' element={<GameItem />} />
                    <Route path='/game/:id/finish' element={<GameFinish />} />

                    <Route path='/test' element={<TestComponents />} />
                    <Route path='/Firstpagetest' element={<FirstpageTest />} />
                    <Route path='/Startpagetest' element={<StartpageTest />} />
                    <Route path='/Loginpage' element={<Loginpage />} />
                    <Route path='/Register' element={<Register />} />
                    <Route path='/TempUser' element={<TempUser />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);