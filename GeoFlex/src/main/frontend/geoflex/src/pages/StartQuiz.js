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
                <div className="col s12">
                <form className="row valign-wrapper"> 
                        <Codebox />
                    </form>
                    <div className="row">
                        <QRscanner />
                    </div>
                </div>
            </div>
        </div>
    )
}
