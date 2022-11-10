import Logo from "../shared/Logo"
import Login from "../shared/Login"



export default function AdminLogin() {
    return (
        <div className="container">
            <div className="row">
                <Logo />
            </div>
            <div className="row">
                <div className="white z-depth-2 container-css col s10"> 
                    <div className="row">
                        <Login />
                    </div>
            </div>
            </div> 
        </div>

    )
}
