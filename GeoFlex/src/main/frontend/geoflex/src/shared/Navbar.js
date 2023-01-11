import logo from '../static/GeoFlexSmallLogo.png'


export default function Navbar(props) {


    if (props.type === 'admin') {
        return (<>
            <nav className="nav-extended">
                <div className="nav-wrapper white">
                    <a href="/admin/overview/" className="left brand-logo black-text"><img src={logo} width="30%" style={{ 'marginTop': '0.5rem' }} className="responsive-img" alt="logotype" /></a>
                </div>
                <div class="nav-content white">
                    <ul class="tabs tabs-transparent">
                        <li className="tab"><a href="/admin/moderator/overview/" className="black-text">Moderatorer</a></li>
                        <li className="tab"><a href="/admin/overview/" className="black-text">Översikt</a></li>
                        <li className="tab"><a className="active black-text" href="#LoggaUT">Logga ut</a></li>
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
                            <li className="tab"><a className="active black-text" href="#LoggaUT">Logga ut</a></li>
                        </ul>
                    </div>
                </nav>
            </>
        )
    } else {
        return
    }
}