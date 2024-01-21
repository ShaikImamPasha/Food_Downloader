import { useEffect } from "react";
import { addResturentData } from "../../Redux/cardSlice";
import {
  addWhatOnYourMind,
  TopOfferesForYou,
  addOffersOn,
} from "../../Redux/locationes";
import { useDispatch, useSelector } from "react-redux";
import dotenv from "dotenv";
dotenv.config();
const useHomeApiCalles = () => {
  const dispatch = useDispatch();
  const lat = useSelector((states) => states.loc.lat);
  const lng = useSelector((states) => states.loc.lng);
  useEffect(() => {
    fetchdata();
  }, [lat, lng]);
  const fetchdata = async () => {
    var data1 = await fetch(
      process.env.CORSSMAPI +
        `api/proxy/swiggy/mapi/homepage/getCards?lat=${lat}&lng=${lng}`
    );

    if (data1.ok === false && data1.status === 404) {
      data1 = await fetch(
        process.env.CORSSDAPI +
          `api/proxy/swiggy/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}`
      );

      var json_data = await data1.json();
      dispatch(
        TopOfferesForYou(
          json_data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants ||
            json_data?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants
        )
      );
      //      dispatch(addOffersOn(json_data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info))
      dispatch(
        addWhatOnYourMind(
          json_data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
            ?.info ||
            json_data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
              ?.info
        )
      );

      json_data =
        json_data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        json_data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      dispatch(addResturentData(json_data));
    } else {
      var json_data = await data1.json();
      dispatch(
        TopOfferesForYou(
          json_data?.data?.success?.cards[1]?.gridWidget?.gridElements
            ?.infoWithStyle?.restaurants
        )
      );
      dispatch(
        addOffersOn(
          json_data?.data?.success?.cards[2]?.gridWidget?.gridElements
            ?.infoWithStyle?.info
        )
      );
      dispatch(
        addWhatOnYourMind(
          json_data?.data?.success?.cards[3]?.gridWidget?.gridElements
            ?.infoWithStyle?.info
        )
      );
      //    dispatch(Ti([json_data?.data?.cards[0]?.card?.card?.imageGridCards?.info[0],json_data?.data?.cards[0]?.card?.card?.imageGridCards?.info[1]]))
      json_data =
        json_data?.data?.success?.cards[4]?.gridWidget?.gridElements
          ?.infoWithStyle?.restaurants ||
        json_data?.data?.success?.cards[3]?.gridWidget?.gridElements
          ?.infoWithStyle?.restaurants;

      dispatch(addResturentData(json_data));
    }
  };
};
export { useHomeApiCalles };
