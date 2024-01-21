import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dotenv from "dotenv";
dotenv.config();
const useResturent = (resid) => {
  const [resInfo, setResInfo] = useState(null);
  const lat = useSelector((states) => states.loc.lat);
  const lng = useSelector((states) => states.loc.lng);
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    var data1 = await fetch(
      process.env.CORSSMAPI +
        `api/proxy/swiggy/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lng}&lng=${lng}&restaurantId=${resid}`
    );

    if (data1.ok === false && data1.status === 404) {
      data1 = await fetch(
        process.env.CORSSDAPI +
          `api/proxy/swiggy/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resid}`
      );
      data1 = await data1.json();
      setResInfo(data1);
    } else {
      data1 = await data1.json();
      setResInfo(data1);
    }

    //  console.log(json_data);
  };
  return resInfo;
};
export { useResturent };
