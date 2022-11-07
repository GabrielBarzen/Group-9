import Button from "./Button";

export default function Codebox() {
    return (
    <div className="white z-depth-2 container-css col s10">
        <div className="row">
                <div className="col s2 codebox offset-s1"><p>4</p></div>
                <div className="col s2 codebox"><p>5</p></div>
                <div className="col s2 codebox"><p>3</p></div>
                <div className="col s2 codebox"><p>1</p></div>
        </div>
        <div className="row center-align">
            <div>
            <text>SKICKA</text> <i className="small material-icons">play_arrow</i>
            </div>
            
        </div>
    </div>
    )
  } 