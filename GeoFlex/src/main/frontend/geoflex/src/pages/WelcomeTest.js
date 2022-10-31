import Button from "../shared/Button"
import Codebox from "../shared/Codebox"
import Logo from "../shared/GeoFlexLogo.png"
import Scanner from "../shared/QR"


export default function WelcomeTest() {
    return (
        <div className="container-wrapper">
            <div className="center-align">
                <img src={Logo} className="logo" alt="GeoFlex logo"></img>
            </div>
            <div className="row">
                <Codebox />  
            </div>
            <div className="row">
                <Scanner />
            </div>
            <div className="row">
                <div className="col s10 container"> 
                    <div className="row">
                        <div className="btn-container">
                            <Button text="Registrera" icon={<i className="small material-icons right">group_add</i>}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="btn-container">
                            <Button text="Logga in" icon={<i className="small material-icons right">person</i>}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="btn-container">
                            <Button text="Starta direkt" icon={<i className="small material-icons right">arrow_forward</i>}/>
                        </div>
                </div>    
            </div>
            </div>
            
            
            
            
            
            
        </div>

        



    )
}
