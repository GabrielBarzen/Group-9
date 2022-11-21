import React from 'react';
import Button from '../../shared/Button';

export default function AdminModeratorRegister() {

    function handleClick(){
        //handles click
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
                                <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
                                <label htmlFor="icon_prefix2">Användarnamn</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">lock</i>
                                <input id="password" type="password" className="validate" />
                                <label htmlFor="password">Lösenord</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">lock</i>
                                <input id="passwordrepeat" type="password" className="validate" />
                                <label htmlFor="passwordrepeat">Upprepa lösenord</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col s12 offset-s1">
                <Button text="Registrera" css="col s10" click={handleClick} icon={<i className="small material-icons right">arrow_forward</i>} />
            </div>
        </div>
    </>
    )
}
