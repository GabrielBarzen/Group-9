import Button from "../shared/Button"
import Logo from "../shared/Logo"
import { useNavigate } from "react-router-dom";


export default function Firstpage() {
    const navigate = useNavigate();

    function navigateToLogin(){
        navigate('/Loginpage', { replace: true });
    }

    return (
        <div className="container">
            <div className="row">
                <Logo />
            </div>
            <div className="row">
                <div className="col s10 offset-s2"> 
                    <div className="row">
                        <Button text="Registrera" css="col s10" icon={<i className="small material-icons right">group_add</i>}/>
                    </div>
                    <div className="row">
                        <Button text="Logga in" css="col s10" icon={<i className="small material-icons right">person</i>} click={navigateToLogin}/>
                    </div>
                    <div className="row">
                        <Button text="Starta direkt" css="col s10" icon={<i className="small material-icons right">arrow_forward</i>}/>
                </div>    
            </div>
            </div> 
        </div>
    )
}
