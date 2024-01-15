import { LOGO_URL } from "../Utils/constant";
import { Link } from "react-router-dom";
import useOnlineStates from "../Utils/Custom_Hooks/useOnlineStates";
import { addLoginMode } from "../Utils/Redux/userSlice";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Utils/Context/UserContext";
import CardState from "../Utils/Context/CardState";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import SearchLocationes from "./SearchLocationes";
import GetCurronLocation from "../Utils/Custom_Hooks/useGetCurrontLocation";
import { useDispatch } from "react-redux";
import { addLocation } from "../Utils/Redux/locationes";
import useGetPlace_Id from "../Utils/Custom_Hooks/useGetPlace_Id";
import { Login } from "./Login";
export const Header = () => {
  const dispatch = useDispatch();
  const states = useOnlineStates();
  const [loder, setLoader] = useState(false);
  const isUserLoginData = useSelector((state) => state.user.userData);
  const searchlocatines = useSelector((state) => state.loc.searchlocatines);
  const [placeSearch, setPlaceSearch] = useGetPlace_Id();
  const [curtntLocation, setcurontLocation] = useState("");
  const itemCards = useSelector((state) => state.cart.itemes);
  const isOpen = useSelector((state) => state.loc.isOpen);
  const locationName = useSelector((states) => states.loc.locationName);
  const [openSearchLocation, setOpenSearchLocatoon] = useState(false);
  const restaurants = useSelector((state) => state.cart.resturentData);
  const LoginModel = useSelector((state) => state.user.LoginModel);
  var lruCatch = JSON.parse(localStorage.getItem("lruCatch"));
  var lruCatchData = JSON.parse(localStorage.getItem("lruCatch"));
  async function getlocation() {
    navigator.geolocation.getCurrentPosition(
      async (data) => {
        var dataa = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${data.coords.latitude}&longitude=${data.coords.longitude}`
        );
        dataa = await dataa.json();
      },
      () => {}
    );
  }
  {
    console.log(loder);
  }
  return (
    <>
      <div className="flex md:flex-wrap h-full  w-full shadow-lg justify-start flex-wrap sticky top-0 z-40  bg-white">
        {restaurants.length === 0 ? (
          <div className="bg-white">
            {" "}
            <div className="h-[4px]  fixed top-0 left-0 w-0 animate-loading-line "></div>
          </div>
        ) : null}
        <div>
          {isOpen === true ? (
            <div
              className={`bg-white h-[650px] w-full fixed  left-0 top-0 flex-wrap   card-container  animate-slide-in`}
            >
              <div className="w-full">
                <span
                  onClick={() => dispatch(addLocation(false))}
                  className="material-symbols-outlined cursor-pointer  w-full"
                >
                  close
                </span>
                <input
                  className="w-full h-12 shadow-lg border border-solid"
                  value={placeSearch}
                  onChange={(e) => {
                    setPlaceSearch(e.target.value),
                      setLoader(true),
                      setTimeout(() => {
                        setLoader(false);
                      }, 2000);
                  }}
                  placeholder="Enter area,street name"
                  type="text"
                ></input>
              </div>

              <div className="h-[50px] w-full  cursor-pointer flex flex-wrap  mt-2 gap-3">
                <span className="material-symbols-outlined ">my_location</span>
                <div
                  onClick={() => {
                    getlocation();
                  }}
                >
                  <span className="font-medium  cursor-pointer">
                    Use Current Location
                  </span>
                  <p className="text-gray-500  cursor-pointer"> Using Gps</p>
                </div>
              </div>
              <hr className="border-[1.5px] border-black mt-2"></hr>
              <div className="bg-white  h-[400px] w-full overflow-auto ">
                {loder === true ? (
                  <div class="loader3 mt-2">
                    <div class="circle1"></div>
                    <div class="circle1"></div>
                    <div class="circle1"></div>
                    <div class="circle1"></div>
                    <div class="circle1"></div>
                  </div>
                ) : searchlocatines ? (
                  <SearchLocationes
                    className=""
                    data={searchlocatines}
                    lruOpen={false}
                  />
                ) : lruCatchData !== null ? (
                  <p>
                    {
                      <SearchLocationes
                        lruOpen={true}
                        data={lruCatchData}
                      ></SearchLocationes>
                    }
                  </p>
                ) : null}
              </div>
            </div>
          ) : isOpen === false ? (
            <div
              className={`bg-white h-[650px] fixed  left-0 top-0 flex-wrap  z-20 card-container  animate-slide-out`}
            >
              <div className="w-full">
                <span
                  onClick={() => dispatch(addLocation(false))}
                  className="material-symbols-outlined cursor-pointer  w-full"
                >
                  close
                </span>
              </div>

              <div className="h-[50px] w-full  cursor-pointer flex flex-wrap  items-center">
                <span className="material-symbols-outlined ">my_location</span>
                <div>
                  <span className="font-medium ">Use Current Location</span>
                  <p className="text-gray-500 "> Using Gps</p>
                </div>
              </div>
              <hr className=" border border-solid border-black"></hr>
              <div className="bg-white  h-[400px] w-full overflow-auto "></div>
            </div>
          ) : null}

          <div className="flex flex-wrap  items-center w-full  gap-32">
            <Link to={"/"}>
              {" "}
              <img className=" h-[50px] rounded-full" src={LOGO_URL} />
            </Link>
            {LoginModel === true && isUserLoginData === null && (
              <div className="fixed top-32 left-12 z-1">
                <div>
                  {" "}
                  <Login />
                </div>
              </div>
            )}
            {LoginModel === false && (
              <div>
                <button class="Btn">
                  <div class="sign">
                    <svg viewBox="0 0 512 512">
                      <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
                    </svg>
                  </div>

                  <div class="text">
                    <button onClick={() => dispatch(addLoginMode())}>
                      login
                    </button>
                  </div>
                </button>
              </div>
            )}
          </div>
          <div>
            <ul className="md:flex flex-wrap justify-evenly hidden">
              <li className="px-2 h-auto">
                Online Statues:{states ? "🟢" : "🛑"}
              </li>
              <li className="px-2 h-auto">
                <Link to="/">Home</Link>
              </li>
              <li className="px-2 h-auto">
                <Link to="/about">About Us</Link>
              </li>
              <li className="px-2 h-auto">
                <Link to="/contact">Contact us</Link>
              </li>
              <li className="px-2 h-auto">
                <Link to="/FavourateCard">Cart{itemCards.length}</Link>
              </li>
              <li className="px-2 h-auto">Login</li>
            </ul>
          </div>

          <div className="flex flex-row ">
            <div onClick={() => dispatch(addLocation(true))}>
              <span className="material-symbols-outlined cursor-pointer ">
                add_location
              </span>{" "}
            </div>
            <div>
              <h3>{locationName}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
