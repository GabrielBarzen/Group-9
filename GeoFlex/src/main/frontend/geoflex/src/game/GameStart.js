import React from "react";
import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";

/*
placeholder while developing - clean this
[{"title":"Test Quiz","description":"This quiz is for testing purposes.","type":"QUIZ","id":"1","code":"572748","locations":3},{"title":"Test Info","description":"This info for testing purposes.","type":"INFO","id":"2","code":"184471","locations":3},{"title":"Test 2","description":"More testing tests ","type":"INFO","id":"4","code":"295052","locations":0},{"title":"Num Location Test1","description":"test, remove","type":"INFO","id":"5","code":"447827","locations":0},{"title":"Num Location Test2","description":"test, remove","type":"INFO","id":"6","code":"625158","locations":3},{"title":"Num Location Test3","description":"test, remove","type":"INFO","id":"7","code":"782310","locations":4},{"title":"Test Quiz2E","description":"This quiz is for testing purposes.","type":"QUIZ","id":"8","code":"538027","locations":6},{"title":"Test Quizz","description":"This quiz is for testing purposes.","type":"QUIZ","id":"10","code":"983850","locations":6}]
*/
export default function GameStart() {
    const navigate = useNavigate();

    function navigateToStart() {
        navigate('/game/start', { replace: false });
    }
    /*
    Dummydata
    */
    const tours = 0



    if (tours.length !== 0) {
        /*
        if: tours is populated we render the jsx HTML passing each tour into Tour.js along with all its data and the DELETE function.
        else: a loading circle will render while waiting for tours to be populated
        */
        return (
            <>
                <div className="row">
                    <div className="container white container-css">
                        <div className="row">
                            <div className="col s12">
                                <h5 className="center-align">Översikt användare</h5>
                                <ul className="collection">

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <Button text="Starta spel" css="col s12" icon={<i className="small material-icons right">arrow_forward</i>} click={navigateToStart} />
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <section className="container center-align">
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-red-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}