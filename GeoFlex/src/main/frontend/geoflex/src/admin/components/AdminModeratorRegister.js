import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '../../shared/Button';
import axios from "axios";


export default function AdminModeratorRegister() {
    const navigate = useNavigate();
    let nameRef = useRef();
    let emailRef = useRef();
    let passwordRef = useRef();
    let repeatPasswordRef = useRef();

    /**
     * Skapar en moderator.
     */
    function handleCreateModerator() {
        let message = document.querySelector("#message");
        if (passwordRef.current.value === repeatPasswordRef.current.value) {
            var data = JSON.stringify
                (
                    {"create-moderator":
                    {
                      "name": nameRef.current.value,
                      "email": emailRef.current.value,
                      "password": passwordRef.current.value
                    }
                    }
                );

            var config = {
                method: 'post',
                url: '/admin/create/moderator',
                headers: {
                    'Content-Type': 'text/plain'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    navigate('/admin/moderator-management', { replace: true });
                })
                .catch(function (error) {
                    console.log(error);
                    message.textContent = "Lyckades ej skapa moderator."
                });


            console.log(data);

        }
        else {
            message.textContent = "Angivna lösenorden matchar inte."
        }
    }

    return (<>
        <div className="row">
            <div className="container white container-css">
                <div className="row center-align">
                    <h5>Lägg till moderator</h5>
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">account_box</i>
                                <textarea id="icon_prefix2" className="materialize-textarea" ref={nameRef}></textarea>
                                <label htmlFor="icon_prefix2">Användarnamn</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">account_box</i>
                                <textarea id="icon_prefix2 email" className="materialize-textarea" ref={emailRef}></textarea>
                                <label htmlFor="icon_prefix2">Email</label>
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
                        <div id="message" style={{ color: "RED" }}></div>
                    </form>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col s12 offset-s1">
                <Button text="Registrera" css="col s10" icon={<i className="small material-icons right">arrow_forward</i>} click={handleCreateModerator} />
            </div>
        </div>
    </>
    )
}
