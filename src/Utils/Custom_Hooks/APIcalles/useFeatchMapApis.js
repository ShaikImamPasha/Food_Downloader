import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dotenv from "dotenv";
dotenv.config();
const useFeatchMapApis = async () => {
  const lat = useSelector((state) => state.loc.lat);
  const lng = useSelector((state) => state.loc.lng);
  const [data, setData] = useState([]);
  useEffect(() => {
    featch();
  }, [lat, lng]);
  async function featch() {
    var json_data = await fetch(
      process.env.CORSSDAPI +
        `api/proxy/swiggy/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}`
    );
    json_data = await json_data.json();
    json_data =
      json_data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants ||
      json_data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    const allplacesurls = json_data?.map((data) => {
      return fetch(
        process.env.CORSSDAPI +
          `api/proxy/swiggy/dapi/misc/place-autocomplete?input=${data.info.areaName}`
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
            process.env.CORSSDAPI +
              `api/proxy/swiggy/dapi/misc/address-recommend?place_id=${data.data[0].place_id}`
          );
        });

        Promise.all(allplacePlaceIdsurls)
          .then((responses) => {
            const jsonPromises = responses.map((response) => response.json());
            return Promise.all(jsonPromises);
          })
          .then((dataArray) => {
            var teamp = json_data.map((data, index) => {
              dataArray[index].data[0].id = data.info.id;
              dataArray[index].data[0].resturentName = data.info.name;
              return dataArray[index];
            });
            setData(teamp);
          })
          .catch((error) => {
            console.error("Fetch operation error:", error);
          });
      })
      .catch((error) => {
        console.error("Fetch operation error:", error);
      });
  }
  return data;
};
export { useFeatchMapApis };
