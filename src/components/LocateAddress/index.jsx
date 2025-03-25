import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = { lat: 37.7749, lng: -122.4194 }; // Default center (San Francisco)

const API_KEY = "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNG"; // Replace with your actual API key

const LocateAddress = ({ address }) => {
  const [coordinates, setCoordinates] = useState(center);

  useEffect(() => {
    if (!address) return;

    const geocodeAddress = async () => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          setCoordinates({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        } else {
          console.error("Geocode failed: " + status);
        }
      });
    };

    geocodeAddress();
  }, [address]);

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={coordinates} zoom={14}>
        <Marker position={coordinates} />
      </GoogleMap>
    </LoadScript>
  );
}


export default LocateAddress;