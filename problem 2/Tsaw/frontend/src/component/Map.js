import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  useMap,
  GeoJSON,
} from "react-leaflet";
import axios from "axios"
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import locationImage from "../location.png";



function App() {
  const [boundary , setboundary] = useState({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "State 1",
          data: "Population: 5 million\nCapital: City 1",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [[85.3096, 23.3441],
          [77.1025, 28.7041]]
          ],
        },
      },
    ]
  })
  const [selectedState, setSelectedState] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const customIcon = new Icon({
    iconUrl: locationImage,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const center = [22.3511148, 78.6677428];

const stateBoundaries = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "State 1",
        data: "Population: 5 million\nCapital: City 1",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [[85.3096, 23.3441],
          [77.1025, 28.7041]]
        ],
      },
    },
  ]
}
  

  const geoJSONStyle = {
    color: "black",
    weight: 2,
    fillOpacity: 0,
  };

  const handleStateClick = (e) => {
    const state = e.sourceTarget.feature.properties;
    setSelectedState(state);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the 'from' and 'to' values to the backend using axios
    try {
      const response = await axios.post("http://localhost:8000/search/", 
        { from, to });
        // setboundary((prevBoundary) => ({
        //   ...prevBoundary,
        //   features: [
        //     {
        //       ...prevBoundary.features[0],
        //       geometry: {
        //         type: "Polygon",
        //         coordinates: [[response.data.fromArray, response.data.toArray]],
        //       },
        //     },
        //   ],
        // }));

        setboundary({...stateBoundaries})
      console.log(response.data);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };
useEffect(()=>{
 console.log(boundary)
 console.log(stateBoundaries , "liuytrfdsxcvbjkoiuytrfd")
})
  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label>Enter first city name</label>
          <input
            type="text"
            placeholder="First city name"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <label>Enter Second city name</label>
          <input
            type="text"
            placeholder="Second city name"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <button>Search</button>
        </form>
      </div>
      <MapContainer
        center={center}
        zoom={5}
        style={{ width: "100vw", height: "100vh" }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=qYXBEfnoy4nw81LPAzuv"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Stamen Watercolor">
            <TileLayer
              attribution='&copy; <a href="http://maps.stamen.com/copyright">Stamen Design</a> contributors'
              url="https://api.maptiler.com/maps/cadastre-satellite/256/{z}/{x}/{y}.png?key=qYXBEfnoy4nw81LPAzuv"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <GeoJSON
          data= {boundary}
          style={geoJSONStyle}
          eventHandlers={{ click: handleStateClick }}
        />
        {selectedState && (
          <Marker position={center} icon={customIcon}>
            <Popup>
              {selectedState.name}
              <br />
              {selectedState.data}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
}

export default App;
