import { useDispatch, useSelector } from "react-redux";
import { addLocation, addPlaceName,addLat,addLng } from "../Utils/Redux/locationes";
import { useEffect, useState } from "react";
const SearchLocationes=(props)=>{
    const {data}=props;
   // console.log(data)
    const dispatch=useDispatch();

    async function setLocation(data){
       const url=`https://corsproxy.io/?https://www.swiggy.com/dapi/misc/address-recommend?place_id=${data}`
         var data1=await fetch(url);
        data1=await data1.json();
      //  console.log(data1.data[0].geometry.location.lng);
        dispatch(addLat(data1.data[0].geometry.location.lat))
        dispatch(addLng(data1.data[0].geometry.location.lng))
    }
    return(
        <> 
       {
       data.length===0?<div   className="cursor-pointer w-full h-full bg-black"><h3>no data</h3></div>:data.map((data)=>{
            return(
                <div  onClick={()=>{setLocation(data.place_id);dispatch(addPlaceName(data.description));dispatch(addLocation(false));}} className="w-full h-full border border-solid  mt-7 cursor-pointer flex items-center justify-start ">
                <div onClick={()=>{setLocation(data.place_id)}} className="pr-7">
                <span class="material-symbols-outlined">
                  location_on
                </span>
                </div>
                <div className="break-words ">
                    {data.structured_formatting.main_text}
                    <div className="text-slate-400 break-words">
                    {data.structured_formatting.secondary_text}
                </div>
                <div className="border border-solid border-dotted">
                </div>
                </div>
            </div>
            )
        })
       }
        </>
    )
}
export default SearchLocationes;