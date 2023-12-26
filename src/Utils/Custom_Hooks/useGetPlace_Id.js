import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSearchLocatines } from "../Redux/locationes";
const useGetPlace_Id=()=>{
    const dispatch=useDispatch();
    const [placeSearch,setPlaceSearch]=useState("");
    useEffect(()=>{
        fetchdata();
     },[placeSearch])
     async function fetchdata(){
         var data = await fetch(`https://busy-plum-bull-veil.cyclic.app/api/proxy/swiggy/dapi/misc/place-autocomplete?input=${placeSearch}`)
         data=await data.json();
         dispatch(addSearchLocatines(data.data))
     }
   return [placeSearch,setPlaceSearch];
} 
export default useGetPlace_Id;