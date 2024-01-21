import { useDispatch, useSelector } from "react-redux";
import {
  addLocation,
  addPlaceName,
  addLat,
  addLng,
} from "../Utils/Redux/locationes";
import { useEffect, useState } from "react";
import useSetLat_Lng from "../Utils/Custom_Hooks/Location/useSetLat_Lng";
import { addNewDataLoader } from "../Utils/Redux/headerSlice";
const SearchLocationes = (props) => {
  const { data, lruOpen } = props;
  const [custom_hook_lat_lng_data, setCustomHook_Lat_Lng_Fun] = useSetLat_Lng();
  const dispatch = useDispatch();
  return (
    <>
      {lruOpen === true ? (
        <>
          <div className="flex flex-col  gap-2">
            <p className="text-gray-600 ml-8 mt-2">RECENT SEARCHES</p>
            {data.map((data) => {
              return (
                <>
                  <p
                    className="cursor-pointer "
                    onClick={() => {
                      setCustomHook_Lat_Lng_Fun(data.data[0].place_id);
                      dispatch(addPlaceName(data.data[0].formatted_address));
                      setTimeout(() => {
                        dispatch(addLocation(false));
                      }, 50);
                      dispatch(addNewDataLoader(true));
                    }}
                  >
                    <div className="flex justify-start gap-2 mb-3">
                      <span class="material-symbols-outlined">location_on</span>
                      <p
                        className=""
                        onClick={() => {
                          setCustomHook_Lat_Lng_Fun(data.data[0].place_id);
                          dispatch(addNewDataLoader(true));
                        }}
                      >
                        {data.data[0].formatted_address}
                      </p>
                    </div>
                    <div className="h-0.5 border border-orange-400 w-full mb-5"></div>
                  </p>
                </>
              );
            })}
          </div>
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
                  setTimeout(() => {
                    dispatch(addLocation(false));
                    dispatch(addNewDataLoader(true));
                  }, [200]);
                }}
                className="w-full h-full gap-3  cursor-pointer flex items-center justify-start mb-4 mt-2"
              >
                <div
                  onClick={() => {
                    setCustomHook_Lat_Lng_Fun(data.place_id);
                    setTimeout(() => {
                      dispatch(addNewDataLoader(true));
                    }, [100]);
                  }}
                  className=""
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
              <div className="border border-orange-400 w-full"></div>
            </div>
          );
        })
      )}
    </>
  );
};
export default SearchLocationes;
