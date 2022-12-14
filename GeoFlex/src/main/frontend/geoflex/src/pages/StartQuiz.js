import Codebox from "../shared/Codebox"
import Logo from "../shared/Logo"
import QRscanner from "../shared/QR"



export default function StartQuiz() {
    return (
        <div className="container">
            <div className="row">
                <Logo />
            </div>
            <div className="row">
                <div className="col s12">
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
