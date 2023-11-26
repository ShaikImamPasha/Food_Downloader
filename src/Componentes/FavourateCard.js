import { useSelector } from "react-redux";
import MenuItemes from "./MenuItemes";
import { CDN_IMAGE_URL } from "../Utils/constant.js";
const FavourateCard=()=>{
  const FavourateItemesCard=useSelector((states)=>states.cart.itemes);
  console.log(FavourateItemesCard);
  if(FavourateItemesCard.length===0){
    return(
      <>
      <div className="flex flex-col flex-wrap justify-center items-center">
      <img className="H-50 mt-2" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"></img>     
        <h3>Your cart is empty</h3>
        <small className="text-stone-700">You can go to home page to view more restaurants</small>
       
      </div>
   
      </>
    )
  }
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