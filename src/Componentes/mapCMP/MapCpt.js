import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MapShimmer } from "../index.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { useFeatchMapApis } from "../../Utils/index.js";
const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448609.png",
  iconSize: [40, 40],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
const MapCpt = () => {
  const [mapdata, setMapData] = useState([]);
  const data = useFeatchMapApis();
  data.then((data) => {
    setMapData(data);
  });
  useEffect(() => {}, []);
  return (
    <>
      <div className="z-10 relative">
        {mapdata.length !== 0 ? (
          <MapContainer
            center={[22, 70]}
            zoom={4}
            style={{ height: "400px", width: "380px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {mapdata.map((location, index) => (
              <Marker
                key={index}
                position={[
                  location.data[0].geometry.location.lat,
                  location.data[0].geometry.location.lng,
                ]}
                icon={customIcon}
              >
                <Popup>
                  <div className="cursor-pointer">
                    <Link to={"/restaurent/" + location.data[0].id}>
                      click here for go to {location.data[0].resturentName}{" "}
                      resturent Menu
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <MapShimmer />
        )}
      </div>
    </>
  );
};
export default MapCpt;
