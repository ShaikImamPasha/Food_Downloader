import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from "react-router-dom";
const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448609.png',
  iconSize: [40, 40],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapCpt=()=>{
  const lat=useSelector((state)=>state.loc.lat);
  const lng=useSelector((state)=>state.loc.lng);
    const [mapdata,setMapData]=useState([]);
    const [resturentData,setResturentData]=useState([]);
  useEffect(()=>{
    fetchdata();
    fetchMapData();
  },[resturentData])
  const fetchdata=async ()=>{
    if(window.screen.height>768 ){
        const data1 = await fetch(`https://corsproxy.io/?https://www.swiggy.com/mapi/homepage/getCards?lat=${lat}&lng=${lng}`)
        var json_data=await data1.json(); 
     console.log("mobile mode")
    }
    else{
        const data1 = await fetch(`https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}`)
        var json_data=await data1.json(); 
        console.log("desktop mode")
    }
   json_data=json_data?.data?.success?.cards[4]?.gridWidget?.gridElements?.infoWithStyle?.restaurants || json_data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
     setResturentData(json_data);
  }
    
  function fetchMapData(){
    const allplacesurls=resturentData?.map((data)=>{
        return fetch(`https://corsproxy.io/?https://www.swiggy.com/mapi/misc/place-autocomplete?input=${data.info.areaName}`)  
    })
    Promise.all(allplacesurls)
     .then(responses => {
    const jsonPromises = responses.map(response => response.json());
     return Promise.all(jsonPromises);
     })
     .then(dataArray => {
// console.log(dataArray)
     const allplacePlaceIdsurls=dataArray?.map((data)=>{
   return fetch(`https://corsproxy.io/?https://www.swiggy.com/mapi/misc/address-recommend?place_id=${data.data[0].place_id}`) 
     })

    Promise.all(allplacePlaceIdsurls)
     .then(responses => {
     const jsonPromises = responses.map(response => response.json());
    return Promise.all(jsonPromises); 
     })
     .then(dataArray => {
    resturentData.map((data,index)=>{
    dataArray[index].data[0].id=data.info.id;
    dataArray[index].data[0].resturentName=data.info.name;
   setMapData(dataArray);
     }) 
   })
    .catch(error => {
    console.error('Fetch operation error:', error);
   });

   })
  .catch(error => {
console.error('Fetch operation error:', error);
   });
  
   }
    return(
        <>
         <div className="">
          { 
       mapdata.length!==0?  <MapContainer center={[22,70]} zoom={4} style={{ height: '100px', width: '500px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {
              
         mapdata.map((location, index) => (
          
              <Marker key={index} position={[location.data[0].geometry.location.lat,location.data[0].geometry.location.lng]} icon={customIcon}>
               {console.log(mapdata)} <Popup><div className='cursor-pointer' ><Link to={"/restaurent/"+location.data[0].id}>click here for go to {location.data[0].resturentName} resturent Menu</Link></div></Popup>
              </Marker>
            ))
            }
          </MapContainer>:<h1>loding</h1>
          }
              

            </div>
        </>
    )
}
export default MapCpt;