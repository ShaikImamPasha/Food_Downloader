import data from "../Utils/mockData.js";
import Card,{withDiscountCard} from "./Card.js";
import Shimmer from "./Shimmer.js";
import { useState,useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader   from "react-spinners/ClipLoader";
import { useState, CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import locationes, { addWhatOnYourMind,addOffersOn,addMapResturenData } from "../Utils/Redux/locationes.js";
import { Ti } from "../Utils/Redux/cardSlice.js";
import { addResturentData } from "../Utils/Redux/cardSlice.js";
import Slider from "./Slider.js";
import MapComponent from "./MapComponent.js";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from "axios";
const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448609.png',
  iconSize: [40, 40],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

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
    const offersOn=useSelector((state)=>state.loc.offersOn);
    const mapData=useSelector((state)=>state.loc.mapData);
  //  console.log(mapData)
    const dispatch=useDispatch();
  useEffect(()=>{
    fetchdata()
},[lat,lng]); //it's worked after all componentes are renderd.

var arrr=[];
  const fetchdata=async ()=>{
    if(800<=window.screen.height){
        const data1 = await fetch(`https://corsproxy.io/?https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=${lat}&lng=${lng}&carousel=true&third_party_vendor=1`)
        var json_data=await data1.json(); 
    }
    else{
        const data1 = await fetch(`https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
        var json_data=await data1.json(); 
    }
        

         dispatch(addOffersOn(json_data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info))
         dispatch(addWhatOnYourMind(json_data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.info))
        //    dispatch(Ti([json_data?.data?.cards[0]?.card?.card?.imageGridCards?.info[0],json_data?.data?.cards[0]?.card?.card?.imageGridCards?.info[1]]))
         json_data=json_data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants || json_data?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
         json_data && setTemdata(json_data.slice(0,8));
       



        const allplacesurls=json_data?.map((data)=>{
            return fetch(`https://www.swiggy.com/mapi/misc/place-autocomplete?input=${data.info.areaName}`)  
        })
        Promise.all(allplacesurls)
  .then(responses => {
    // Convert each response to JSON
    const jsonPromises = responses.map(response => response.json());
    return Promise.all(jsonPromises); // Resolves when all JSON parsing is done
  })
  .then(dataArray => {
    // Work with the array of data here
    const allplacePlaceIdsurls=dataArray?.map((data)=>{
      return fetch(`https://www.swiggy.com/mapi/misc/address-recommend?place_id=${data.data[0].place_id}`) 
  })

  Promise.all(allplacePlaceIdsurls)
  .then(responses => {
    // Convert each response to JSON
    const jsonPromises = responses.map(response => response.json());
    return Promise.all(jsonPromises); // Resolves when all JSON parsing is done
  })
  .then(dataArray => {
    // Work with the array of data here
    setMapData(dataArray);
    console.log(dataArray);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch operations
    console.error('Fetch operation error:', error);
  });

  })
  .catch(error => {
    // Handle any errors that occurred during the fetch operations
    console.error('Fetch operation error:', error);
  });


        setOrgenaldata(json_data);
        dispatch(addResturentData(json_data))
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
       <div className="mb-11">
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
        <div className="w-80 h-52 flex justify-center items-center">
          {  
       
       mapdata.length!==0? <MapContainer center={[0, 0]} zoom={2} style={{ height: '200px', width: '100px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {
              
         mapdata.map((location, index) => (
              <Marker key={index} position={[location.data[0].geometry.location.lat,location.data[0].geometry.location.lng]} icon={customIcon}>
                <Popup>{`hyderbad`} <div className='cursor-pointer' onClick={()=>console.log("cl")}>clk here for got to resturent details</div></Popup>
              </Marker>
            ))
            }
          </MapContainer>:null
          }
              

            </div>
        <InfiniteScroll dataLength={tempdata.length} next={loadNextData} hasMore={hasmore} loader={<Shimmer/>}
       endMessage={ <p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}>
        <div>
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