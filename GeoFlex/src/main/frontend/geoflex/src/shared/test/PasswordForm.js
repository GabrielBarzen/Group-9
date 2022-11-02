export default function PasswordForm(props) {
    return (
        <div className="Form">
            <div className="row">
                <form className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                    <input id="password" type="password" className="validate"></input>
                    <label hmtlFor="password">{props.text}</label>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}