import { CDN_IMAGE_URL } from "../Utils/constant.js";
import {CardState} from "../Utils/CardState.js";
import { useContext,useState} from "react";
import CardState from "../Utils/CardState.js";
import { useDispatch, useSelector } from "react-redux";
import { addItem,increamentItem } from "../Utils/Redux/cardSlice.js";
import Test from "./Test.js";
const MenuItemes=({data})=>{
  const itemes=useSelector((state)=>state.cart.itemes)
  const dispatch=useDispatch();
  const [isVisibleAdd, setIsVisible] = useState(false);
   const [isVisibleRemove, setIsVisibleRemove] = useState(false);
  const showPopupGreen = () => {
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Adjust the timing as needed
  };
  const showPopupRed = () => {
    setIsVisibleRemove(true);

    setTimeout(() => {
      setIsVisibleRemove(false);
    }, 2000); // Adjust the timing as needed
  };

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
  if(a===0){return button1}
  return null;
}
var button1= <button className="w-20 h-8 bg-green-500 border-green-800 text-white rounded-3xl border-2  hover:bg-green-700"onClick={showPopupGreen}>AddItem </button>
    return(
    
        <>
        <div className="mt-5">
          <div >
             <div className="flex items-center justify-around">  {/*Data for card */}
              <div>
              {isVisibleAdd && (<div className="absolute left-24  transform -translate-x-1/2 bg-white  shadow-lg animate-fade-in-down rounded-lg h-16 w-[40%] text-center "
                                  style={{ backgroundColor: '#68d391' }}
                                   >
                                 <p className="text-black font-bold text-center text-2xl">Added successfully!</p>
                              </div>
                            )}
               {isVisibleRemove && (<div className="absolute left-24  transform -translate-x-1/2 bg-white  shadow-lg animate-fade-in-down rounded-lg h-16 w-[40%] text-center "
                                  style={{ backgroundColor: 'red' }}
                                   >
                                 <p className="text-black font-bold text-center text-2xl">Removed successfully!</p>
                              </div>
                            )}             
                  <h4 className="font-bold">{data?.card?.info?.name }</h4>
                  <p>₹{data?.card?.info?.defaultPrice/100}</p>
                 <div className="overflow-ellipsis overflow-hidden w-[200px] h-[55px]">
                     {data.card.info.description}
                 </div>
                     <p className="font-bold">{data?.card?.info?.ratings?.aggregatedRating?.rating }</p>
              </div>
              <div>   {/**card add ,remove butoon  */}
                   <img  loading="lazy" alt={"loading"}className="rounded-3xl w-[100px] h-[100px]" src={CDN_IMAGE_URL+data?.card?.info?.imageId ||data?.imageId}></img>
                   <div className="relative -top-7 left-2 flex justify-around w-20 rounded-3xl border-solid border-2  border-orange-300 shadow-orange-50 h-8 bg-white"> 
                  {
                    itemes.length!==0 && itemes.map((da)=>da?.id===data?.card?.info?.id && da?.addSymbole && da?.addSymbole===true?<div className="hover:cursor-pointer" onClick={()=>{dec(data);showPopupRed()}}>-</div>:null)
                  }
                <div className="text-orange-400"onClick={()=>handileOnClick(data)}>
                  {
                     itemes.length===0?button1:fun(data)
                  }
                 {
                    itemes.length!==0 && itemes.map((da)=>da?.id===data?.card?.info?.id && da?.addSymbole && da?.addSymbole===true?da?.count:
                    da?.id===data?.card?.info?.id  && da?.addSymbole===false?button1:null
                    )  
                  }
                 </div>
                 {
                    itemes.length!==0 && itemes.map((da)=>da?.id===data?.card?.info?.id && da?.addSymbole && da?.addSymbole===true?<div className="hover:cursor-pointer" onClick={()=>{inc(data);showPopupGreen()}}>+</div>:null)
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