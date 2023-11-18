import { CDN_IMAGE_URL } from "../Utils/constant.js";
import {CardState} from "../Utils/CardState.js";
import { useContext,useState} from "react";
import CardState from "../Utils/CardState.js";
import { useDispatch, useSelector } from "react-redux";
import { addItem,increamentItem } from "../Utils/Redux/cardSlice.js";
const MenuItemes=({data})=>{
  const itemes=useSelector((state)=>state.cart.itemes)
  const [addSymbole,setAddSymbole]=useState(true);
  const dispatch=useDispatch();

  const handileOnClick=(data)=>{

    setAddSymbole(false)
    var a=true;
    for(var i=0;i<itemes.length;i++){
      if(data.card.info.id===itemes[i].id){
        a=false;
      }
    }
    if(a){
    let newObj={...data.card.info,count:1}
   dispatch(addItem([...itemes,newObj]));
   // console.log(itemes)
    }
    }

  const inc=(data)=>{
    var addedCardData=itemes.map((da)=>{return(
      da.id===data.card.info.id?{...da,count: da.count+1}:da
    )})
     dispatch(increamentItem(addedCardData));
  // console.log(itemes)
  }

  const dec=(data)=>{
    var addedCardData=itemes.map((da)=>{return(
      da.id===data.card.info.id && da.count!==1?{...da,count: da.count-1}:da 
    )})
    itemes.map((da)=>{return(
      da.id===data.card.info.id && da.count===1?setAddSymbole(true):null
    )})
   
     dispatch(increamentItem(addedCardData));
   //console.log(itemes)
  }


    return(
        <>
        <div className="mt-5">
          <div >
             <div className="flex items-center justify-around">
              <div>
              <h4 className="font-bold">{data.card.info.name}</h4>
               <p>₹{data.card.info.price/100}</p>
               <p>{data.card.info.ratings.aggregatedRating.rating}</p>
              </div>
               <div>   
                <img  loading="lazy" alt={"loading"}className="rounded-3xl w-[100px] h-[100px]" src={CDN_IMAGE_URL+data.card.info.imageId}></img>
                <div className="flex justify-around w-20 rounded-md border-solid border-2  border-orange-300 shadow-orange-50 h-8 bg-white">
              {addSymbole===false?<div onClick={()=>{dec(data)}}>-</div>:null}  
              <button className="text-orange-400"onClick={()=>handileOnClick(data)}>
                {addSymbole===true?"addItem":itemes.map((da)=>da.id===data.card.info.id?da.count:null)}
              </button>
              {addSymbole===false?<div onClick={()=>{inc(data)}}>+</div>:null}
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