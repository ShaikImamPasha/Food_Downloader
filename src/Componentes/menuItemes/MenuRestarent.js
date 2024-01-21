import { useState, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MenuItemes from "./MenuItemes.js";
import CardState from "../../Utils/Context/CardState.js";
const MenuRestarent = (props) => {
  const { title, arrow, setArryFunctions, setArrayClose } = props;
  const { itemCards } = props?.data?.card?.card;
  const [presntData, setPresntData] = useState(itemCards?.slice(0, 5));
  const [currentIndex, setCurrentIndex] = useState(5);
  const [hasmore, setHasMore] = useState(true);
  const fetchdata = () => {
    if (presntData.length >= itemCards.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      if (presntData.length > 0) {
        setPresntData(
          presntData.concat(itemCards.slice(currentIndex, currentIndex + 4))
        );
        setCurrentIndex(currentIndex + 4);
      } else {
        setPresntData([]);
      }
    }, 1500);
  };
  return (
    <>
      <div className="">
        {itemCards && (
          <div className="flex justify-center items-center  mt-1">
            <h3 className="font-bold">
              {title}({props?.data?.card?.card?.itemCards?.length})
            </h3>
            {arrow ? (
              <span
                onClick={arrow ? setArrayClose : setArryFunctions}
                class="material-symbols-outlined cursor-pointer"
              >
                keyboard_arrow_up
              </span>
            ) : (
              <span
                onClick={arrow ? setArrayClose : setArryFunctions}
                class="material-symbols-outlined cursor-pointer"
              >
                keyboard_arrow_down
              </span>
            )}
          </div>
        )}
        {arrow && (
          <InfiniteScroll
            hasMore={hasmore}
            dataLength={presntData.length}
            next={fetchdata}
            loader={<p className="text-center">plesse wiat load tha food</p>}
            endMessage={<p className="text-center">end of data</p>}
          >
            <div className="flex justify-center items-center flex-col">
              {itemCards &&
                presntData.map((data, index) => {
                  return (
                    <MenuItemes
                      data={data?.card?.info}
                      key={index}
                    ></MenuItemes>
                  );
                })}
            </div>
          </InfiniteScroll>
        )}
        {itemCards && (
          <div className="flex items-center justify-around mt-4">
            <div className="w-96 h-[12px] bg-gray-200 "></div>
          </div>
        )}
      </div>
    </>
  );
};
export default MenuRestarent;
