import React, { useRef } from 'react';
import Logo from "../shared/Logo"
import Login from "../shared/Login"
import Button from "../shared/Button"
import { useNavigate } from "react-router-dom";
import axios from "axios";



export default function Loginpage() {
    const navigate = useNavigate();
    let usernameRef = useRef();
    let passwordRef = useRef();

    function callLogin(){
        var data = JSON.stringify
        (
            {
            "user-name": usernameRef.current.value,
            "password": passwordRef.current.value,
            "expiery": "WEEK"
            }
        );

        var config = {
        method: 'post',
        url: '/authenticator/login',
        headers: { 
            'Content-Type': 'application/json', 
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
            if(response.data.path === "/admin/overview"){
                navigate('/admin/overview', { replace: true });
            }
        })
        .catch(function (error) {
        console.log(error.response.data);
        });
    }

    return (<>
    <div className="row">
        <div className="container white container-css">
            <div className="row center-align">
                <h5>Logga in</h5>
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">account_box</i>
                            <textarea id="icon_prefix2" className="materialize-textarea" ref={usernameRef}></textarea>
                            <label htmlFor="icon_prefix2">Användarnamn</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">lock</i>
                            <input id="password" type="password" className="validate" ref={passwordRef}/>
                            <label htmlFor="password">Lösenord</label>
                        </div>
                    </div>
                </form>
            </div>          
        </div>
    </div>
        <div className="row">
            <div className="col s12 offset-s1"> 
            <Button text="Logga in" css="col s10" icon={<i className="small material-icons right">arrow_forward</i>} click={callLogin}/>
            </div>
        </div>
        </>
    )
}
