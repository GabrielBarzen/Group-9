import logo from '../static/GeoFlexSmallLogo.png'
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";



export default function Navbar(props) {

    const navigate = useNavigate();
    const cookies = new Cookies();

    function handleLogOut(){
        cookies.remove("role");
        cookies.remove("user-id");
        cookies.remove("authentication-token");
        navigate('/', { replace: true });
    }


    if (props.type === 'admin') {
        return (<>
            <nav className="nav-extended">
                <div className="nav-wrapper white">
                    <a href="/admin/" className="left brand-logo black-text"><img src={logo} width="30%" style={{ 'marginTop': '0.5rem' }} className="responsive-img" alt="logotype" /></a>
                </div>
                <div class="nav-content white">
                    <ul class="tabs tabs-transparent">
                        <li className="tab"><a href="/admin/moderator/overview/" className="black-text">Moderatorer</a></li>
                        <li className="tab"><a href="/admin/overview/" className="black-text">Översikt</a></li>
                        <li className="tab"><a className="active black-text" href="/" onClick={handleLogOut}>Logga ut</a></li>
                    </ul>
                </div>
            </nav>
        </>
        )
    } else if (props.type === 'mod') {
        return (
            <>
                <nav className="nav-extended">
                    <div className="nav-wrapper white">
                        <a href="/moderator/" className="left brand-logo black-text"><img src={logo} width="30%" style={{ 'marginTop': '0.5rem' }} className="responsive-img" alt="logotype" /></a>
                    </div>
                    <div className="nav-content white">
                        <ul className="tabs tabs-transparent">
                            <li className="tab"><a href="/moderator/" className="black-text">Översikt</a></li>
                            <li className="tab"><a className="active black-text" href="/" onClick={handleLogOut}>Logga ut</a></li>
                        </ul>
                    </div>
                </nav>
            </>
        )
    } else {
        return
    }
}