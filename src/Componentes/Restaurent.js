import Shimmer from "./Shimmer";
import MenuRestarent from "./MenuRestarent";
import { useParams } from "react-router-dom";
import useResturent from "../Utils/Custom_Hooks/useResturent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Restaurent=()=>{
  const dispatch=useDispatch();
    const {resid}=useParams();
    const resInfo=useResturent(resid);
    const [arrowIndex,setArrayIndex]=useState(null);

  useEffect(()=>{
  
  },[])
    function setArrayfunction(index){
    setArrayIndex(index);
    }
    console.log("resinfo",resInfo);
    if(resInfo!==null){
        var {name,avgRating,areaName,locality}=resInfo?.data?.cards[0]?.card?.card?.info || resInfo?.data?.cards[2]?.card?.card?.info;
        var menuitemes=resInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards || resInfo?.data?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR.cards || resInfo?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
        //console.log(menuitemes);
    }



    return(
       resInfo===null?<Shimmer />:<>
        <div className=""> 

          <div className="">
            <div className="">
            {menuitemes.map((data,index)=>{
                return (
                <>
         <div key={index}>
         {<MenuRestarent className="" key={index} arrow={index===arrowIndex?true:false} 
         setArryFunctions={()=>setArrayfunction(index)} setArrayClose={()=>setArrayfunction(null)}
         title={data.card.card.title} data={data}/>}
         </div>
                 
                </>
                )
            })}
            </div>
          </div>
          </div>
        </>
    )
}
export default Restaurent;