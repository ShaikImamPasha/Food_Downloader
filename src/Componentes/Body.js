import data from "../Utils/mockData.js";
import Card,{withDiscountCard} from "./Card.js";
import Shimmer from "./Shimmer.js";
import { useState,useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader   from "react-spinners/ClipLoader";
import { useState, CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWhatOnYourMind,addOffersOn } from "../Utils/Redux/locationes.js";
import { Ti } from "../Utils/Redux/cardSlice.js";
import Slider from "./Slider.js";
const Body=()=>{
     //state vairable  -super powerful vairable
     const resdata=useState([]);
     const [tempdata,setTemdata]=resdata; 
     const [searchtest,setSearchtest]=useState("");
    const  [orgenaldata,setOrgenaldata]=useState([]);
    const [hasmore,setHashMore]=useState(true);
    const [curentIndex,setCurentIndex]=useState(4);
    const CardWithDiscount=withDiscountCard(Card);
    const lat=useSelector((states)=>states.loc.lat);
    const lng=useSelector((states)=>states.loc.lng);
    const whatOnYourMind=useSelector((state)=>state.loc.whatOnYourMind);
    const offersOn=useSelector((state)=>state.loc.offersOn);
    const dispatch=useDispatch();
   
  useEffect(()=>{
    fetchdata()
},[lat,lng]); //it's worked after all componentes are renderd.

  const fetchdata=async ()=>{
    const data1 = await fetch(`https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}`)
         let json_data=await data1.json();        
         console.log(json_data.data.cards[1].card.card.gridElements?.infoWithStyle.info)
         dispatch(addOffersOn(json_data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info))
         dispatch(addWhatOnYourMind(json_data.data.cards[1].card.card.gridElements?.infoWithStyle.info))
        //    dispatch(Ti([json_data?.data?.cards[0]?.card?.card?.imageGridCards?.info[0],json_data?.data?.cards[0]?.card?.card?.imageGridCards?.info[1]]))
         json_data=json_data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants || json_data?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
         json_data && setTemdata(json_data.slice(0,8));
        
        setOrgenaldata(json_data);
        }
        //console.log("body rendering");
        function searchdata(){
            var filterdata=orgenaldata.filter((e)=> e.info.name.toLowerCase().includes(searchtest.toLowerCase()));
            setTemdata(filterdata);
        }
        const loadNextData=()=>{
            if(orgenaldata.length<=tempdata.length){
                   setHashMore(false);
                   return
            }
            setTimeout(()=>{
                if(tempdata.length>0){
                         setTemdata(tempdata.concat(orgenaldata.slice(curentIndex,curentIndex+4)));
                         setCurentIndex(curentIndex+4);
                    //     console.log("ckc");
                }
            },1000)
    

        }
    return(
        //CONDITIONAL RANDARING
       tempdata.length===0?<div><div className="bg-black h-56 flex items-center justify-center">
                        <ClipLoader
  color="white"
  size={90}
  speedMultiplier={0.7}
/><img className="w-13 h-12 absolute" src="https://cdn.create.vista.com/api/media/small/470797866/stock-vector-big-hamburger-silver-plated-metallic-icon"></img>
</div>
                         <Shimmer/>     
       </div>
       : 
       <div className="body">
        <div className="">
            { offersOn===undefined?null:offersOn.length!==0?<div className="flex items-center flex-wrap flex-col">
            <h1 className="font-black mt-6">Best Offers For You{lat}</h1>
                {<Slider data={true}/>}
            </div>:null}
            <div className="flex items-center flex-wrap flex-col">
         {whatOnYourMind===undefined?null:whatOnYourMind.length!==0?<div><h1 className="font-black mt-6">  What's on your mind?</h1>
         <Slider data={false}/></div>:null}
            </div>
        </div>
        <div>
                
            </div>
        <InfiniteScroll dataLength={tempdata.length} next={loadNextData} hasMore={hasmore} loader={<Shimmer/>}
       endMessage={ <p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}>
        <div>
        <div className="p-5 flex justify-center flex-wrap">
              <input className="border-r-0 w-[280px] border border-solid border-black" placeholder="search your favourite item" type="text" value={searchtest} onChange={(e)=>setSearchtest(e.target.value)}></input>
              <span className="material-symbols-outlined w-7 bg-orange-400" onClick={searchdata}>search</span>
        </div>
       <div className="flex flex-wrap items-center justify-center">
                {tempdata.map((information)=>{
                 return(
                 information.info.aggregatedDiscountInfoV3?<CardWithDiscount key={information.info.id} data={information}/>:<Card key={information.info.id} data={information}></Card>
                 ) 
                 })}
       </div>
        </div>


</InfiniteScroll>
          
        </div>
    )
}
export default Body; 