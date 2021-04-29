import { React, useState, useEffect } from "react";
import { Button, Modal, Card } from "react-bootstrap";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import MyModal from "./MyModal";
import "./EbayCard.css";

const MapContainer = () => {
  const [animalInfo, setanimalInfo] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [curLocation, setCurLocation] = useState({ lat: 0, lng: 0 });
  const [infoWindow, setInfoWindow] = useState(null);
  const [mapItem, setMap] = useState();
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   setCurLocation(props);
  // }, [props]);

  const getAnimalInfo = () => {
    fetch("/maps", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        zipCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        var mapdata = new Map();
        data.map((item, i) => {
          if (mapdata[[item.latitude, item.longitude]] == null) {
            mapdata[[item.latitude, item.longitude]] = [item];
          } else {
            mapdata[[item.latitude, item.longitude]].push(item);
          }
        });
        setMap(mapdata);
        setanimalInfo(data);
      });
  };

  const mapStyles = {
    height: "90vh",
    width: "100%",
  };
  const getLocation = (latt, lngg) => {
    const location = {
      lat: latt,
      lng: lngg,
    };
    return location;
  };

  const zipToGeo = () => {
    // console.log("send zipcode");
    fetch("/maps/zip", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        zipCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data[0]);
        setCurLocation(data[0]);
      });
  };

  const getPicURL = (txt) => {
    if (txt === null) {
      return "noPic.png";
    }
    var t = txt.split(", {")[0].substring(112, 198);
    // var obj = JSON.parse(t);
    console.log(t);
    return t;
  };

  return (
    <div>
      <div style={{ "text-align": "center" }}>
        <input
          type="text"
          placeholder="zipCode"
          onChange={(e) => setZipCode(e.target.value)}
          value={zipCode}
        />
        <Button
          variant="primary"
          type="submit"
          id="mapPage"
          class="find"
          onClick={() => {
            getAnimalInfo();
            zipToGeo();
          }}
        >
          Submit
        </Button>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyA5a1n9Jdkn1g9XNOy-nP1fjZDUSNiFmZY">
        {/* {console.log(curLocation.latitude)} */}
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={
            zipCode
              ? getLocation(curLocation.latitude, curLocation.longitude)
              : getLocation(40.75, -74)
          }
        >
          {animalInfo.map((item) => {
            // console.log(item);
            const loca = getLocation(item.latitude, item.longitude);
            return (
              <div>
                <Marker
                  icon="adopt.png"
                  key={item.pet_id}
                  animation={1}
                  position={loca}
                  // onMouseOver={() => {
                  //   setInfoWindow(item);
                  // }}
                  onClick={() => {
                    Object.keys(mapItem).forEach(function (key) {
                      var value = mapItem[key];
                      // console.log(value);
                      let lat = parseFloat(key.split(",")[0]);
                      let lng = parseFloat(key.split(",")[1]);
                      const loca2 = getLocation(lat, lng);
                      // console.log(loca2);
                      if (loca.lat === loca2.lat && loca.lng === loca2.lng) {
                        // console.log(loca);
                        setShow(true);

                        setInfoWindow(value);
                      }
                    });
                  }}
                />
              </div>
            );
          })}

          {infoWindow ? (
            <MyModal
              show={show}
              data={infoWindow}
              onHide={() => setShow(false)}
            />
          ) : null}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
export default MapContainer;
