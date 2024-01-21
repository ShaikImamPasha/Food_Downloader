import { useState } from "react";

async function useGetCurrontLocation(lat,lan){
    const [data,setData]=useState();
    var dataa=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lan}`)
    //setcurontLocation(await data.json())
    dataa=await dataa.json();
    setData(dataa)
     return data;
    }
export default useGetCurrontLocation;