export default function Button(props) {
    return (
        <div className="button">
            <button className="waves-effect waves-light btn col s10 btn-large btn-css icon-css">{props.icon}{props.text}</button>
        </div>
    )
  } 
