import Button from "../shared/Button"
import Logo from "../shared/Logo"
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useEffect } from "react";

const cookies = new Cookies();

export default function Firstpage() {
    const navigate = useNavigate();

    useEffect(() => {
        /**
         * Check if the user logged in before and has a role cookie.
         */
        redirectIfLoggedIn();
    })

    function redirectIfLoggedIn() {
        const role = cookies.get('role');
        if (role === "user") {
            navigate('/user', { replace: true });
        }
        else if (role === "moderator") {
            navigate('/moderator', { replace: true });
        }
        else if (role === "admin") {
            navigate('/admin', { replace: true });
        }
    }

    function navigateToLogin() {
        navigate('/Loginpage', { replace: false });
    }

    function navigateToRegister() {
        navigate('/Register', { replace: false });
    }

    function navigateToStart() {
        navigate('/game/start', { replace: false })
    }

    return (
        <div className="container">
            <div className="row">
                <Logo />
            </div>
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <Button text="Registrera" css="col s12" icon={<i className="small material-icons right">group_add</i>} click={navigateToRegister} />
                    </div>
                    <div className="row">
                        <Button text="Logga in" css="col s12" icon={<i className="small material-icons right">person</i>} click={navigateToLogin} />
                    </div>
                    <div className="row">
                        <Button text="Starta direkt" css="col s12" icon={<i className="small material-icons right">arrow_forward</i>} click={navigateToStart} />
                    </div>
                </div>
            </div>
        </div>
    )
}
