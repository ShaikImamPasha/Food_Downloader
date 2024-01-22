import { useDispatch } from "react-redux";
import { addLat, addLng } from "../../Redux/locationes";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addLruCatch } from "../../Redux/headerSlice";
export default function useSetLat_Lng() {
  const dispatch = useDispatch();
  const [placeSearch, setData] = useState(" ");
  useEffect(() => {
    fun();
  }, [placeSearch]);
  async function fun() {
    var count = 0;
    var teamp = JSON.parse(localStorage.getItem("lruCatch"));
    teamp !== null &&
      teamp.map((data) => {
        if (data.data[0].place_id === placeSearch) {
          dispatch(addLat(data.data[0]?.geometry?.location?.lat));
          dispatch(addLng(data.data[0]?.geometry?.location?.lng));
          count = 1;
        }
      });

    if (count === 0) {
      if (placeSearch !== " ") {
        const url = `https://stormy-hem-mite.cyclic.app/api/proxy/swiggy/dapi/misc/address-recommend?place_id=${placeSearch}`;
        var data1 = await fetch(url);

        data1 = await data1.json();
        var teampLRU = JSON.parse(localStorage.getItem("lruCatch"));
        if (teampLRU === null) {
          localStorage.setItem("lruCatch", JSON.stringify([data1]));
        } else {
          if (teampLRU.length >= 2) {
            var t = teampLRU.slice(0, 2);
            localStorage.setItem("lruCatch", JSON.stringify([...t, data1]));
          } else {
            localStorage.setItem(
              "lruCatch",
              JSON.stringify([...teampLRU, data1])
            );
          }
        }

        // localStorage.setItem("lruCatch", JSON.stringify(teamp.push(data1)));
        dispatch(addLat(data1?.data[0]?.geometry?.location?.lat));
        dispatch(addLng(data1?.data[0]?.geometry?.location?.lng));
      }
    }
  }
  return [placeSearch, setData];
}
