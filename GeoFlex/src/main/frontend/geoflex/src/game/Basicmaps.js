import React,{Component} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

class Basicmaps extends Component {
    constructor(props) {
        super(props);
        
    // TODO Ta in kordinater från databasen och sätt dem som state för att kunna använda dem i render funktionen //
        
        this.state ={
            lat : 55.581858,
            lng : 12.999813,
            zoom : 16
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