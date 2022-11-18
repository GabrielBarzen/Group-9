import Button from "../shared/Button"



export default function Register() {
    // Här hamnar logiken
    return (<>
    <div className="row">
        <div className="container white container-css">
            <div class="row center-align">
                <h5>Registrera</h5>
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">account_box</i>
                            <textarea id="icon_prefix2" class="materialize-textarea"></textarea>
                            <label for="icon_prefix2">Användarnamn</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">lock</i>
                            <input id="password" type="password" class="validate"/>
                            <label for="password">Lösenord</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">lock</i>
                            <input id="passwordrepeat" type="password" class="validate"/>
                            <label for="passwordrepeat">Upprepa lösenord</label>
                        </div>
                    </div>
                </form>
            </div>          
        </div>
    </div>
        <div className="row">
            <div className="col s12 offset-s1"> 
            <Button text="Registrera" css="col s10" icon={<i className="small material-icons right">arrow_forward</i>}/>
            </div>
        </div>
        </>
    )
}
