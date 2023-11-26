import { useDispatch } from "react-redux";
import { addLat,addLng } from "../Redux/locationes";
import { useEffect, useState } from "react";
export default function useSetLat_Lng(){
  const dispatch=useDispatch()
  const [data,setData]=useState(" ");
  console.log(data)
  useEffect(()=>{
     fun()
  },[data])
  async function fun(){
    const url=`https://corsproxy.io/?https://www.swiggy.com/dapi/misc/address-recommend?place_id=${data}`
    if(data!==" "){
      console.log(data)
     var data1=await fetch(url)
      data1=await data1.json()
      dispatch(addLat(data1?.data[0]?.geometry?.location?.lat))
      dispatch(addLng(data1?.data[0]?.geometry?.location?.lng))
    }  
  
  }
  return [data,setData];
 }