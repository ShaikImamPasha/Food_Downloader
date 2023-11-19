import { CDN_IMAGE_URL } from "../Utils/constant.js";
import {CardState} from "../Utils/CardState.js";
import { useContext,useState} from "react";
import CardState from "../Utils/CardState.js";
import { useDispatch, useSelector } from "react-redux";
import { addItem,increamentItem } from "../Utils/Redux/cardSlice.js";
const MenuItemes=({data})=>{
  const itemes=useSelector((state)=>state.cart.itemes)
  const dispatch=useDispatch();

  const handileOnClick=(data)=>{
    var a=true;
    for(var i=0;i<itemes.length;i++){
      if(data.card.info.id===itemes[i].id){
        a=false;
      }
    }
    if(a){
    let newObj={...data.card.info,count:1,addSymbole:true}
   dispatch(addItem([...itemes,newObj]));
    }else{
      var add=itemes.map((da)=>{return(
        da.id===data.card.info.id && da.count===1?{...da,addSymbole: true}:da
      )})
    dispatch(addItem(add));
    }
    console.log(itemes)
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
    var ad=itemes.map((da)=>{return(
      da.id===data.card.info.id && da.count===1?{...da,addSymbole: false}:da
    )})
    var temp=false;
    for(var i=0;i<itemes.length;i++){
      if(data.card.info.id===itemes[i].id && itemes[i].count===1){
                   temp=true; 
      }
    }
    if(temp){
      dispatch(increamentItem(ad))
      //console.log(ad)
    }else{
     dispatch(increamentItem(addedCardData));
    }
   //console.log(itemes)
  }
function fun(data)
{
  var a=0;
  for(let i=0;i<itemes.length;i++){
    if(data.card.info.id===itemes[i].id){
       a++;
    }
  }
  if(a===0){return "addItem"}
  return null;
}

    return(
        <>
        <div className="mt-5">
          <div >
             <div className="flex items-center justify-around">
              <div>
              <h4 className="font-bold">{data?.card?.info?.name || data?.name}</h4>
               <p>₹{data?.card?.info?.price/100 || data?.price/100}</p>
               <p>{data?.card?.info?.ratings?.aggregatedRating?.rating || data?.rating}</p>
              </div>
               <div>   
                <img  loading="lazy" alt={"loading"}className="rounded-3xl w-[100px] h-[100px]" src={CDN_IMAGE_URL+data?.card?.info?.imageId ||data?.imageId}></img>
                <div className="flex justify-around w-20 rounded-md border-solid border-2  border-orange-300 shadow-orange-50 h-8 bg-white"> 
             {
                itemes.length!==0 && itemes.map((da)=>da?.id===data?.card?.info?.id && da?.addSymbole && da?.addSymbole===true?<div onClick={()=>{dec(data)}}>-</div>:null)
               }
              <button className="text-orange-400"onClick={()=>handileOnClick(data)}>
               {
                itemes.length===0?"addItem":fun(data)
               }
                {
                itemes.length!==0 && itemes.map((da)=>da?.id===data?.card?.info?.id && da?.addSymbole && da?.addSymbole===true?da?.count:
                da?.id===data?.card?.info?.id  && da?.addSymbole===false?"addItem":null
                )  
                }
              
              </button>
              {
                itemes.length!==0 && itemes.map((da)=>da?.id===data?.card?.info?.id && da?.addSymbole && da?.addSymbole===true?<div onClick={()=>{inc(data)}}>+</div>:null)
               }
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