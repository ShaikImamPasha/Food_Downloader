import Shimmer from "./Shimmer";
import MenuRestarent from "./MenuRestarent";
import { useParams } from "react-router-dom";
import useResturent from "../Utils/Custom_Hooks/useResturent";
import { useState } from "react";
const Restaurent=()=>{
    const {resid}=useParams();
    const resInfo=useResturent(resid);
    const [arrowIndex,setArrayIndex]=useState(null);
 console.log(resInfo)
    function setArrayfunction(index){
    setArrayIndex(index);
    }
    if(resInfo!==null){
        var {name,avgRating,areaName,locality}=resInfo?.data?.cards[0]?.card?.card?.info;
        var menuitemes=resInfo?.data?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR.cards;
        //console.log(menuitemes);
    }

    return(
        resInfo===null?<Shimmer />:<>
        <div className=""> 
            <div className="flex items-center flex-col">
              <div>
                <h4 className="font-bold">{name}</h4> 
                   {areaName},{locality}
               </div>  
               <p>&#9733;{avgRating}</p>
               <hr style={{width: "320px",borderBottom: "1px dashed #d3d3d3"}}/> 
            </div>
          <div className="">
            <div className="">
            {menuitemes.map((data,index)=>{
                return (
                <>
         <div key={index}>
         {<MenuRestarent className="" key={index} arrow={index===arrowIndex?true:false} 
         setArryFunctions={()=>setArrayfunction(index)}
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