export default function PasswordForm(props) {
    return (
        <div className="Form">
            <div class="row">
                <form class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                    <input id="password" type="password" class="validate"></input>
                    <label for="password">{props.text}</label>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}