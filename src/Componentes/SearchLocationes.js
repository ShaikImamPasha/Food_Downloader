import { useDispatch, useSelector } from "react-redux";
import {
  addLocation,
  addPlaceName,
  addLat,
  addLng,
} from "../Utils/Redux/locationes";
import { useEffect, useState } from "react";
import useSetLat_Lng from "../Utils/Custom_Hooks/useSetLat_Lng";
const SearchLocationes = (props) => {
  const { data, lruOpen } = props;
  const [custom_hook_lat_lng_data, setCustomHook_Lat_Lng_Fun] = useSetLat_Lng();
  const dispatch = useDispatch();
  var lruData = JSON.parse(localStorage.getItem("lruCatch"));
  return (
    <>
      {lruOpen === true ? (
        <>
          <p>recanrly</p>
          {data.map((data) => {
            return (
              <p
                className="cursor-pointer"
                onClick={() => {
                  setCustomHook_Lat_Lng_Fun(data.data[0].place_id);
                  dispatch(addPlaceName(data.data[0].formatted_address));
                  setTimeout(() => {
                    dispatch(addLocation(false));
                  }, 50);
                }}
              >
                <p
                  onClick={() => {
                    setCustomHook_Lat_Lng_Fun(data.data[0].place_id);
                  }}
                >
                  {data.data[0].formatted_address}
                </p>
              </p>
            );
          })}
        </>
      ) : data.length === 0 ? (
        <div className="cursor-pointer w-full ">
          <h3>Not Available Location</h3>
        </div>
      ) : (
        data.map((data) => {
          return (
            <div>
              <div
                onClick={() => {
                  setCustomHook_Lat_Lng_Fun(data.place_id);
                  dispatch(addPlaceName(data.description));
                  dispatch(addLocation(false));
                }}
                className="w-full h-[150px]  cursor-pointer flex items-center justify-start "
              >
                <div
                  onClick={() => {
                    setCustomHook_Lat_Lng_Fun(data.place_id);
                  }}
                  className="pr-7"
                >
                  <span class="material-symbols-outlined">location_on</span>
                </div>
                <div className="break-words ">
                  {data.structured_formatting.main_text}
                  <div className="text-slate-400 break-words mt-1">
                    {data.structured_formatting.secondary_text}
                  </div>
                </div>
              </div>
              <div className="ml-11 border border-gray-600 w-full"></div>
            </div>
          );
        })
      )}
    </>
  );
};
export default SearchLocationes;
