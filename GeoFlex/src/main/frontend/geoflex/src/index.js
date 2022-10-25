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
import ModGamePlaces from './mod/ModGamePlaces';
import ModGameSetup from './mod/ModGameSetup';
import ModGameEditPlace from './mod/ModGameEditPlace';
import GameWelcome from './game/GameWelcome';
import GameNavigation from './game/GameNavigation';
import GameItem from './game/GameItem';
import GameFinish from './game/GameFinish';
import TestComponents from './shared/test/TestComponents';
import Welcome from './pages/Welcome';
import 'materialize-css/dist/css/materialize.min.css';
import WelcomeTest from './pages/WelcomeTest';


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Static />} >
                    <Route index element={<Start />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/admin/overview' element={<AdminOverview />} />
                    <Route path='/admin/new/' element={<AdminAddNew />} />
                    <Route path='/admin/edit/:id' element={<AdminEdit />} />
                    <Route path='/mod' element={<Mod />} />
                    <Route path='/mod/overview' element={<ModOverview />} />
                    <Route path='mod/edit/:id' element={<ModGameSetup />} />
                    <Route path='mod/edit/:id/places/' element={<ModGamePlaces />} />
                    <Route path='mod/edit/:id/edit_place' element={<ModGameEditPlace />} />
                    <Route path='game/:id/welcome' element={<GameWelcome />} />
                    <Route path='game/:id/navigation' element={<GameNavigation />} />
                    <Route path='game/:id/item' element={<GameItem />} />
                    <Route path='game/:id/finish' element={<GameFinish />} />
                    <Route path='/test' element={<TestComponents />} />
                    <Route path='/welcome' element={<Welcome />} />
                    <Route path='/welcomeTest' element={<WelcomeTest />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);