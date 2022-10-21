import Button from "../shared/test/Button"
import Header from "../shared/test/Header"
import Title from "../shared/test/Title"


export default function WelcomeTest() {
    return (
        <div class="container-wrapper">
            <Header />
            <div class="col s12" id="container">
                <div class="row">
                    <Title text="Välkommen till Geoflex"/>
                </div>
                <div class="center-align">
                    <Button text="Registrera"/>
                </div>
                <div class="center-align">
                    <Button text="Logga in"/>
                </div>
                <div class="center-align">
                    <Button text="Starta utan att logga in"/>
                </div>
                
                
            </div>
        </div>

        



    )
}