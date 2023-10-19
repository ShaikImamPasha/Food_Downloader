import { LOGO_URL } from "../Utils/constant";
import {Link} from "react-router-dom";
import useOnlineStates from "../Utils/useOnlineStates";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Utils/UserContext";
import CardState from "../Utils/CardState";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import SearchLocationes from "./SearchLocationes";
import Location from "../Utils/Location";
import { useDispatch } from "react-redux";
import { addLocation } from "../Utils/Redux/locationes";
export const Header=()=>{
    const dispatch=useDispatch();
    const states=useOnlineStates(); 
    const [curtntLocation,setcurontLocation]=useState("");
    const itemCards=useSelector((state)=>state.cart.itemes); 
    const isOpen=useSelector((state)=>state.loc.isOpen)
    const locationName=useSelector((states)=>states.loc.locationName);
    const [openSearchLocation,setOpenSearchLocatoon]=useState(false);
    const [placeSearch,setPlaceSearch]=useState("");
    const [searchlocatines,setSearchLocatines]=useState([]);
   

 // console.log(locationName)

    useEffect(()=>{
       fetchdata();
    },[placeSearch])

    async function fetchdata(){
        var data=await fetch(`https://corsproxy.io/?https://www.swiggy.com/dapi/misc/place-autocomplete?input=${placeSearch}`);
        data=await data.json();
        setSearchLocatines(data.data);
        console.log(data)
     //  console.log(data.data);
    }

  
   
   async function getlocation(){
navigator.geolocation.getCurrentPosition((data)=>{console.log(Location(data.coords.latitude,data.coords.longitude))},()=>{})
    }


    return(
     <>
          <div className="flex md:flex-wrap h-full  w-full shadow-lg justify-start flex-wrap sticky top-0  z-40 bg-white">
           <div>
           {
               isOpen && <div className="bg-white h-[650px] w-full fixed  left-0 top-0 flex-wrap">
                   <div className="w-full">
                   <span onClick={()=>dispatch(addLocation(false))} class="material-symbols-outlined cursor-pointer mt-5 ml-[295px] w-full">
                      close
                   </span>
                   <input className="w-full h-[40px] shadow-lg border border-solid" value={placeSearch} onChange={(e)=>{  setPlaceSearch(e.target.value);}} placeholder="Enter area,street name" type="text"></input>
                    </div>
        
            <div  className="h-[50px] w-full border border-solid cursor-pointer flex flex-wrap mt-10 mb-7 justify-center items-center">
                  <span class="material-symbols-outlined">my_location</span>
                    <div >
                    <span  className="font-medium">Get Curront loction Using Gps</span>
                    </div>
            </div>
                    <div className="bg-white overflow-y-scroll h-[400px]">
                          {searchlocatines?<SearchLocationes className="" data={searchlocatines}/>:null}
                    </div>
                </div>
                
            }
            <div className="flex flex-wrap items-center justify-center">
           <img className=" h-[80px]" src={LOGO_URL}/>
          <span onClick={()=>dispatch(addLocation(true))} class="material-symbols-outlined cursor-pointer">add_location</span> <div>
           <p className="font-semibold ml-2">Other</p>
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