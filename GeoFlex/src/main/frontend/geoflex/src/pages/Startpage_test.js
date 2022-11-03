import Codebox from "../shared/Codebox"
import Logo from "../shared/Logo"
import QRscanner from "../shared/QR"



export default function WelcomeTest() {
    return (
        <div className="container">
            <div className="row">
                <Logo />
            </div>
            <div className="row">
                <div className="col s10 offset-s2 button-container"> 
                    <div className="row">
                        <Codebox />
                    </div>
                    <div className="row">
                        <QRscanner />
                </div>    
            </div>
            </div>  
        </div>
       
    )
}
