import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Shimmer } from "./index";
import Card from "./Card";
import data from "../Utils/mockData";
import dotenv from "dotenv";
dotenv.config();
import { useSelector } from "react-redux";

const Bestoffers = () => {
  const lat = useSelector((state) => state.loc.lat);
  const lng = useSelector((state) => state.loc.lng);
  const { id } = useParams();
  const [offerimageseting, setOfferImageSeating] = useState(true);
  const [bestofferdata, setBestOfferData] = useState([]);
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    var fetcbestoffersdata = await fetch(
      process.env.CORSSDAPI +
        `api/proxy/swiggy/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${id}&tags=layout_ux4%2CDISCOUNTING_COUPON_DEAL60&sortBy=&filters=&type=rcv2&offset=0&carousel=true&third_party_vendor=1`
    );
    var data = await fetcbestoffersdata.json();
    setBestOfferData(data);
  };
  return bestofferdata.length === 0 ? (
    <>
      <Shimmer></Shimmer>
    </>
  ) : (
    <>
      <div className="sticky top-0 left-0 z-50">
        {offerimageseting === true ? (
          <div className="absolute top-0 bg-red-500 text-red-950 w-10 h-12 text-5xl text-center ml-[150px]">
            <span
              onClick={() => setOfferImageSeating(false)}
              class="material-symbols-outlined"
            >
              close
            </span>
          </div>
        ) : (
          <div className="absolute top-0 bg-green-600 text-red-950 w-10 h-12 text-5xl  text-center ml-[150px]">
            <span
              onClick={() => setOfferImageSeating(true)}
              class="material-symbols-outlined"
            >
              open_in_full
            </span>
          </div>
        )}
        {offerimageseting === true ? (
          <img
            className=""
            src={
              `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_900/` +
              bestofferdata?.data?.cards[0]?.card?.card?.imageId
            }
          ></img>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center justify-center mt-6">
        {bestofferdata?.data?.cards?.map((data, index) => {
          return index > 1 ? <Card data={data?.card?.card}></Card> : null;
        })}
      </div>
    </>
  );
};
export default Bestoffers;
