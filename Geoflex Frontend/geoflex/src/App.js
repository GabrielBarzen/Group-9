import React from "react";
import { useState } from "react";
import Admin from "./admin/Admin";
import Header from "./components/Header"
import Login from "./components/Login";

function App() {
    const [status, setStatus] = useState(true);

    if (!status) {
        return (
            <div>
                <Header/>
                <Login/>                
            </div>
        )
    } else if (status) {
        return (<div>
            <Header/>
            <Admin/>
        </div>)
    }
    
}

export default App;