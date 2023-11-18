import { CDN_IMAGE_URL } from "../Utils/constant.js";
import {CardState} from "../Utils/CardState.js";
import { useContext} from "react";
import CardState from "../Utils/CardState.js";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../Utils/Redux/cardSlice.js";
const MenuItemes=({data})=>{
  const itemes=useSelector((state)=>state.cart.itemes)
  const dispatch=useDispatch();
  const handileOnClick=(data)=>{
   dispatch(addItem(data));
  }
    return(
        <>
        <div className="mt-5">
          <div >
             <div className="flex items-center justify-evenly">
              <div>
              <h4 className="font-bold">{data.card.info.name}</h4>
               <p>₹{data.card.info.price/100}</p>
               <p>{data.card.info.ratings.aggregatedRating.rating}</p>
              </div>
               <div>   
                <img  loading="lazy" alt={"loading"}className="rounded-3xl w-[100px] h-[100px]" src={CDN_IMAGE_URL+data.card.info.imageId}></img>
                <div className="absolute ml-[13px] mt-[-23px] text-center w-20 rounded-md border-solid border-2  border-orange-300 shadow-orange-50 h-8 bg-white">
                <button className="text-orange-400"onClick={()=>handileOnClick(data)}>{ itemes.length===0?<p>ADD</p>:null}</button>
                  </div> 
              </div>
            </div>
           <div className="flex items-center justify-around">
                <div className="w-96 h-1 bg-green-200">

                </div>
            </div>
       </div>
           
            </div>
      </>
    )
}
export default MenuItemes;