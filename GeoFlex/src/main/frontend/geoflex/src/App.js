import { React, useState } from "react";
import Admin from "./pages/Admin";
import Header from "./shared/Header"
import Login from "./shared/Login";

function App() {
    //status och setStatus är här enbart för att vi kunna låtsas att vi är inloggade eller inte
    const [status, setStatus] = useState("mod");

    if (status === "login") {
        return (
            <div>
                <Header />
                <Login />
            </div>
        )
    } else if (status === "admin") {
        return (
            <div>
                <Header />
                <Admin />
            </div>)
    } else if (status === "mod") {
        return (
            <div>
                <Header />
                <p>lägg till moderatorvy</p>
            </div>)
    }

}

export default App;