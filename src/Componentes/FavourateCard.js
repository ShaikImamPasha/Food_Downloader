import { useDispatch, useSelector } from "react-redux";
import MenuItemes from "./MenuItemes";
import { CDN_IMAGE_URL } from "../Utils/constant.js";
import { useState } from "react";
import { useEffect } from "react";
import { Payment } from "./PaymentCMP/Payment.js";
import { addUserData } from "../Utils/Redux/userSlice.js";
const FavourateCard = () => {
  const FavourateItemesCard = useSelector((states) => states.cart.itemes);
  const userData = useSelector((state) => state.user.userData);
  const [totelPrice, setTotelPrice] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    fun();
  }, [FavourateItemesCard]);
  function fun() {
    var a = FavourateItemesCard.reduce(
      (i, data) => (data.addSymbole && (data.price * data.count) / 100) + i,
      0
    );
    setTotelPrice(a);
  }
  function calClateFavCard() {
    var count = 0;
    FavourateItemesCard.map((data) => {
      if (data.addSymbole) {
        count++;
      }
    });
    return count === 0 ? true : false;
  }
  if (calClateFavCard()) {
    return (
      <>
        <div className="flex flex-col flex-wrap justify-center items-center">
          <img
            className="H-50 mt-2"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
          ></img>
          <h3>Your cart is empty</h3>
          <small className="text-stone-700">
            You can go to home page to view more restaurants
          </small>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="border-solid border-2  rounded-lg shadow-orange-800 flex flex-wrap justify-center item-center ml-2">
        <div>
          {FavourateItemesCard.map((data) => {
            return data.addSymbole && <MenuItemes data={data} Fav={true} />;
          })}
        </div>
      </div>
      <h1 className="mt-3 ml-2 font-medium">Bill Deatils</h1>
      <div className="ml-2 text-gray-500">
        <span>Item Totel</span>
        <span className="ml-[228px]">₹{totelPrice}</span>
        <div>
          <span>Delivery Tip</span>
          <span className="ml-[215px]">₹{20}</span>
        </div>
        <div>
          <span>Platform Fee</span>
          <span className="ml-[210px]">
            ₹{<del>10</del>}
            <span className="ml-1">{4}</span>
          </span>
        </div>
        <div>
          <span>GST and Restaurant Charges</span>
          <span className="ml-[97px]">₹{50}</span>
        </div>
      </div>
      <div className="flex items-center justify-around mt-3">
        <div className="w-96 h-[1.5px] bg-black"></div>
      </div>
      <div className="ml-2 mt-2 font-medium">
        <span> To Pay</span>
        <span className="ml-[250px]">{totelPrice + 20 + 4 + 50}</span>
        <div>
          <Payment
            setPrice={() =>
              dispatch(addUserData({ ...userData, price: totelPrice }))
            }
          />
        </div>
      </div>
    </>
  );
};
export default FavourateCard;
