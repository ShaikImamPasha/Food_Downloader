import Shimmer from "./Shimmer";
import MenuRestarent from "./MenuRestarent";
import { useParams } from "react-router-dom";
import useResturent from "../Utils/Custom_Hooks/useResturent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommentModel } from "../Utils/Redux/userSlice";
import { CommentApp } from "./commentesCMP/CommentApp";

const Restaurent = () => {
  const dispatch = useDispatch();
  const { resid } = useParams();
  const resInfo = useResturent(resid);
  const [arrowIndex, setArrayIndex] = useState(null);
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const CommentModel = useSelector((state) => state.user.CommentModel);

  useEffect(() => {}, []);

  function setArrayfunction(index) {
    setArrayIndex(index);
  }

  if (resInfo !== null) {
    var { name, avgRating, areaName, locality } =
      resInfo?.data?.cards[0]?.card?.card?.info ||
      resInfo?.data?.cards[2]?.card?.card?.info;
    var menuitemes =
      resInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
      resInfo?.data?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR.cards ||
      resInfo?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    //console.log(menuitemes);
  }

  return resInfo === null ? (
    <Shimmer />
  ) : (
    <>
      <div className="">
        <div className="">
          <div className="">
            <div>
              {name}
              <p>{avgRating}</p>
            </div>
            <div
              className={`content-container ${
                CommentModel === true ? "blur disable-interactions" : ""
              }`}
            >
              {menuitemes.map((data, index) => (
                <div key={index}>
                  <MenuRestarent
                    className=""
                    key={index}
                    arrow={index === arrowIndex ? true : false}
                    setArryFunctions={() => setArrayfunction(index)}
                    setArrayClose={() => setArrayfunction(null)}
                    title={data.card.card.title}
                    data={data}
                  />
                </div>
              ))}
            </div>
            {CommentModel === true && (
              <div className="relative top-36 left-40">
                <CommentApp resid={resid} />
              </div>
            )}
            {CommentModel === false && (
              <div className="fixed left-14 bottom-14 bg-white">
                <div className="group flex">
                  {isTooltipVisible && (
                    <div className="bg-orange-500 text-white p-2 rounded-md absolute  bottom-full transform -translate-x-1/2 mb-1 ml-14">
                      View Comments
                    </div>
                  )}
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6455/6455984.png"
                    alt="Message Icon"
                    className={`h-14 w-14 cursor-pointer ${
                      isTooltipVisible ? "" : "animate-bounce"
                    }`}
                    onMouseOver={() => setTooltipVisible(true)}
                    onMouseOut={() => setTooltipVisible(false)}
                    onClick={() => (
                      dispatch(addCommentModel()), setTooltipVisible(false)
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurent;
