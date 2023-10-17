import { Link } from "react-router-dom";
import { CDN_IMAGE_URL } from "../Utils/constant";
import { addItem } from "../Utils/Redux/cardSlice";
import { useDispatch } from "react-redux";
const Card=(props)=>{     //props is js object
    var {name,locality,areaName,costForTwo,cloudinaryImageId, cuisines,avgRating,id}=props?.data.info;

     return(
        <Link to={"/restaurent/"+id}>
        <div className="flex  justify-around flex-col mb-[2px] ml-[2px]  w-[150px] h-[315px] break-words bg-white-100 hover:bg-gray-200 rounded-3xl">
           <div className="flex items-center justify-center">
           <img loading="lazy" className="w-[200px] h-[190px]  rounded-3xl" alt="loading" src={CDN_IMAGE_URL+cloudinaryImageId}/>
           </div>
             
             <div>
                <h3>{name}</h3>
             <span>{avgRating} Rating</span>
             <p>{areaName},{locality}</p>
             </div>
         </div>
        </Link>
     )
 }
export const withDiscountCard=(Card)=>{
    return(props)=>{
        const {subHeader}=props.data.info.aggregatedDiscountInfoV3;
        return(
            <div>
               <h1 className="absolute ml-[70px]  bg-black rounded-lg text-white font-bold">{subHeader}Offer</h1>
              <Card data={props.data}/> 
            </div>
        )
    }
}
 export default Card;