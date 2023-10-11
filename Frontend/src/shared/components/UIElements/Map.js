import React, { useRef, useEffect } from "react";
import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();
  const { center, zoom, marker } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    if (marker && marker.length > 1) {
      marker.map(
        (m) =>
          new window.google.maps.Marker({
            position: m,
            map: map,
          })
      );
    } else if (marker) {
      new window.google.maps.Marker({ position: marker[0], map: map });
    }
  }, [center, zoom, marker]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
