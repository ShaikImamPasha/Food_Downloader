import { useDispatch } from "react-redux";
import { addLat,addLng } from "../Redux/locationes";
import { useEffect, useState } from "react";
export default function useSetLat_Lng(){
  const dispatch=useDispatch()
  const [data,setData]=useState(null);
  useEffect(()=>{
     fun()
  },[data])
  async function fun(){
async ()=>{const url=`https://corsproxy.io/?https://www.swiggy.com/dapi/misc/address-recommend?place_id=${data}`
          var data1=await fetch(url);
         data1=await data1.json();
         console.log("daa",data1.data[0].geometry.location.lng);
         dispatch(addLat(data1?.data[0]?.geometry?.location?.lat))
         dispatch(addLng(data1?.data[0]?.geometry?.location?.lng))
  }
  }
  return [data,setData];
 }