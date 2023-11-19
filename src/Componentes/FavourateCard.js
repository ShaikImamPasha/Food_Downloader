import { useSelector } from "react-redux";
import MenuItemes from "./MenuItemes";
import { CDN_IMAGE_URL } from "../Utils/constant.js";
const FavourateCard=()=>{
  const FavourateItemesCard=useSelector((states)=>states.cart.itemes);
  console.log(FavourateItemesCard);
    return(
      <>
      <div className="border-solid border-2 border-orange-300 rounded-lg shadow-orange-800">
      {
        FavourateItemesCard.map((data)=>{
          return  data.addSymbole===true?<div className="">
          <div className="">
             <div className="flex items-center justify-around">
              <div>
              <h4 className="font-bold">{ data?.name}</h4>
               <p>₹{data?.price/100}</p>
               <p>{data?.rating}</p>
              </div>
              <img  loading="lazy" alt={"loading"}className="rounded-3xl w-[50px] h-[50px]" src={CDN_IMAGE_URL+data?.imageId}></img>
            </div>
          
       </div>
           
            </div>:null
        })
        
      }
      </div>
    <div>
       
    </div>
    </>
    )
}
export default FavourateCard;