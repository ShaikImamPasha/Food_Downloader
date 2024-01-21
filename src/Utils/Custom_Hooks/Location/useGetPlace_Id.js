import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSearchLocatines } from "../../Redux/locationes";
import { addCatchData } from "../../Redux/headerSlice";
const useGetPlace_Id = () => {
  const dispatch = useDispatch();
  const [placeSearch, setPlaceSearch] = useState("");
  const catchData = useSelector((state) => state.header.catchData);

  useEffect(() => {
    var timer = setTimeout(() => {
      if (catchData.has(placeSearch)) {
        dispatch(addSearchLocatines(catchData.get(placeSearch)));
      } else {
        fetchdata();
      }
    }, [200]);
    return () => {
      clearTimeout(timer);
    };
  }, [placeSearch]);
  async function fetchdata() {
    var data = await fetch(
      `https://stormy-hem-mite.cyclic.app/api/proxy/swiggy/dapi/misc/place-autocomplete?input=${placeSearch}`
    );
    data = await data.json();
    dispatch(addSearchLocatines(data.data));
    dispatch(addCatchData({ placeSearch: placeSearch, data: data.data }));
  }
  return [placeSearch, setPlaceSearch];
};
export default useGetPlace_Id;
