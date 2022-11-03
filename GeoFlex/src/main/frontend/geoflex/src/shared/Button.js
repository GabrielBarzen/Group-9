export default function Button(props) {
    const materialize = "button waves-effect waves-teal btn col btn-large btn-css icon-css z-depth-2 " + props.css
    return (
        <>
            <button className={materialize}>{props.icon}{props.text}</button>
        </>
    )
  } 