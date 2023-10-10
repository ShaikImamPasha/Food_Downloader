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
     //  console.log(data.data);
    }

  
   
   async function getlocation(){
navigator.geolocation.getCurrentPosition((data)=>{console.log(Location(data.coords.latitude,data.coords.longitude))},()=>{})
    }


    return(
     <>
          <div className="flex h-29  shadow-lg justify-start flex-wrap sticky top-0  z-40 bg-white">
           <div>
           {
               isOpen && <div className="bg-white h-[650px] w-[500px]  absolute left-0 top-0 overflow-y-scroll flex items-center  flex-wrap ">
                   <div>
                   <span onClick={()=>dispatch(addLocation(false))} class="material-symbols-outlined cursor-pointer ml-72 ">
                      close
                   </span>
                   <input className="w-[350px] h-[50px] shadow-lg border border-solid" value={placeSearch} onChange={(e)=>{  setPlaceSearch(e.target.value);}} type="text"></input>
                    </div>
        
            <div  className="w-[350px] h-[100px] border border-solid cursor-pointer flex items-center justify-center">
                  <span class="material-symbols-outlined">my_location</span>
                    <div >
                    <span  className="font-medium">Get Curront loction Using Gps</span>
                    </div>
            </div>
                    <div className="">
                          {searchlocatines?<SearchLocationes className="" data={searchlocatines}/>:null}
                    </div>
                </div>
                
            }
            <div className="flex items-center justify-center">
           <img className=" h-[100px]" src={LOGO_URL}/> 
          <span onClick={()=>dispatch(addLocation(true))} class="material-symbols-outlined cursor-pointer">add_location</span>
            </div>
            <div>
                    <ul className="md:flex flex-wrap justify-evenly hidden">
                        <h2 className="lg:hidden">offers</h2>
                       <li className="px-2 h-auto">Online Statues:{states?"🟢":"🛑"}</li>
                        <li  className="px-2 h-auto"><Link to="/">Home</Link></li>
                        <li  className="px-2 h-auto"><Link to="/about">About Us</Link></li>
                        <li  className="px-2 h-auto"><Link to="/contact">Contact us</Link></li>
                        <li  className="px-2 h-auto"><Link to="/FavourateCard">Cart{itemCards.length}</Link></li>
                        <li  className="px-2 h-auto">Login</li>
                    </ul>
            </div>
            <div className="flex ml-9">
            <h3>{locationName}</h3>
            </div> 
           </div>
        </div>
     </>
    )
}
export default Header; 