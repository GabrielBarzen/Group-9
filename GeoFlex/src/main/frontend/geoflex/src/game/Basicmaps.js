import React,{Component, setState} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

class Basicmaps extends Component {
    constructor(props) {
        super(props);
        
    // TODO Ta in kordinater från databasen och sätt dem som state för att kunna använda dem i render funktionen //
        
        this.state ={
            lat : 45.581858,
            lng : 12.999813,
            zoom : 16
        }
    }
    
    componentDidMount() {
        var that = this
        var L = window.L;
        navigator.geolocation.watchPosition(sucess, error);

        function sucess(pos){
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
    
            console.log(lat)
            console.log(lng)

            that.setState({lat: lat, lng: lng})
            

        
        }
        function error(err){
            if(err.code === 1) {
                alert("Tillåt positionsförfrågan")
            } else {
                alert("Hittar inte positionen")
            }
            }
    }

    
    

render() {
        const position = [this.state.lat,this.state.lng];
      return <React.Fragment>
        <MapContainer center={position} zoom={this.state.zoom}>
            <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
              <Marker position={[this.state.lat, this.state.lng]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
      
      </React.Fragment>;
      
    }
}
export default Basicmaps