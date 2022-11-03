import Button from "../shared/Button"
import Logo from "../shared/Logo"



export default function WelcomeTest() {
    return (
        <div className="container">
            <div className="row">
                <Logo />
            </div>
            <div className="row">
                <div className="col s10 offset-s2 button-container"> 
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
