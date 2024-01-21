import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import { withDiscountCard } from "./Card";
import { useFilterFood } from "../Utils";
const SearchFood = () => {
  const CardWithDiscount = withDiscountCard(Card);
  const [searchtest, setSearchtest] = useState("");
  const [tempdata, setTemdata] = useState([]);
  const orginalData = useSelector((state) => state.cart.resturentData);
  return (
    <>
      <div>
        <div>
          <div className="p-5 flex justify-center flex-wrap">
            <input
              className="border-r-0 w-[200px] border border-solid border-black"
              placeholder="Enter restaurant name"
              type="text"
              value={searchtest}
              onChange={(e) => setSearchtest(e.target.value)}
            ></input>
            <span
              className="material-symbols-outlined w-7 bg-orange-400 cursor-pointer"
              onClick={() => {
                var resultes = useFilterFood(orginalData, searchtest);
                setTemdata(resultes);
              }}
            >
              search
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center">
          {tempdata.map((information) => {
            return information.info.aggregatedDiscountInfoV3 ? (
              <CardWithDiscount key={information.info.id} data={information} />
            ) : (
              <Card key={information.info.id} data={information}></Card>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default SearchFood;
