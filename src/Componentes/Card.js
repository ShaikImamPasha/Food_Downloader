import { Link } from "react-router-dom";
import { CDN_IMAGE_URL } from "../Utils/constant";
import { addItem } from "../Utils/Redux/cardSlice";
import { useDispatch } from "react-redux";
const Card = (props) => {
  //props is js object
  //  console.log(props)
  var {
    name,
    locality,
    areaName,
    costForTwo,
    cloudinaryImageId,
    cuisines,
    avgRating,
    id,
  } = props?.data.info;
  return (
    <Link to={"/restaurent/" + id}>
      <div className="break-words ">
        <div className="w-full md:w-full">
          <img
            loading="lazy"
            className="w-[250px] h-[150px] object-cover md:h-[190px]  md:w-[300px] rounded-3xl"
            alt="loading"
            src={CDN_IMAGE_URL + cloudinaryImageId}
          />
        </div>
        <div>
          <h3 className="font-bold">{name}</h3>
          <img
            className="w-5 h-5 rounded-2xl inline-block"
            src="data:image/png;base64,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"
          ></img>
          <span className="ml-1">{avgRating} Rating</span>
          <p className="text-slate-500">
            {areaName},{locality}
          </p>
        </div>
      </div>
    </Link>
  );
};
export const withDiscountCard = (Card) => {
  return (props) => {
    const { subHeader } = props.data.info.aggregatedDiscountInfoV3;
    return (
      <div className="">
        <h1 className="relative left-1 top-[188px] rounded-lg text-white text-lg font-extrabold ml-2">
          {subHeader}Offer
        </h1>
        <Card data={props.data} />
      </div>
    );
  };
};
export default Card;
