import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Static from './static/Static';
import Admin from './pages/Admin';
import Mod from './pages/Mod';
import AdminOverview from './admin/AdminOverview';
import AdminAddNew from './admin/AdminAddNew';
import AdminEdit from './admin/AdminEdit';
import ModOverview from './mod/ModOverview';
import ModEditLocation from './mod/ModEditLocation';
import GameNavigation from './game/GameNavigation';
import GameItem from './game/GameItem';
import GameFinish from './game/GameFinish';
import TestComponents from './shared/TestComponents';
import 'materialize-css/dist/css/materialize.min.css';
import FirstpageTest from './pages/Firstpage'
import ModEdit from './mod/ModEdit';
import Register from './pages/Register'
import TempUser from './pages/tempUser'
import AdminModeratorEdit from './admin/components/AdminModeratorEdit';
import AdminModeratorRegister from './admin/components/AdminModeratorRegister';
import Loginpage from './pages/Loginpage';
import AdminModeratorOverview from './admin/AdminModeratorOverview';
import StartQuiz from './pages/StartQuiz';
import GameLoader from './game/GameLoader';
import ModQrCodes from './mod/ModQrCodes';


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
                    <Route path='/admin/moderator/overview' element={<AdminModeratorOverview />} />
                    <Route path='/admin/moderator/edit/:id' element={<AdminModeratorEdit />} />
                    <Route path='/admin/moderator/create' element={<AdminModeratorRegister />} />

                    <Route path='/moderator' element={<Mod />} />
                    <Route path='/moderator/overview' element={<ModOverview />} />
                    <Route path='/moderator/edit/:id' element={<ModEdit />} />
                    <Route path='/moderator/edit/:id/location/:id' element={<ModEditLocation />} />
                    <Route path='/moderator/qr-codes/:id' element={<ModQrCodes />} />                    

                    <Route path='/game/start' element={<StartQuiz />} />
                    <Route path='/game/:id/welcome' element={<GameLoader />} />
                    <Route path='/game/:id/navigation' element={<GameNavigation />} />
                    <Route path='/game/route/:id/location/:id' element={<GameItem />} />
                    <Route path='/game/:id/finish' element={<GameFinish />} />

                    <Route path='/test' element={<TestComponents />} />
                    <Route path='/Firstpagetest' element={<FirstpageTest />} />
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