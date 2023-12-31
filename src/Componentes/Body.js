import data from "../Utils/mockData.js";
import Card,{withDiscountCard} from "./Card.js";
import Shimmer from "./Shimmer.js";
import { useState,useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader   from "react-spinners/ClipLoader";
import { useState, CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import locationes, { addWhatOnYourMind,addOffersOn,addMapResturenData,TopOfferesForYou } from "../Utils/Redux/locationes.js";
import { Ti } from "../Utils/Redux/cardSlice.js";
import { addResturentData } from "../Utils/Redux/cardSlice.js";
import Slider from "./Slider.js";
import MapComponent from "./MapComponent.js";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Test from "./Test.js";
const Body=(props)=>{
     //state vairable  -super powerful vairable
     const resdata=useState([]);
     const [mapdata,setMapData]=useState([]);
     const [tempdata,setTemdata]=resdata; 
    const  [orgenaldata,setOrgenaldata]=useState([]);
    const [hasmore,setHashMore]=useState(true);
    const [curentIndex,setCurentIndex]=useState(4);
    const CardWithDiscount=withDiscountCard(Card);
    const lat=useSelector((states)=>states.loc.lat);
    const lng=useSelector((states)=>states.loc.lng);
    const whatOnYourMind=useSelector((state)=>state.loc.whatOnYourMind);
    const topOfferesForYou=useSelector((state)=>state.loc.topOfferesForYou);
    const offersOn=useSelector((state)=>state.loc.offersOn);
    
    const mapData=useSelector((state)=>state.loc.mapData);
  //  console.log(mapData)
    const dispatch=useDispatch();
  useEffect(()=>{
    fetchdata()
},[lat,lng]); //it's worked after all componentes are renderd.

var arrr=[];
  const fetchdata=async ()=>{
    
      
    var data1 = await fetch(`https://smoggy-flannel-shirt-elk.cyclic.app/api/proxy/swiggy/mapi/homepage/getCards?lat=${lat}&lng=${lng}`)

    if(data1.ok===false && data1.status===404){
      
         data1 = await fetch(`https://busy-plum-bull-veil.cyclic.app/api/proxy/swiggy/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}`)
   
        var json_data=await data1.json(); 
        dispatch(TopOfferesForYou(json_data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || json_data?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants))
   //      dispatch(addOffersOn(json_data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info))
         dispatch(addWhatOnYourMind(json_data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info || json_data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.info))
               
           json_data=json_data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || json_data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            json_data && setTemdata(json_data.slice(0,8));
           setOrgenaldata(json_data);
           dispatch(addResturentData(json_data))
    }else{
        console.log("mobile mode new")
    var json_data=await data1.json();
     dispatch(TopOfferesForYou(json_data?.data?.success?.cards[1]?.gridWidget?.gridElements?.infoWithStyle?.restaurants))
      dispatch(addOffersOn(json_data?.data?.success?.cards[2]?.gridWidget?.gridElements?.infoWithStyle?.info))
      dispatch(addWhatOnYourMind(json_data?.data?.success?.cards[3]?.gridWidget?.gridElements?.infoWithStyle?.info))
        //    dispatch(Ti([json_data?.data?.cards[0]?.card?.card?.imageGridCards?.info[0],json_data?.data?.cards[0]?.card?.card?.imageGridCards?.info[1]]))
        json_data=json_data?.data?.success?.cards[4]?.gridWidget?.gridElements?.infoWithStyle?.restaurants ||json_data?.data?.success?.cards[3]?.gridWidget?.gridElements?.infoWithStyle?.restaurants;

        json_data && setTemdata(json_data.slice(0,8));
        setOrgenaldata(json_data);
        dispatch(addResturentData(json_data))
    }
        }
    
  
        
  
       
        const loadNextData=()=>{
            if(orgenaldata.length<=tempdata.length){
                   setHashMore(false);
                   return
            }
            setTimeout(async ()=>{
                if(tempdata.length>0){
                         setTemdata(tempdata.concat(orgenaldata.slice(curentIndex,curentIndex+4)));
                         setCurentIndex(curentIndex+4);
                    //     console.log("ckc");
                    var response = await fetch(`https://busy-plum-bull-veil.cyclic.app/api/proxy/swiggy/dapi/restaurants/list/update`, {
                      method: "POST", // *GET, POST, PUT, DELETE, etc.
                      mode: "cors", // no-cors, *cors, same-origin
                      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                      credentials: "same-origin", // include, *same-origin, omit
                      headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                      },
                      redirect: "follow", // manual, *follow, error
                      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                      body: JSON.stringify(
                        {
                          lat: 17.385044,
                          lng: 78.486671,
                          nextOffset: "COVCELQ4KICAxfKQ2Om3YjCnEzgB",
                          widgetOffset: {
                              NewListingView_Topical_Fullbleed: "",
                              NewListingView_category_bar_chicletranking_TwoRows: "",
                              NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
                              Restaurant_Group_WebView_SEO_PB_Theme: "",
                              collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "10",
                              inlineFacetFilter: "",
                              restaurantCountWidget: ""
                          },
                          filters: {},
                          seoParams: {
                              seoUrl: "https://www.swiggy.com/",
                              pageType: "FOOD_HOMEPAGE",
                              apiName: "FoodHomePage"
                          },
                          page_type: "DESKTOP_WEB_LISTING",
                          _csrf: "Y8Fmtj8Tk9pT-K8F7vfgEZmUXpdtk0Rbg9p4AuqQ"
                      }
                         ), // body data type must match "Content-Type" header
                    });
                    response=await response.json();
                    console.log("moredata",response)
                }
            },1000)
    

        }
    return(
        //CONDITIONAL RANDARING
       tempdata.length===0?<div >
           <div className="w-full mt-5 bg-white rounded-lg shadow-lg">
      <div className="animate-pulse bg-gray-300 h-56 w-full flex items-center justify-center">
      </div>
     
    </div>{           <Shimmer/>      }
       </div>
       : 
       <div className="mb-11 z-30">
        <div className="">
            {
                topOfferesForYou===undefined?null:topOfferesForYou.length!==0?<div className="flex items-center flex-wrap flex-col mb-1">
             <p className="font-black mt-6 inline-block"><span><img className="inline-block w-[25px] h-[25px]" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/sl9oogwe7n5dusolt5xe"></img></span>Top Picks for you</p>
                    {<Slider data={"topOfferesForYou"}/>}
                </div>:null
            }
            { offersOn===undefined?null:offersOn.length!==0?<div className="flex items-center flex-wrap flex-col">
            <h1 className="font-black mt-6">Best Offers For You{lat}</h1>
                {<Slider data={"offersOn"}/>}
            </div>:null
            }
            <div className="flex items-center flex-wrap flex-col">
           {whatOnYourMind===undefined?null:whatOnYourMind.length!==0?<div><h1 className="font-black mt-6 text-center">  What's on your mind?</h1>
         <Slider data={"whatOnYourMind"}/></div>:null
           }
            </div>
        </div>
        <InfiniteScroll dataLength={tempdata.length} next={loadNextData} hasMore={hasmore} loader={<Shimmer/>}
       endMessage={ <p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}>
        <div>
       <div className="flex flex-wrap items-center justify-around mt-5">
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