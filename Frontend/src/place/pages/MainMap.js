import React, { useState, useEffect } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

import { useHttpClient } from "../../shared/hooks/http-hook";
import Map from "../../shared/components/UIElements/Map";

const MainMap = () => {
  const USA = { lat: 39.091919, lng: -94.5757195 };
  const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  const [loadedLocation, setLoadedLocation] = useState();
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    let locations;

    const fetchLocations = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/places"
        );
        locations = responseData.places.map((Data) => Data.location);
        setLoadedLocation(locations);
      } catch (err) {}
    };
    fetchLocations();
  }, [sendRequest]);

  return (
    <div style={{ marginTop: "-1rem", height: "40rem", width: "100%" }}>
      <Wrapper apiKey={API_KEY}>
        <Map center={USA} zoom={4.5} marker={[loadedLocation][0]} main="Y" />
      </Wrapper>
    </div>
  );
};

export default MainMap;
