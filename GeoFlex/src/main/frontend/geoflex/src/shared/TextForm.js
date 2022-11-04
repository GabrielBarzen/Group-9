export default function TextForm(props) {
    return (
        <div className="Form">
            <div className="row">
                <form className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                    <input id="text" type="text" className="validate"></input>
                    <label htmlFor="text">{props.text}</label>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}