import { LOGO_URL } from "../Utils/constant";
import { Link } from "react-router-dom";
import useOnlineStates from "../Utils/Custom_Hooks/useOnlineStates";
import SearchLocationes from "./SearchLocationes";
import { addLoginMode, addUserData } from "../Utils/Redux/userSlice";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocation } from "../Utils/Redux/locationes";
import useGetPlace_Id from "../Utils/Custom_Hooks/Location/useGetPlace_Id";
import { useCountNoOfItemes } from "../Utils";
import { Login } from "./Login";
export const Header = () => {
  const [selector, setSelector] = useState(1);
  const dispatch = useDispatch();
  const states = useOnlineStates();
  const [loder, setLoader] = useState(false);
  const isUserLoginData = useSelector((state) => state.user.userData);
  const searchlocatines = useSelector((state) => state.loc.searchlocatines);
  const [placeSearch, setPlaceSearch] = useGetPlace_Id();
  const isOpen = useSelector((state) => state.loc.isOpen);
  const locationName = useSelector((states) => states.loc.locationName);
  const restaurants = useSelector((state) => state.cart.resturentData);
  const LoginModel = useSelector((state) => state.user.LoginModel);
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
  return (
    <>
      <div className="flex md:flex-wrap h-full  md:w-full shadow-lg justify-center md:items-center flex-wrap sticky top-0 z-40  bg-white">
        {restaurants.length === 0 ? (
          <div className="bg-white">
            {" "}
            <div className="h-[4px]  fixed top-0 left-0 w-0 animate-loading-line "></div>
          </div>
        ) : null}
        <div className="w-full h-[100px] flex  md:items-center md:justify-center justify-evenly items-center">
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
                  <div className="loader3 mt-2">
                    <div className="circle1"></div>
                    <div className="circle1"></div>
                    <div className="circle1"></div>
                    <div className="circle1"></div>
                    <div className="circle1"></div>
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
          <Link to={"/"}>
            {" "}
            <img
              onClick={() => setSelector(1)}
              className=" h-[100px] md:w-[380px] w-[250px] rounded-full"
              src={LOGO_URL}
            />
          </Link>
          <div className="flex flex-row w-full md:ml-8">
            <div
              onClick={() => (
                dispatch(addLocation(true)),
                setLoader(true),
                setTimeout(() => setLoader(false), [2000])
              )}
            >
              <span className="material-symbols-outlined cursor-pointer ">
                add_location
              </span>{" "}
            </div>
            <div className="ml-1">
              <h3>{locationName}</h3>
            </div>
          </div>
          <div className="flex flex-wrap  items-center w-full">
            {LoginModel === true && isUserLoginData === null && (
              <div className="fixed top-32 left-12 md:left-72 z-1">
                <div>
                  {" "}
                  <Login />
                </div>
              </div>
            )}
            {LoginModel === false && (
              <div className="md:hidden">
                <button className="Btn">
                  <div className="sign">
                    <svg viewBox="0 0 512 512">
                      <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
                    </svg>
                  </div>

                  <div className="text">
                    <button onClick={() => dispatch(addLoginMode())}>
                      login
                    </button>
                  </div>
                </button>
              </div>
            )}
          </div>
          <div className="w-full md:flex hidden">
            <ul className="md:flex justify-evenly  flex-wrap  hidden w-[750px]">
              <li className="">Online Statues:{states ? "🟢" : "🛑"}</li>
              <li className="">
                <Link to="/" onClick={() => setSelector(1)}>
                  Home
                </Link>
                {selector === 1 ? (
                  <div className="w-11 h-[2.5px] border-3 bg-black"></div>
                ) : null}
              </li>
              <li className="">
                <Link to="/map" onClick={() => setSelector(2)}>
                  Map
                </Link>
                {selector === 2 ? (
                  <div className="w-[34px] h-[2.5px] border-3 bg-black"></div>
                ) : null}
              </li>
              <li className="">
                <Link to="/search" onClick={() => setSelector(3)}>
                  Search
                </Link>
                {selector === 3 ? (
                  <div className="w-[50px] h-[2.5px] border-3 bg-black"></div>
                ) : null}
              </li>
              <li className="">
                <Link to="/FavourateCard" onClick={() => setSelector(4)}>
                  Cart({useCountNoOfItemes()})
                </Link>
                {selector === 4 ? (
                  <div className="w-10 h-[2.5px] border-3 bg-black"></div>
                ) : null}
              </li>
              <li className="">
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
              </li>
            </ul>
          </div>
          <div>
            {isUserLoginData !== null ? (
              <>
                <img
                  className="w-[300px] h-[70px] cursor-pointer "
                  src="https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                ></img>
                <div>
                  <button
                    onClick={() =>
                      dispatch(addUserData(null), dispatch(addLoginMode()))
                    }
                  >
                    LogOut
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
