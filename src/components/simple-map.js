import React, { useEffect, useState } from "react"
import Leaflet from "leaflet"
import { Map, TileLayer, Circle, FeatureGroup, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import PropTypes from "prop-types"
import Apaexlinecolumn from "./apex"

Leaflet.Icon.Default.imagePath = "../node_modules/leaflet"

delete Leaflet.Icon.Default.prototype._getIconUrl

Leaflet.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
})

const SimpleMap = (props) => {
  const [modal, setModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState({});
  const [points, setPoints] = useState([])

  useEffect(() => {
    let p = []
    props.data.forEach(el => {
     // p.push(el.vehicleStats.mean_gpspos_latitude)
      p.push({
        type: "Feature",
        properties: {
          name: "18th & California Light Rail Stop",
          otherProp: "Other Property 1"
        },
        geometry: {
          type: "Point",
          coordinates: [el.vehicleStats.mean_gpspos_latitude, el.vehicleStats.pos_longitude]
        }
      })
    })
    setPoints(p)

  }, [])

  const toggle = () => setModal(!modal);

  const position = [39.74739, -105];

  const lightRailStop = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "18th & California Light Rail Stop",
          otherProp: "Other Property 1"
        },
        geometry: {
          type: "Point",
          coordinates: [-104.98999178409576, 39.74683938093904]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "20th & Welton Light Rail Stop",
          otherProp: "Other Property 2"
        },
        geometry: {
          type: "Point",
          coordinates: [-104.98689115047453, 39.747924136466565]
        }
      }
    ]
  };

  return (
    <>
      <Map center={position} zoom={13} style={{ height: "300px" }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {lightRailStop.features.map((feature, index) => {
          return (
            <FeatureGroup color="purple" key={index}>
              <Popup>
                <p>{feature.properties.name}</p>
                <button
                  id="button"
                  className="btn btn-primary"
                  onClick={() => {
                    toggle(true);
                    setSelectedFeature(feature);
                  }}
                >
                  More Info
                </button>
              </Popup>
              <Circle
                center={[
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ]}
                fillColor="#ff7800"
                radius={200}
                color={"#000"}
                weight={1}
                opacity={1}
                fillOpacity={0.8}
              />
              {/*<ModalExample*/}
              {/*  modal={modal}*/}
              {/*  toggle={toggle}*/}
              {/*  selectedFeature={selectedFeature}*/}
              {/*/>*/}
            </FeatureGroup>
          );
        })}
      </Map>
    </>
  );
}
SimpleMap.propTypes = {
  data: PropTypes.array
}
export default SimpleMap
