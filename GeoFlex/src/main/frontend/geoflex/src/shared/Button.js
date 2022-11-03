export default function Button(props) {
    return (
        <div className="button">
            <button className="waves-effect waves-teal btn col s10 btn-large btn-css icon-css z-depth-2">{props.icon}{props.text}</button>
        </div>
    )
  } 
