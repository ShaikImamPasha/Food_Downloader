import Card, { withDiscountCard } from "./Card.js";
import { Shimmer } from "./index.js";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewDataLoader } from "../Utils/Redux/headerSlice.js";
import { useHomeApiCalles } from "../Utils/index.js";
import Slider from "./Slider.js";
import "leaflet/dist/leaflet.css";
const Body = () => {
  useHomeApiCalles();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart.resturentData);
  const resdata = useState(data.slice(0, 7));
  const [tempdata, setTemdata] = resdata;
  const [orgenaldata, setOrgenaldata] = useState(data);
  const [hasmore, setHashMore] = useState(true);
  const [curentIndex, setCurentIndex] = useState(4);
  const CardWithDiscount = withDiscountCard(Card);
  const whatOnYourMind = useSelector((state) => state.loc.whatOnYourMind);
  const topOfferesForYou = useSelector((state) => state.loc.topOfferesForYou);
  const offersOn = useSelector((state) => state.loc.offersOn);
  const newDataLoader = useSelector((state) => state.header.newDataLoader);
  //  console.log(mapData)
  useEffect(() => {
    setTemdata(data.slice(0, 4));
    setOrgenaldata(data);
    if (newDataLoader === true) {
      var teamp = setTimeout(() => {
        dispatch(addNewDataLoader(false));
      }, [3000]);
    }
    return () => {
      clearTimeout(teamp);
    };
  }, [data, newDataLoader]); //it's worked after all componentes are renderd.
  const loadNextData = () => {
    if (orgenaldata.length <= tempdata.length) {
      setHashMore(false);
      return;
    }
    setTimeout(async () => {
      if (tempdata.length > 0) {
        setTemdata(
          tempdata.concat(orgenaldata.slice(curentIndex, curentIndex + 4))
        );
        setCurentIndex(curentIndex + 4);
        //     console.log("ckc");
      }
    }, 1000);
  };

  if (newDataLoader === true) {
    return <Shimmer />;
  }
  return (
    //CONDITIONAL RANDARING
    tempdata.length === 0 ? (
      <div>
        <div className="w-full mt-5 bg-white rounded-lg shadow-lg">
          <div className="animate-pulse bg-gray-300 h-56 w-full flex items-center justify-center"></div>
        </div>
        {<Shimmer />}
      </div>
    ) : (
      <div className={`mb-11 z-30 `}>
        <div className="">
          {topOfferesForYou === undefined ? null : topOfferesForYou.length !==
            0 ? (
            <div className="flex items-center flex-wrap flex-col mb-1">
              <p className="font-black mt-6 inline-block">
                <span>
                  <img
                    className="inline-block w-[25px] h-[25px]"
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/sl9oogwe7n5dusolt5xe"
                  ></img>
                </span>
                Top Picks for you
              </p>
              {<Slider data={"topOfferesForYou"} />}
            </div>
          ) : null}
          {offersOn === undefined ? null : offersOn.length !== 0 ? (
            <div className="flex items-center flex-wrap flex-col">
              <h1 className="font-black mt-6">Best Offers For You</h1>
              {<Slider data={"offersOn"} />}
            </div>
          ) : null}
          <div className="flex items-center flex-wrap flex-col">
            {whatOnYourMind === undefined ? null : whatOnYourMind.length !==
              0 ? (
              <div>
                <h1 className="font-black mt-6 text-center">
                  {" "}
                  What's on your mind?
                </h1>
                <Slider data={"whatOnYourMind"} />
              </div>
            ) : null}
          </div>
        </div>
        <InfiniteScroll
          dataLength={tempdata.length}
          next={loadNextData}
          hasMore={hasmore}
          loader={<Shimmer />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div>
            <div className="flex flex-wrap md:ml-14 gap-3 justify-center items-center  md:justify-center mt-5 overflow-hidden">
              {tempdata.map((information) => {
                return information.info.aggregatedDiscountInfoV3 ? (
                  <CardWithDiscount
                    key={information.info.id}
                    data={information}
                  />
                ) : (
                  <Card key={information.info.id} data={information}></Card>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    )
  );
};
export default Body;
