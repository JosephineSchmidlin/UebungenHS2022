import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


function App() {
  const [startlat, setStartlat] = useState(47.5349);
  const [startlng, setStartlng] = useState(7.6415);
  const [endlat, setEndlat] = useState(8.9738);
  const [endlng, setEndlng] = useState(-79.5068);
  const [pts, setPoint] = useState(30);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
    }, []);

  function do_download() {
    // TODO: Parametrisieren
    var url = `https://vm1.sourcelab.ch/geodetic/line?startlat=${startlat}&startlng=${startlng}&endlat=${endlat}&endlng=${endlng}&pts=${pts}`;

    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <h1>Geodetic Line</h1>

      <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Breite Startpunkt" variant="outlined" defaultValue={startlat} 
                       onChange={ (event) => {setStartlat(event.target.value)} }/>
            <TextField label="Länge Startpunkt" variant="outlined" defaultValue={startlng}
                       onChange={ (event) => {setStartlng(event.target.value)} }/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Breite Endtpunkt" variant="outlined" defaultValue={endlat} 
                       onChange={ (event) => {setEndlat(event.target.value)} }/>
            <TextField label="Länge Endpunkt" variant="outlined" defaultValue={endlng}
                       onChange={ (event) => {setEndlng(event.target.value)} }/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Anzahl Punkte" variant="outlined" defaultValue={pts} 
                       onChange={ (event) => {setPoint(event.target.value)} }/>
          </Grid>
          <Grid item xs={12}>
             <Button variant="contained" onClick={ () => { do_download() } }>Calc...</Button>
             <Button variant="contained" onClick={ () => { setData(null) } }>New Path</Button>
          </Grid>
          <Grid item xs={12}>
            {loading && <>
                          <div>API Aufruf, bitte warten!</div><br/>
                        </>
            }

            {error &&   <>
                          <div>ERROR API Aufruf fehlgeschlagen</div>{console.log(error)}<br/>
                        </>
            }
          </Grid>
        </Grid>


      

      {data &&  <>
                  <MapContainer center={[47.5349, 7.6416]} zoom={2} scrollWheelZoom={true}
                    style={{ height: "600px", width: "100%" }} >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                  
                  <GeoJSON data={data} style={{ weight: 8, opacity: '30%', color: 'green'}}/>

                  </MapContainer>
                </>}
  
      </>
  );
}

export default App;
