export default function EmailForm(props) {
    return (
        <div className="Form">
            <div className="row">
                <form className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                    <input id="email" type="email" className="validate"></input>
                    <label htmlFor="email">{props.text}</label>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}

