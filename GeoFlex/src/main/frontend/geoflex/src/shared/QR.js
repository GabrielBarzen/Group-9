import Button from "./Button";

export default function QRscanner() {
    return (
        <div className="col s10 offset-s2 button-container"> 
            <div className="row">
                <Button text="Scanna QR" css="col s10" icon={<i className="small material-icons right">qr_code_scanner</i>}/>
            </div>
            
        </div>
    )
  } 




