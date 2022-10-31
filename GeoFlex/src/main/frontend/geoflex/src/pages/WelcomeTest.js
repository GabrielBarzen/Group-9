import Button from "../shared/Button"
import Header from "../shared/Header"
import Title from "../shared/Title"
import Codebox from "../shared/Codebox"


export default function WelcomeTest() {
    return (
        <div className="container-wrapper">
            <Codebox />
            
            <div className="col s8 container"> 
                <div className="row">
                    <div className="center-align">
                        <Button text="Registrera" icon={<i className="small material-icons right">group_add</i>}/>
                    </div>
                </div>
                <div className="row">
                    <div className="center-align">
                        <Button text="Logga in" icon={<i className="small material-icons right">person</i>}/>
                    </div>
                </div>
                <div className="row">
                    <div className="center-align">
                        <Button text="Starta direkt" icon={<i className="small material-icons right">arrow_forward</i>}/>
                    </div>
                </div>    
            </div>
        </div>

        



    )
}
