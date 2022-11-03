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
                        <Button text="Registrera" css="col s10" icon={<i className="small material-icons right">group_add</i>}/>
                    </div>
                    <div className="row">
                            <Button text="Logga in" css="col s10" icon={<i className="small material-icons right">person</i>}/>
                    </div>
                    <div className="row">
                            <Button text="Starta direkt" css="col s10" icon={<i className="small material-icons right">arrow_forward</i>}/>
                </div>    
            </div>
            </div>
            
            
            
            
            
            
        </div>

        



    )
}
