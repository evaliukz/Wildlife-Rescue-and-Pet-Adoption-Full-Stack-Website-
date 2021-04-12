import { React, useState } from "react";
import { Button } from "react-bootstrap";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapContainer = () => {
  const [animalInfo, setanimalInfo] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const getAnimalInfo = () => {
    console.log("send zipcode");
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
        console.log(data);
      });
  };

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="zipCode"
          onChange={(e) => setZipCode(e.target.value)}
          value={zipCode}
        />
        <Button variant="primary" type="submit" onClick={() => getAnimalInfo()}>
          Submit
        </Button>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyA5a1n9Jdkn1g9XNOy-nP1fjZDUSNiFmZY">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        />
      </LoadScript>
    </div>
  );
};
export default MapContainer;
