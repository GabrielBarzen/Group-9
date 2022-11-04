import Button from "./Button";

export default function Codebox() {
    return (
    <div className="white z-depth-2 col s10 button-container">
        <div className="row">
                <div className="col s2 codebox offset-s1"><p>4</p></div>
                <div className="col s2 codebox"><p>5</p></div>
                <div className="col s2 codebox"><p>3</p></div>
                <div className="col s2 codebox"><p>1</p></div>
    </div>
        <div className="row center-align">
            Skriv in din kod
        </div>
        <div className="rorow center-align">
            <Button text="Skicka" css="col s5"/>
        </div>
    </div>
    )
  } 