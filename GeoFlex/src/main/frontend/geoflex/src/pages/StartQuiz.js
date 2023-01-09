import Codebox from "../shared/Codebox"
import Logo from "../shared/Logo"
import QRscanner from "../shared/QRScanner"



export default function StartQuiz() {
    return (
        <div className="container">
            <div className="row">
                <Logo />
            </div>
            <div className="row">
                <div className="container white container-css">
                    <Codebox />
                    <div className="row">

                    </div>
                </div>
            </div>
        </div>
    )
}
