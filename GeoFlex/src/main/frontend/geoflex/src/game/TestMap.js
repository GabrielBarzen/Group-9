import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import visitorIcon from "./Constants";
import CurrentPosIcon from "./Map-Pin.png"




const Maps = () => {
  // visitor geoLocalisation on the Map
  function LocationMarker() {
    const [position, setPosition] = useState(null);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }, []);
    var L = window.L;
    let posIcon = L.icon({
        iconUrl: CurrentPosIcon,
        iconRetinaUrl: CurrentPosIcon,
        iconAnchor: [5, 55],
        popupAnchor: [10, -44],
        iconSize: [35, 40],
      });

    return position === null ? null : (
      <Marker position={position} icon={posIcon} autoClose={false}>
        <Popup>Här är du</Popup>
      </Marker>
    );
  }

  function QuestionMarker() {
    /*
    Här måste vi läsa in koordinater från API till frågan.
    Koordinaterna sätts in i position.
    */
    return (
        <Marker position={[55.681922, 12.999577]} icon={visitorIcon}>
          <Popup>Fråga 1</Popup>
        </Marker>
    )
  }


  return (
    <MapContainer
      center={[55.604981, 13.003822000000014]}
      zoom={13}
      scrollWheelZoom
      style={{ height: "50vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker />
      <QuestionMarker />
    </MapContainer>
    
  );
};

export default Maps;