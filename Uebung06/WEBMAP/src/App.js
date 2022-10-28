import React from 'react';
import "./App.css";
import "leaflet/dist/leaflet.css";


import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet'


function App() {

  React.useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
  }, []);

  const akw = [
    {
      pos: [46.97126, 7.26451],
      MWe: "373 MWe",
      name: "Kernkraftwerk Mühleberg"},
    {
      pos: [47.36984, 7.96587],
      MWe: "1010 MWe",
      name: "Kernkraftwerk Gösgen"},
    {
      pos: [47.55139, 8.22646],
      MWe: "--",
      name: "Kernkraftwerk Beznau"},
    {
      pos: [47.60144, 8.18229],
      MWe: "	1190 MWe",
      name: "	Kernkraftwerk Leibstadt"}]



  const circlestyle = {color: "red"}


return (
  <MapContainer center={[46.91569, 8.10516]} zoom={9} scrollWheelZoom={true}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />

  <Marker position={akw[0].pos}>
    <Popup>
    <b>{akw[0].name}</b><br/>Elektrische Nettoleistung: {akw[0].MWe}
    </Popup>
  </Marker>
  <Marker position={akw[1].pos}>
    <Popup>
    <b>{akw[1].name}</b><br/>Elektrische Nettoleistung: {akw[1].MWe}
    </Popup>
  </Marker>
  <Marker position={akw[2].pos}>
    <Popup>
    <b>{akw[2].name}</b><br/>Elektrische Nettoleistung: {akw[2].MWe}
    </Popup>
  </Marker>
  <Marker position={akw[3].pos}>
    <Popup>
    <b>{akw[3].name}</b><br/>Elektrische Nettoleistung: {akw[3].MWe}
    </Popup>
  </Marker>

  <Circle pathOptions={circlestyle} center= {akw[0].pos} radius={50000}/>
  <Circle pathOptions={circlestyle} center= {akw[1].pos} radius={50000}/>
  <Circle pathOptions={circlestyle} center= {akw[2].pos} radius={50000}/>
  <Circle pathOptions={circlestyle} center= {akw[3].pos} radius={50000}/>

</MapContainer>
  );
}

export default App;