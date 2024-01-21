import { CDN_IMAGE_URL } from "../../Utils/constant.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increamentItem } from "../../Utils/Redux/cardSlice.js";
import {
  useShowPopUpOrange,
  useShowPopUpRed,
  useAddOneItem,
  useItemInc,
  useItemDec,
} from "../../Utils/index.js";
const MenuItemes = ({ data, Fav }) => {
  const { name, description, price, imageId, ratings, id, defaultPrice } = data;
  const itemes = useSelector((state) => state.cart.itemes);
  const dispatch = useDispatch();
  const [isVisibleAdd, setIsVisible] = useState(false);
  const [isVisibleRemove, setIsVisibleRemove] = useState(false);
  function fun(data) {
    var a = 0;
    for (let i = 0; i < itemes.length; i++) {
      if (id === itemes[i].id) {
        a++;
      }
    }
    if (a === 0) {
      return button1;
    }
    return null;
  }
  var button1 = (
    <button
      className="w-20 h-8 bg-orange-400 border-orange-500 text-white rounded-3xl border-2  hover:bg-green-700"
      onClick={() => useShowPopUpOrange(setIsVisible)}
    >
      AddItem{" "}
    </button>
  );
  return (
    <>
      {
        <div className="mt-5">
          <div>
            <div className="flex items-center justify-around gap-1">
              {" "}
              {/*Data for card */}
              <div>
                {isVisibleAdd && (
                  <div className="absolute left-24  transform -translate-x-1/2 p-1  shadow-lg animate-fade-in-down rounded-lg h-10 w-[30%] text-center bg-orange-400">
                    <small className="text-white font-bold text-center text-[18px]">
                      Added!
                    </small>
                  </div>
                )}
                {isVisibleRemove && (
                  <div
                    className="absolute left-24  transform -translate-x-1/2 bg-white p-1 shadow-lg animate-fade-in-down rounded-lg  h-10 w-[30%] text-center "
                    style={{ backgroundColor: "red" }}
                  >
                    <small className="text-black font-bold text-center text-[18px]">
                      Removed!
                    </small>
                  </div>
                )}
                <h4 className="font-bold">{name}</h4>
                <p>₹{price || defaultPrice / 100}</p>
                <div className="overflow-ellipsis overflow-hidden w-[200px] h-[55px]">
                  {description}
                </div>
                <p className="font-bold">{ratings?.aggregatedRating?.rating}</p>
              </div>
              <div>
                {" "}
                {/**card add ,remove butoon  */}
                <img
                  loading="lazy"
                  alt={"loading"}
                  className="rounded-3xl w-[100px] h-[100px]"
                  src={CDN_IMAGE_URL + imageId}
                ></img>
                <div className="relative -top-7 left-2 flex justify-around w-20 rounded-3xl border-solid border-2  border-orange-300 shadow-orange-50 h-8 bg-white">
                  {itemes.length !== 0 &&
                    itemes.map((innerdata) =>
                      innerdata?.id === id &&
                      innerdata?.addSymbole &&
                      innerdata?.addSymbole === true ? (
                        <div
                          className="hover:cursor-pointer"
                          onClick={() => {
                            const resultes = useItemDec(data, itemes);
                            dispatch(addItem(resultes));
                            useShowPopUpRed(setIsVisibleRemove);
                          }}
                        >
                          -
                        </div>
                      ) : null
                    )}
                  <div
                    className="text-orange-400"
                    onClick={() => {
                      const resultes = useAddOneItem(data, itemes);
                      dispatch(addItem(resultes));
                    }}
                  >
                    {itemes.length === 0 ? button1 : fun(data)}
                    {itemes.length !== 0 &&
                      itemes.map((innerdata) =>
                        innerdata?.id === id &&
                        innerdata?.addSymbole &&
                        innerdata?.addSymbole === true
                          ? innerdata?.count
                          : innerdata?.id === id &&
                            innerdata?.addSymbole === false
                          ? button1
                          : null
                      )}
                  </div>
                  {itemes.length !== 0 &&
                    itemes.map((innerdata) =>
                      innerdata?.id === id &&
                      innerdata?.addSymbole &&
                      innerdata?.addSymbole === true ? (
                        <div
                          className="hover:cursor-pointer"
                          onClick={() => {
                            var resultes = useItemInc(data, itemes);
                            dispatch(increamentItem(resultes));
                            useShowPopUpOrange(setIsVisible);
                          }}
                        >
                          +
                        </div>
                      ) : null
                    )}
                </div>
              </div>
              <div className="mr-3">
                {Fav &&
                  itemes.length !== 0 &&
                  itemes.map((innerdata) =>
                    innerdata?.id === id &&
                    innerdata?.addSymbole &&
                    innerdata?.addSymbole === true ? (
                      <div>
                        ₹{(innerdata?.count * price || defaultPrice) / 100}
                      </div>
                    ) : null
                  )}
              </div>
            </div>
            <div className="flex items-center justify-around">
              <div className="w-96 h-1 bg-orange-300"></div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
export default MenuItemes;
