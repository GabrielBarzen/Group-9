import Button from "../shared/Button"
import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";



export default function Register() {
    const navigate = useNavigate();
    let usernameRef = useRef();
    let emailRef = useRef();
    let passwordRef = useRef();
    let repeatPasswordRef = useRef();

    function handleRegister() {
        if (passwordRef.current.value === repeatPasswordRef.current.value) {
            var data = JSON.stringify
                (
                    {
                        "user-name": usernameRef.current.value,
                        "password": passwordRef.current.value,
                        "user-email": emailRef.current.value
                      }
                );

            var config = {
                method: 'post',
                url: '/authenticator/register',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    navigate('/', { replace: true });
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                    //TODO: Ge ett felmeddelande om att inlogging misslyckades.
                });
                
        }
        else {
            //TODO: Ge ett felmeddelande om att lösenordet inte matchar.
        }
    }

    return (<>
        <div className="row">
            <div className="container white container-css">
                <div className="row center-align">
                    <h5>Registrera</h5>
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
                                <i className="material-icons prefix">account_box</i>
                                <textarea id="icon_prefix3" className="materialize-textarea" ref={emailRef}></textarea>
                                <label htmlFor="icon_prefix3">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">lock</i>
                                <input id="password" type="password" className="validate" ref={passwordRef} />
                                <label htmlFor="password">Lösenord</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">lock</i>
                                <input id="passwordrepeat" type="password" className="validate" ref={repeatPasswordRef} />
                                <label htmlFor="passwordrepeat">Upprepa lösenord</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col s12 offset-s1">
                <Button text="Registrera" css="col s10" icon={<i className="small material-icons right">arrow_forward</i>} click={handleRegister} />
            </div>
        </div>
    </>
    )
}
