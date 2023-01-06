import logo from '../static/GeoFlexSmallLogo.png'


export default function Navbar(props) {


    if (props.type === 'admin') {
        return (<>
            <nav className="white">
                <div className="nav-wrapper">
                    <div className='row'>
                        <div className='col l2'>
                            <a href="admin/overview" className="left brand-logo black-text"><img src={logo} width="30%" style={{ 'marginTop': '0.5rem' }} className="responsive-img" id="hideOnSmall" /></a>
                        </div>
                        <div className='col l6 m8 s12 offset-l8 offset-m6'>
                            <ul id="nav-mobile" className="center-align">
                                <li><a href="/admin/moderator/overview" className="black-text col">Moderatorer</a></li>
                                <li><a href="/admin/overview" className="black-text">Översikt</a></li>
                                <li><a href="/admin/new/" className="black-text">Skapa en runda</a></li>
                            </ul>
                        </div>
                    </div>


                </div>
            </nav>
        </>
        )
    } else if (props.type === 'mod') {
        return (
            <>
                <nav className="white">
                    <div className="nav-wrapper">
                        <div className='row'>
                            <div className='col l2'>
                                <a href="/moderator/" className="left brand-logo black-text"><img src={logo} width="30%" style={{ 'marginTop': '0.5rem' }} className="responsive-img" id="hideOnSmall" /></a>
                            </div>
                            <div className='col l6 m8 s12 offset-l10 offset-m9 offset-s4'>
                                <ul id="nav-mobile" className="center-align">
                                    <li><a href="/moderator/" className="black-text col">Översikt</a></li>
                                </ul>
                            </div>
                        </div>


                    </div>
                </nav>
            </>
        )
    } else {
        return
    }
}