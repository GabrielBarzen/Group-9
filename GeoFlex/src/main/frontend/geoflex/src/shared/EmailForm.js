export default function EmailForm(props) {
    return (
        <div className="Form">
            <div class="row">
                <form class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                    <input id="email" type="email" class="validate"></input>
                    <label for="email">{props.text}</label>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}

