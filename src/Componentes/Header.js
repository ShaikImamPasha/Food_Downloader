import { LOGO_URL } from "../Utils/constant";
import {Link} from "react-router-dom";
import useOnlineStates from "../Utils/Custom_Hooks/useOnlineStates";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Utils/Context/UserContext";
import CardState from "../Utils/Context/CardState";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import SearchLocationes from "./SearchLocationes";
import GetCurronLocation from "../Utils/Custom_Hooks/useGetCurrontLocation";
import { useDispatch } from "react-redux";
import { addLocation } from "../Utils/Redux/locationes";
import useGetPlace_Id from "../Utils/Custom_Hooks/useGetPlace_Id";
export const Header=()=>{
    const dispatch=useDispatch();
    const states=useOnlineStates(); 
    const searchlocatines=useSelector((state)=>state.loc.searchlocatines)
    const [placeSearch,setPlaceSearch]=useGetPlace_Id();
    const [curtntLocation,setcurontLocation]=useState("");
    const itemCards=useSelector((state)=>state.cart.itemes); 
    const isOpen=useSelector((state)=>state.loc.isOpen)
    const locationName=useSelector((states)=>states.loc.locationName);
    const [openSearchLocation,setOpenSearchLocatoon]=useState(false);
   const restaurants=useSelector((state)=>state.cart.resturentData);

 // console.log(locationName)
   
   async function getlocation(){
navigator.geolocation.getCurrentPosition(async(data)=>{
   var dataa=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${data.coords.latitude}&longitude=${data.coords.longitude}`)
   dataa=await dataa.json();
     console.log(dataa.city)
     setPlaceSearch(dataa.city)
   },()=>{})
    }


    return(
     <>
          <div className="flex md:flex-wrap h-full  w-full shadow-lg justify-start flex-wrap sticky top-0  z-40 bg-white">
          {restaurants.length===0?<div className="bg-white"> <div className="h-[4px] bg-orange-500 fixed top-0 left-0 w-0 animate-loading-line "></div></div>:null}
           <div>
           {
               isOpen===true?<div className={`bg-white h-[650px] fixed  left-0 top-0 flex-wrap  z-20 card-container  animate-slide-in`}>
                   <div className="w-full">
                   <span onClick={()=>dispatch(addLocation(false))} className="material-symbols-outlined cursor-pointer mt-1 ml-[310px] w-full">
                      close
                   </span>
                   <input className="w-full h-12 shadow-lg border border-solid" value={placeSearch} onChange={(e)=>{  setPlaceSearch(e.target.value);}} placeholder="Enter area,street name" type="text"></input>
                    </div>
        
            <div  className="h-[50px] w-full  cursor-pointer flex flex-wrap mt-10 mb-2  items-center">
                  <span className="material-symbols-outlined ml-2">my_location</span>
                    <div  onClick={()=>{getlocation();}}>
                    <span  className="font-medium ml-3 cursor-pointer"  >Use Current Location</span>
                    <p className="text-gray-500 ml-3 cursor-pointer" > Using Gps</p>
                    </div>
            </div>
            <hr className="ml-11 mt-5 border border-solid border-black"></hr>
                    <div className="bg-white  h-[400px] w-[500px] overflow-auto ">
                          {searchlocatines?<SearchLocationes className="" data={searchlocatines}/>:null}
                    </div>
                </div>:isOpen===false?
               <div className={`bg-white h-[650px] fixed  left-0 top-0 flex-wrap  z-20 card-container  animate-slide-out`}>
                <div className="w-full">
                <span onClick={()=>dispatch(addLocation(false))} className="material-symbols-outlined cursor-pointer mt-1 ml-[310px] w-full">
                   close
                </span>
                <input className="w-full h-12 shadow-lg border border-solid" value={placeSearch} onChange={(e)=>{  setPlaceSearch(e.target.value);}} placeholder="Enter area,street name" type="text"></input>
                 </div>
     
         <div  className="h-[50px] w-full  cursor-pointer flex flex-wrap mt-10 mb-2  items-center">
               <span className="material-symbols-outlined ml-2">my_location</span>
                 <div >
                 <span  className="font-medium ml-3">Use Current Location</span>
                 <p className="text-gray-500 ml-3"> Using Gps</p>
                 </div>
         </div>
         <hr className="ml-11 mt-5 border border-solid border-black"></hr>
                 <div className="bg-white  h-[400px] w-[500px] overflow-auto ">
                       {searchlocatines?<SearchLocationes className="" data={searchlocatines}/>:null}
                 </div>
             </div> 
             :null
                }                
            
            <div onClick={()=>dispatch(addLocation(true))} className="flex flex-wrap items-center justify-center">
           <img className=" h-[80px]" src={LOGO_URL}/>
          <span  className="material-symbols-outlined cursor-pointer">add_location</span> <div>
           <p  className="font-semibold ml-2">Other</p>
           </div>
            </div>
            <div>
                    <ul className="md:flex flex-wrap justify-evenly hidden">
                       <li className="px-2 h-auto">Online Statues:{states?"🟢":"🛑"}</li>
                        <li  className="px-2 h-auto"><Link to="/">Home</Link></li>
                        <li  className="px-2 h-auto"><Link to="/about">About Us</Link></li>
                        <li  className="px-2 h-auto"><Link to="/contact">Contact us</Link></li>
                        <li  className="px-2 h-auto"><Link to="/FavourateCard">Cart{itemCards.length}</Link></li>
                        <li  className="px-2 h-auto">Login</li>
                    </ul>
            </div>
            <div className="ml-9">
            <h3>{locationName}</h3>
            </div> 
           </div>
        </div>
     </>
    )
}
export default Header; 