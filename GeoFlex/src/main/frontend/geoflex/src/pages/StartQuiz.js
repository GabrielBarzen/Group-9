import { useNavigate } from "react-router"
import Codebox from "../shared/Codebox"
import Logo from "../shared/Logo"





export default function StartQuiz() {
    const navigate = useNavigate();

    function handleNavigate(url, code, id){
        navigate(url, {
            replace: true,
            state: { id: id,
                    routeCode : code
            }
        });
    }

    return (
        <div className="container">
            <div className="row">
                <Logo />
            </div>
            <div className="row">

                <div className="container white container-css">
                
                        <Codebox handleNavigate={handleNavigate}/>
                 
                    

                </div>
            </div>
        </div>
    )
}
