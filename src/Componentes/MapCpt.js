import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448609.png",
  iconSize: [40, 40],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
const MapCpt = () => {
  const [mapdata, setMapData] = useState([]);
  const resturentData = useSelector((state) => state.cart.resturentData);
  const lat = useSelector((state) => state.loc.lat);
  const lng = useSelector((state) => state.loc.lng);
  useEffect(() => {
    fetchMapData();
    console.log("lat", lat, lng);
  }, [lat, lng, resturentData]);
  async function fetchMapData() {
    var json_data = await fetch(
      `https://busy-plum-bull-veil.cyclic.app/api/proxy/swiggy/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}`
    );
    json_data = await json_data.json();
    json_data =
      json_data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants ||
      json_data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    const allplacesurls = json_data?.map((data) => {
      return fetch(
        `https://busy-plum-bull-veil.cyclic.app/api/proxy/swiggy/dapi/misc/place-autocomplete?input=${data.info.areaName}`
      );
    });

    Promise.all(allplacesurls)
      .then((responses) => {
        const jsonPromises = responses.map((response) => response.json());
        return Promise.all(jsonPromises);
      })
      .then((dataArray) => {
        // console.log(dataArray)
        const allplacePlaceIdsurls = dataArray?.map((data) => {
          return fetch(
            `https://busy-plum-bull-veil.cyclic.app/api/proxy/swiggy/dapi/misc/address-recommend?place_id=${data.data[0].place_id}`
          );
        });

        Promise.all(allplacePlaceIdsurls)
          .then((responses) => {
            const jsonPromises = responses.map((response) => response.json());
            return Promise.all(jsonPromises);
          })
          .then((dataArray) => {
            json_data.map((data, index) => {
              dataArray[index].data[0].id = data.info.id;
              dataArray[index].data[0].resturentName = data.info.name;
              setMapData(dataArray);
            });
          })
          .catch((error) => {
            console.error("Fetch operation error:", error);
          });
      })
      .catch((error) => {
        console.error("Fetch operation error:", error);
      });
  }
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
          <>
            <div className="w-full h-[600px] flex justify-center items-center bg-orange-300">
              <div
                aria-label="Orange and tan hamster running in a metal wheel"
                role="img"
                class="wheel-and-hamster flex justify-center bg-slate-800 rounded-full items-center"
              >
                <div class="wheel"></div>
                <div class="hamster">
                  <div class="hamster__body">
                    <div class="hamster__head">
                      <div class="hamster__ear"></div>
                      <div class="hamster__eye"></div>
                      <div class="hamster__nose"></div>
                    </div>
                    <div class="hamster__limb hamster__limb--fr"></div>
                    <div class="hamster__limb hamster__limb--fl"></div>
                    <div class="hamster__limb hamster__limb--br"></div>
                    <div class="hamster__limb hamster__limb--bl"></div>
                    <div class="hamster__tail"></div>
                  </div>
                </div>
                <div class="spoke"></div>
              </div>
            </div>
            <div>
              <p>please wait loading...</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default MapCpt;
