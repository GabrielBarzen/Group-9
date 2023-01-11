import Button from "../shared/Button"



export default function Register() {
    // Här hamnar logiken
    return (<>
    <div className="row">
        <div className="container white container-css">
            <div class="row center-align">
                <h5>Vad vill du kalla dig?</h5>
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">pan_tool</i>
                            <textarea id="icon_prefix2" class="materialize-textarea"></textarea>
                            <label for="icon_prefix2">Välj ett smeknamn</label>
                        </div>
                    </div>
                </form>
            </div>          
        </div>
    </div>
        <div className="row">
            <div className="col s12 offset-s1"> 
            <Button text="Kör igång!" css="col s10" icon={<i className="small material-icons right">arrow_forward</i>}/>
            </div>
        </div>
        </>
    )
}
