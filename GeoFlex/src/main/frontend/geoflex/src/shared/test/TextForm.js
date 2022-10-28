export default function TextForm(props) {
    return (
        <div className="Form">
            <div class="row">
                <form class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                    <input id="text" type="text" class="validate"></input>
                    <label for="text">{props.text}</label>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}